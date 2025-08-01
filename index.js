const ModernTerminalUISimple = require('./src/ui/modern-ui-simple');
const DynamicSetupManager = require('./src/setup/setup-dynamic');
const debug = require('./src/debugger');
const { getFullAppName } = require('./src/utils/version');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function main(selectedProvider = null, options = {}) {
  // Handle version flag
  if (options.version) {
    // Get version dynamically using centralized utility
    const fullAppName = getFullAppName();
    console.log(fullAppName);
    return;
  }

  // Enable debug mode if requested
  if (options.debug) {
    debug.enable('verbose');
    debug.log('Debug mode enabled via CLI option');
  }

  // Handle CLI options
  if (options.setup || options.setupDynamic) {
    const setup = new DynamicSetupManager();
    await setup.runSetup();
    return;
  }
  
  if (options.config) {
    const config = require('./src/config/config');
    const configManager = new config();
    const summary = configManager.getConfigSummary();
    
    console.log('Current Configuration:');
    console.log('Default Provider:', summary.defaultProvider || 'None');
    console.log('Available Providers:');
    
    Object.entries(summary.providers).forEach(([key, provider]) => {
      console.log(`  • ${provider.name}: ${provider.model}`);
    });
    
    console.log('Config File:', configManager.configPath);
    return;
  }

  if (options.export) {
    const config = require('./src/config/config');
    const configManager = new config();
    const fs = require('fs');
    const path = require('path');
    
    // Handle both absolute and relative paths
    let exportPath = options.export || './terminal-agent-config.json';
    
    // If it's a relative path, resolve it relative to current working directory
    if (!path.isAbsolute(exportPath)) {
      exportPath = path.resolve(process.cwd(), exportPath);
    }
    
    // Ensure the directory exists
    const exportDir = path.dirname(exportPath);
    if (!fs.existsSync(exportDir)) {
      try {
        fs.mkdirSync(exportDir, { recursive: true });
        console.log(`📁 Created directory: ${exportDir}`);
      } catch (error) {
        console.log(`❌ Failed to create directory: ${exportDir}`);
        console.log(`Error: ${error.message}`);
        process.exit(1);
      }
    }
    
    const success = configManager.exportConfigToFile(exportPath);
    
    if (success) {
      console.log(`✅ Configuration exported to: ${exportPath}`);
      console.log(`📄 File size: ${fs.statSync(exportPath).size} bytes`);
    } else {
      console.log('❌ Failed to export configuration');
      process.exit(1);
    }
    return;
  }

  if (options.import) {
    const config = require('./src/config/config');
    const configManager = new config();
    const fs = require('fs');
    const path = require('path');
    
    // Handle both absolute and relative paths
    let importPath = options.import || './terminal-agent-config.json';
    
    // If it's a relative path, resolve it relative to current working directory
    if (!path.isAbsolute(importPath)) {
      importPath = path.resolve(process.cwd(), importPath);
    }
    
    if (!fs.existsSync(importPath)) {
      console.log(`❌ Configuration file not found: ${importPath}`);
      console.log(`💡 Try using an absolute path or check the file location`);
      process.exit(1);
    }
    
    // Validate file is readable
    try {
      const stats = fs.statSync(importPath);
      if (!stats.isFile()) {
        console.log(`❌ Path is not a file: ${importPath}`);
        process.exit(1);
      }
      console.log(`📄 File size: ${stats.size} bytes`);
    } catch (error) {
      console.log(`❌ Cannot access file: ${importPath}`);
      console.log(`Error: ${error.message}`);
      process.exit(1);
    }
    
    const success = configManager.importConfigFromFile(importPath);
    
    if (success) {
      console.log(`✅ Configuration imported from: ${importPath}`);
      console.log('⚠️  You may need to restart the application for changes to take effect');
    } else {
      console.log('❌ Failed to import configuration');
      console.log('💡 Check if the file contains valid JSON configuration');
      process.exit(1);
    }
    return;
  }

  // Handle inline ask requests
  if (options.ask) {
    await handleInlineRequest(selectedProvider, options);
    return;
  }

  // Run first-time setup if needed
  const setup = new DynamicSetupManager();
  if (setup.isSetupRequired()) {
    selectedProvider = await setup.runSetup();
    
    // Don't exit if no providers configured - let the UI handle it
    // The setup will set a default provider even without API keys
  }

  // Start modern UI
  const ui = new ModernTerminalUISimple();
  await ui.startChat();
}

// Handle inline requests (--ask option)
async function handleInlineRequest(selectedProvider, options) {
  const config = require('./src/config/config');
  const configManager = new config();
  const AIProvider = require('./src/providers/providers');
  
  // Run setup if needed
  const setup = new DynamicSetupManager();
  if (setup.isSetupRequired()) {
    console.log('⚠️  First-time setup required. Please run: terminal-agent --setup');
    process.exit(1);
  }

  // Initialize AI provider
  const aiProvider = new AIProvider(configManager);
  aiProvider.initialize();

  // Switch to selected provider or use default
  let providerKey = selectedProvider || configManager.getDefaultProvider() || 'openai';
  const availableProviders = configManager.getAvailableProviders();
  
  if (availableProviders.length === 0) {
    console.log('❌ No API keys configured. Please add API keys using /settings in the chat interface.');
    console.log('💡 You can also run: terminal-agent --setup to configure API keys');
    process.exit(1);
  }

  // Try to switch to the requested provider
  if (!aiProvider.switchProvider(providerKey)) {
    // If requested provider not available, use first available
    providerKey = availableProviders[0].key;
    aiProvider.switchProvider(providerKey);
  }

  const currentProvider = aiProvider.getCurrentProvider();
  console.log(`🤖 Using ${currentProvider.name} (${currentProvider.model})`);

  // Handle agent selection
  if (options.agent) {
    const agentInfo = configManager.getAgent(options.agent);
    if (agentInfo) {
      console.log(`🎭 Using agent: ${agentInfo.name}`);
      // Set the agent for this conversation
      configManager.setDefaultAgent(options.agent);
    } else {
      console.log(`⚠️  Agent '${options.agent}' not found. Using default agent.`);
    }
  }

  // Get the message to ask
  let message = options.ask || '';
  
  // Handle input file if provided
  if (options.input) {
    try {
      if (!fs.existsSync(options.input)) {
        console.log(`❌ Input file not found: ${options.input}`);
        process.exit(1);
      }
      const inputContent = fs.readFileSync(options.input, 'utf8').trim();
      const fullPath = path.resolve(options.input);
      console.log(`📄 Reading input from: ${fullPath}`);
      
      // If we have both input file and ask message, combine them
      if (message) {
        message = `${message}\n\nFile: ${fullPath}\n\n${inputContent}`;
      } else {
        message = `Please process the following content from file: ${fullPath}\n\n${inputContent}`;
      }
    } catch (error) {
      console.log(`❌ Error reading input file: ${error.message}`);
      process.exit(1);
    }
  }
  
  // Check if the message is a file path (legacy support)
  if (message && (message.startsWith('./') || message.startsWith('/') || message.startsWith('.\\') || message.startsWith('C:\\'))) {
    try {
      if (!fs.existsSync(message)) {
        console.log(`❌ File not found: ${message}`);
        process.exit(1);
      }
      message = fs.readFileSync(message, 'utf8').trim();
      console.log(`📄 Reading prompt from: ${options.ask}`);
    } catch (error) {
      console.log(`❌ Error reading file: ${error.message}`);
      process.exit(1);
    }
  }

  if (!message) {
    console.log('❌ No message provided. Use --ask or --input to provide content.');
    process.exit(1);
  }

  // Display a cleaner message without showing file content
  if (options.input) {
    console.log(`💬 Sending: ${options.ask || 'Processing input file'}`);
  } else {
    console.log(`💬 Sending: ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}`);
  }
  console.log('');

  try {
    // Send the message
    const response = await aiProvider.sendMessage(message);
    
    // Output the response
    if (options.output) {
      try {
        fs.writeFileSync(options.output, response);
        console.log(`✅ Response saved to: ${path.resolve(options.output)}`);
      } catch (error) {
        console.log(`❌ Error writing to file: ${error.message}`);
        console.log('\n📝 Response:');
        console.log(response);
      }
    } else {
      console.log('📝 Response:');
      console.log(response);
    }
    
    // Exit after successful response
    process.exit(0);
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Export for CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  let provider = null;
  const options = {};
  
  // Parse arguments manually to handle provider vs options
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--setup' || arg === '-s') {
      options.setup = true;
    } else if (arg === '--config' || arg === '-c') {
      options.config = true;
    } else if (arg === '--setup-dynamic') {
      options.setupDynamic = true;
    } else if (arg === '--export' || arg === '-e') {
      options.export = true;
      // Check if next argument is a file path
      if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        options.export = args[i + 1];
        i++; // Skip the next argument
      }
    } else if (arg === '--import' || arg === '-i') {
      options.import = true;
      // Check if next argument is a file path
      if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        options.import = args[i + 1];
        i++; // Skip the next argument
      }
    } else if (arg === '--debug' || arg === '-d') {
      options.debug = true;
    } else if (arg === '--version' || arg === '-v') {
      options.version = true;
    } else if (arg === '--ask') {
      options.ask = true;
      // Check if next argument is the message
      if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        options.ask = args[i + 1];
        i++; // Skip the next argument
      }
    } else if (arg === '--output' || arg === '-o') {
      // Check if next argument is a file path
      if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        options.output = args[i + 1];
        i++; // Skip the next argument
      }
    } else if (arg === '--agent') {
      // Check if next argument is the agent name
      if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        options.agent = args[i + 1];
        i++; // Skip the next argument
      }
    } else if (arg === '--input') {
      // Check if next argument is the input file path
      if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        options.input = args[i + 1];
        i++; // Skip the next argument
      }
    } else if (!arg.startsWith('-') && !provider) {
      // First non-option argument is the provider
      provider = arg;
    }
  }
  
  main(provider, options).catch(console.error);
}

module.exports = main; 