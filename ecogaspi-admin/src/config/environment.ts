interface EnvironmentConfig {
  env: string;
  apiBaseUrl: string;
  apiVersion: string;
  websocketUrl: string;
  uploadBaseUrl: string;
  debug: boolean;
}

class Environment {
  private config: EnvironmentConfig;

  constructor() {
    this.config = {
      env: process.env.REACT_APP_ENV || 'development',
      apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
      apiVersion: process.env.REACT_APP_API_VERSION || 'v1',
      websocketUrl: process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8080/ws',
      uploadBaseUrl: process.env.REACT_APP_UPLOAD_BASE_URL || 'http://localhost:8080/uploads',
      debug: process.env.REACT_APP_DEBUG === 'true'
    };

    if (this.config.debug) {
      console.log('🔧 Environment Configuration:', this.config);
    }
  }

  get isDevelopment(): boolean {
    return this.config.env === 'development';
  }

  get isProduction(): boolean {
    return this.config.env === 'production';
  }

  get isStaging(): boolean {
    return this.config.env === 'staging';
  }

  get apiBaseUrl(): string {
    return this.config.apiBaseUrl;
  }

  get apiVersion(): string {
    return this.config.apiVersion;
  }

  get fullApiUrl(): string {
    return `${this.config.apiBaseUrl}/${this.config.apiVersion}`;
  }

  get websocketUrl(): string {
    return this.config.websocketUrl;
  }

  get uploadBaseUrl(): string {
    return this.config.uploadBaseUrl;
  }

  get debug(): boolean {
    return this.config.debug;
  }

  // Helper method to build API endpoints
  buildApiUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${this.fullApiUrl}/${cleanEndpoint}`;
  }

  // Helper method to build upload URLs
  buildUploadUrl(filename: string): string {
    return `${this.config.uploadBaseUrl}/${filename}`;
  }

  // Method to log environment info
  logEnvironmentInfo(): void {
    console.log(`
🌍 ECOGASPI Admin - Environment: ${this.config.env}
🔗 API Base URL: ${this.config.apiBaseUrl}
📡 WebSocket URL: ${this.config.websocketUrl}
📁 Upload Base URL: ${this.config.uploadBaseUrl}
🐛 Debug Mode: ${this.config.debug}
    `);
  }
}

export const env = new Environment();
export default env;