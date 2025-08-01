# Changelog
## [1.12.5] - 2025-08-02

### Fixed
- **Setup Loop Issue**: Fixed critical bug where setup would run repeatedly instead of only once
- **First-Run Logic**: Setup now only runs on first installation, not when API keys are missing
- **User Access**: Users can now access the app and add API keys via /settings after initial setup
- **Setup Flow**: Setup runs once by force on first run, then requires --setup flag for reconfiguration

### Changed
- **Setup Requirements**: Removed API key requirement from automatic setup trigger
- **Error Messages**: Updated inline request error messages to guide users to /settings

## [1.12.4] - 2025-08-02

### Added
- **Enhanced Import/Export Path Handling**: Support for both absolute and relative paths
- **Improved Error Handling**: Detailed error messages with helpful suggestions
- **File Validation**: Checks for file existence, readability, and non-empty files
- **Directory Creation**: Automatically creates missing directories for export paths
- **Write Permission Testing**: Tests write access before attempting export
- **JSON Validation**: Validates JSON format before importing configuration
- **File Size Reporting**: Shows exported file size for better UX
- **Legacy Format Support**: Handles both legacy and new config formats

### Changed
- **Import/Export Reliability**: More robust path handling for all scenarios
- **Error Messages**: Enhanced error reporting with specific details and suggestions
- **Configuration Management**: Better validation and error recovery

## [1.12.3] - 2025-08-02

### Changed
- **Rebranding**: Renamed from "Terminal AI" to "Terminal Agent"
- **CLI Command**: Changed from `terminal-ai` to `terminal-agent`
- **Package Name**: Updated from "terminal-ai" to "terminal-agent"
- **Repository**: Updated GitHub URLs to reflect new naming
- **Documentation**: Updated all references throughout codebase
- **UI**: Updated application title and welcome messages

## [1.12.2] - 2025-08-02

### Changed
- **NPM Build Test**: Testing CI/CD pipeline with package-lock.json fix
- **Build Verification**: Ensuring npm ci works correctly in GitHub Actions

## [1.12.1] - 2025-08-02

### Fixed
- **CI/CD Build Fix**: Included package-lock.json in repository for reproducible builds
- **Gitignore Update**: Removed package-lock.json from .gitignore to enable CI/CD builds
- **Build Process**: Fixed npm ci command failure in GitHub Actions

## [1.12.0] - 2025-08-01

### Added
- **Agent Selection System**: Added `--agent [agentid]` argument for specialized agents
- **File Processing**: Added `--input [file]` and `--output [file]` arguments
- **10 Specialized Agents**: programmer, SEO, writer, researcher, teacher, analyst, creative, debugger, reviewer, architect
- **Combined Workflow**: Support for provider + agent + input + output workflow
- **Advanced Examples**: Comprehensive usage documentation in examples/ directory
- **Clean File Display**: Shows full file path without content display

### Changed
- **CLI Interface**: Enhanced with agent selection and file processing capabilities
- **Documentation**: Updated README.md with advanced usage section
- **Error Handling**: Improved file processing with robust error handling

### Features
- **Agent System**: Each agent has specialized instructions for different tasks
- **File Processing**: Input files are combined with ask messages for processing
- **Provider Compatibility**: All agents work with ChatGPT, Gemini, and Grok
- **Professional Workflows**: Support for code review, content creation, debugging pipelines

## [1.11.1] - 2025-08-01

### Added
- **Dynamic Version System**: Centralized version utility with robust fallback system
- **Automated Version Management**: Scripts for updating all version references
- **README Synchronization**: Automatic README version updates
- **Comprehensive Examples**: Usage examples with inline arguments

### Changed
- **Version Display**: All version displays now dynamically read from package.json
- **Version Update Process**: Automated version updates across all files
- **Documentation**: Added examples/ directory with comprehensive usage patterns

### Fixed
- **Version Inconsistencies**: Eliminated manual version synchronization requirements
- **Single Source of Truth**: package.json is now the master version source

## [1.11.0] - 2024-12-19

### Added
- **Comprehensive Retry System**: Implemented robust retry mechanism with exponential backoff
- **Error Classification**: Smart error detection for connection, server, quota, and authentication issues
- **RetryManager Class**: Centralized retry logic with configurable attempts and delays
- **Provider Integration**: Retry system integrated with all AI providers (ChatGPT, Gemini, Grok)
- **User-Friendly Error Messages**: Context-aware error messages based on error type
- **Modern Chat UI**: Redesigned chat interface using boxen-style boxes for better UX
- **Copyable Text**: Removed left/right borders from chat boxes for easy text copying
- **Visual Consistency**: Unified design language across banner, status bar, and chat elements

### Features
- **Retry System**: 
  - Up to 5 retry attempts with exponential backoff (1-30 seconds)
  - Real-time retry progress display with single-line updates
  - Automatic error classification and appropriate messaging
  - Graceful handling of network timeouts and server errors
- **Chat UI Redesign**:
  - Boxen-style boxes for user and assistant messages
  - Consistent color coding (cyan for user, blue for assistant)
  - Removed redundant "Response received!" messages
  - Clean spacing and visual hierarchy
- **Error Handling**:
  - Connection errors: "Connection failed after multiple attempts"
  - Server errors: "Server is currently unavailable"
  - Quota errors: "API quota exceeded"
  - Auth errors: "Invalid API key"
- **Visual Improvements**:
  - Professional chat bubbles with rounded borders
  - Copyable text without left/right border interference
  - Consistent spacing and padding
  - Better visual separation between messages

### Technical Details
- **RetryManager Implementation**: New utility class with configurable retry parameters
- **Error Classification**: HTTP status code and message-based error detection
- **UI Components**: Redesigned showUserMessage, showAssistantResponse, and showRetryProgress
- **Boxen Integration**: Leveraged boxen library for consistent styling
- **Border Removal**: Custom logic to remove left/right borders while maintaining visual appeal
- **Version Update**: Updated to version 1.11.0

## [1.10.0] - 2024-12-19

### Added
- **Common Agent Prompts**: Added 9 pre-built agent personalities for immediate use
- **Agent Templates**: Code Assistant, Writing Assistant, Research Assistant, Educational Assistant, Data Analyst, Creative Assistant, Debugging Assistant, Code Reviewer, and System Architect
- **Agent List View**: New "List all agents" option in agent management showing detailed agent table
- **Quick Agent Switching**: Added `/agent` command for fast agent switching during chat
- **Agent Status Display**: Current agent name now shown in status bar alongside provider and model
- **Enhanced Agent Management**: Improved agent management UI with better organization and visual feedback

### Features
- **Pre-built Agents**: 
  - **Code Assistant**: Expert programming help with code examples and best practices
  - **Writing Assistant**: Professional writing and editing assistance
  - **Research Assistant**: Thorough research with source citations
  - **Educational Assistant**: Step-by-step explanations and learning materials
  - **Data Analyst**: Data interpretation and visualization guidance
  - **Creative Assistant**: Brainstorming and creative project support
  - **Debugging Assistant**: Systematic problem-solving and optimization
  - **Code Reviewer**: Code analysis with constructive feedback
  - **System Architect**: Software architecture and technical consulting
- **Agent Table Display**: Shows agent ID, name, status (default/available), and description
- **Status Bar Integration**: Agent name displayed in magenta color in status bar
- **Quick Commands**: `/agent` command for immediate agent switching without entering settings
- **Visual Feedback**: Clear indication of current agent and available options

### Technical Details
- **Agent Templates**: Comprehensive instructions for each specialized agent type
- **UI Enhancements**: Added agent listing with table format and status indicators
- **Command Integration**: Seamless agent switching via `/agent` command
- **Status Bar Update**: Real-time status bar updates when switching agents
- **Version Update**: Updated to version 1.10.0

## [1.9.7] - 2024-12-19

### Fixed
- **NPM Publishing**: Resolved version conflicts and publishing issues
- **Version Bump**: Updated to version 1.9.7 for clean npm publish

## [1.9.6] - 2024-12-19

### Changed
- **Enhanced Status Bar**: Redesigned status bar with location data integration
- **Location Display**: Added IP address and location information as second row in status bar
- **Connection Status**: Connection status now determined by IP availability (IP required, city optional)
- **Visual Consistency**: Status bar now uses same rounded blue border as header for unified design
- **Location Integration**: Moved location data from welcome message to status bar for better visibility
- **Connection Logic**: Improved connection detection based on network reachability

### Features
- **Dual-Row Status Bar**: First row shows provider/model/connection, second row shows location
- **Smart Location Format**: Displays IP with city/region/country when available, falls back gracefully
- **Connection Indicators**: Green dot (🟢) for connected, red dot (🔴) for disconnected
- **Location Icons**: Uses 📍 icon for location data in status bar
- **Unified Styling**: Consistent rounded blue borders across header and status bar

### Technical Details
- **Status Bar Redesign**: Complete rewrite of status bar with location integration
- **IP Detection**: Connection status based on successful IP address retrieval
- **Location Formatting**: Smart formatting for different levels of location data availability
- **Visual Design**: Consistent border styling with header (rounded, blue)
- **Version Update**: Updated to version 1.9.6

## [1.9.5.1beta] - 2024-12-19

### Changed
- **Banner Redesign**: Completely redesigned application banner with better positioning and content
- **Top-Left Alignment**: Banner now starts at the top-left corner instead of center
- **Improved Content**: Removed ad-like content, added version info and feature highlights
- **Agentic Description**: Updated subtitle to highlight multi-behavior agent capabilities
- **Compact Design**: More space-efficient banner with better visual hierarchy
- **Better Colors**: Updated color scheme with blue border and improved contrast

### Features
- **Professional Layout**: Clean, modern banner design that doesn't waste screen space
- **Version Display**: Shows current version (v1.9.5.1beta) in the banner
- **Feature Highlights**: Displays supported AI providers (ChatGPT • Gemini • Grok)
- **Agentic Capabilities**: Highlights multi-behavior agents and model switching features
- **Compact Status Bar**: Reduced margins for better space utilization

### Technical Details
- **Banner Positioning**: Removed center margins, aligned to top-left
- **Content Structure**: Multi-line banner with title, subtitle, version, and features
- **Color Scheme**: Blue border with black background for better readability
- **Version Update**: Updated to version 1.9.5.1beta

## [1.9.5] - 2024-12-19

### Added
- **Inline CLI Requests**: Added `--ask` option for direct AI queries without entering chat mode
- **File Input Support**: Can now read prompts from files using `--ask ./prompt.txt`
- **File Output Support**: Added `-o/--output` option to save AI responses to files
- **Combined File I/O**: Support for reading prompts from files and writing responses to files
- **Silent Mode**: Inline requests skip application banner and go straight to results
- **Auto-Exit**: Inline requests automatically exit after getting response

### Features
- **Direct Queries**: `terminal-agent [provider] --ask "your question"` for quick AI responses
- **File Processing**: `terminal-agent --ask ./prompt.txt` to read prompts from files
- **Response Export**: `terminal-agent --ask "question" -o ./response.txt` to save responses
- **Full Pipeline**: `terminal-agent --ask ./prompt.txt -o ./response.txt` for complete file I/O
- **Provider Selection**: Can specify provider as first argument: `terminal-agent gemini --ask "question"`
- **Error Handling**: Proper error messages for missing files, API issues, and invalid paths

### Technical Details
- **CLI Enhancement**: Updated commander.js configuration with new options
- **File Detection**: Smart detection of file paths vs direct messages
- **Path Support**: Supports relative and absolute paths for file input/output
- **Exit Behavior**: Proper process exit after inline requests complete
- **Version Update**: Updated to version 1.9.5

## [1.9.1] - 2024-12-19

### Fixed
- **GitHub Actions**: Fixed workflow permissions and action versions
- **NPM Publishing**: Resolved version conflict with existing 1.9.0 release
- **Release Automation**: Improved workflow reliability and error handling

## [1.9.0] - 2024-12-19

### Added
- **Agents Feature**: Added comprehensive agent management system for custom AI personalities
- **Agent Configuration**: Users can create, edit, and manage custom agents with specific instructions
- **Agent Selection**: Choose default agent that guides AI responses in conversations
- **Agent Instructions**: Custom instructions are automatically prepended to first message in conversations
- **Settings Integration**: Added "Manage Agents" option to settings menu with full CRUD operations
- **Agent Persistence**: Agents are stored in configuration and persist between sessions
- **Default Agent**: Pre-configured "General Assistant" agent for immediate use

### Features
- **Agent Management UI**: Complete interface for adding, editing, removing, and viewing agents
- **Agent Instructions Editor**: Built-in editor for writing detailed agent instructions
- **Agent Switching**: Easy switching between different agents for different use cases
- **Chat Integration**: Agent instructions automatically included in new conversations
- **Validation**: Agent ID uniqueness and name validation
- **Fallback Logic**: Automatic fallback to default agent if current agent is removed

### Technical Details
- **Configuration Storage**: Agents stored in `config.json` under `agents` section
- **API Integration**: Modified `sendMessage()` to include agent instructions in first message
- **UI Navigation**: Full integration with existing settings menu and ESC key handling
- **Error Handling**: Proper error handling for agent operations with user feedback

## [1.8.1] - 2024-12-19

### Fixed
- **CLI Execution**: Fixed incomplete CLI code that was missing argument parsing
- **Global Installation**: Restored proper CLI functionality for global npm installations
- **Command Line Interface**: Added missing `.parse()` and main function call

## [1.8.0] - 2024-12-19

### Added
- **Professional Debugger System**: Added comprehensive debugging framework (`src/debugger.js`)
- **Debug CLI Option**: Added `--debug` flag for troubleshooting
- **Smart Error Reporting**: Enhanced error extraction and sanitization
- **HTTP Request/Response Logging**: Detailed API call monitoring
- **Sensitive Data Protection**: Automatic API key and token masking

### Fixed
- **Gemini Chat History**: Fixed 400 errors in multi-message conversations
- **Role Field Support**: Added required `role: 'user'` fields for chat API
- **Request Format**: Corrected Gemini API request structure for conversations
- **Debug Output**: Replaced verbose `[Object]` with useful, sanitized information

### Changed
- **Debug Output**: Clean, focused debugging with timestamps and structured data
- **Error Handling**: Improved error messages with relevant context
- **API Compatibility**: Enhanced Gemini provider for proper chat conversations
- **CLI Interface**: Added debug mode for development and troubleshooting

## [1.7.1] - 2024-12-19

### Fixed
- **Critical Gemini API Fix**: Replaced Google AI SDK with direct axios implementation
- **403 Forbidden Resolution**: Fixed API compatibility issues with Gemini 2.0 models
- **Request Format**: Eliminated problematic SDK headers and fields
- **Direct API Calls**: Now uses exact same request format as working curl examples
- **API Compatibility**: Resolved conflicts between SDK and API key permissions

### Changed
- **Gemini Provider**: Completely rewritten to use direct HTTP requests
- **Request Headers**: Removed `x-goog-api-client` header that caused 403 errors
- **Request Body**: Removed `role` field that was incompatible with API
- **Error Handling**: Enhanced debugging and error reporting for API issues

## [1.7.0] - 2024-12-19

### Fixed
- **Gemini Model Support**: Added `gemini-2.0-flash` and `gemini-2.0-pro` to available models list
- **API Compatibility**: Fixed 403 Forbidden errors when using newer Gemini models
- **Model Selection**: Ensured configured models are properly recognized by Google AI SDK

### Changed
- Updated default Gemini model support to include latest Gemini 2.0 series
- Enhanced model availability for better API compatibility

## [1.6.6] - 2024-12-19

### Fixed
- **Provider Selection**: Fixed broken provider selection in settings (now shows all providers)
- **Default Provider**: Changed default provider from openai to gemini
- **Provider Switching**: Fixed provider switching logic to use correct provider keys
- **Status Indicators**: Added status indicators for providers (✅ Ready / ⚠️ Needs API key)
- **Fallback Logic**: Fixed fallback logic when default provider isn't available
- **Error Resolution**: Resolved 'Provider openai is not initialized' errors

## [1.6.5] - 2024-12-19

### Fixed
- **Setup Flow UX**: Fixed major UX issue where app would exit if no API keys were configured
- **Chat Access**: Users can now enter chat page and access /settings even without API keys
- **Error Prevention**: App prevents chatting with AI when no keys are available but allows navigation
- **Status Bar**: Shows "No API Keys" status when no keys are configured
- **User Guidance**: Provides clear instructions to add keys via /settings

## [1.6.4] - 2024-12-19

### Fixed
- **Windows Compatibility**: Fixed `ERR_REQUIRE_ESM` error on Windows systems
- **Dependency Issue**: Downgraded `boxen` from v7.x to v6.1.1 for CommonJS compatibility
- **Package Dependencies**: Removed self-reference `terminal-agent` from dependencies
- **Cross-Platform**: Ensured proper functionality across Windows, macOS, and Linux

## [1.6.3] - 2024-12-19

### Added
- **Configuration Import/Export**: Added ability to import and export configurations
- **CLI Commands**: Added `--export [file]` and `--import [file]` options
- **Settings Menu**: Added "Import/Export configuration" option in settings
- **Version Tracking**: Export includes version and timestamp information
- **Validation**: Basic validation of imported configuration data
- **File Management**: Support for both CLI and UI-based configuration management

## [1.6.2] - 2024-12-19

### Added
- **IP and Location Detection**: Added automatic detection of user's public IP and location
- **Geolocation**: Shows city, region, country, and ISP information
- **Welcome Message**: Enhanced welcome message with location details
- **Loading Indicator**: Shows loading state while detecting location
- **Fallback Support**: Uses multiple IP detection services for reliability

## [1.6.1] - 2024-12-19

### Added
- **Grok AI Model Updates**: Added support for latest Grok models
- **Vision Models**: Added Grok-4V and Grok-4V-mini for image processing
- **Model Selection**: Updated default model to Grok-4 for better performance
- **Enhanced Models**: Added Grok-3 series and Grok-4 series models
- **Model Compatibility**: Improved model selection across all providers

## [1.4.0] - 2024-12-19

### Added
- **Multi-Provider Support**: Added support for ChatGPT, Gemini, and Grok AI
- **Dynamic Setup**: Interactive setup wizard for API key configuration
- **Provider Switching**: Ability to switch between AI providers during chat
- **Model Selection**: Choose different models for each provider
- **Settings Management**: Comprehensive settings menu for configuration
- **API Key Management**: Add, remove, and manage API keys for all providers 