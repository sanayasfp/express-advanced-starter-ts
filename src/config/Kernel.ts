import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export default class Config {
  private readonly config: Record<string, any>;

  constructor({ envFilePath, envFileName }: { envFilePath?: string; envFileName?: string; } = {}) {
    envFilePath = envFilePath || this.findEnvFile(envFileName);
    dotenv.config({ path: envFilePath });
    this.config = process.env;
  }

  private findEnvFile(envFileName?: string): string {
    const rootPath = process.cwd();
    let currentPath = rootPath;

    const fileMatcher = envFileName || /^\.env(\..+)?$/;

    while (true) {
      const files = fs.readdirSync(currentPath);
      const envFile = files.find((file) => file.match(fileMatcher));

      if (envFile) {
        return path.join(currentPath, envFile);
      }

      const parentPath = path.dirname(currentPath);
      if (parentPath === currentPath) {
        break;
      }

      currentPath = parentPath;
    }

    throw new Error('No .env file found');
  }

  get<T extends string | number | boolean = string>(key: string, defaultValue?: string | number | boolean): T | undefined {
    return (this.config[key] || defaultValue) as T | undefined;
  }

  getOrThrow<T extends string = string>(key: string) {
    const value = this.get<T>(key);

    if (typeof value === 'undefined') throw new Error(`Env variable with key '${key}' not defined`);
    return value;
  }

  getInt(key: string, defaultValue?: number): number | undefined {
    return parseInt(`${this.get(key, defaultValue)}`, 10) || undefined;
  }

  getIntOrThrow(key: string) {
    const value = this.getInt(key);

    if (typeof value === 'undefined') throw new Error(`Env variable with key '${key}' not defined`);
    return value;
  }

  getBoolean(key: string, defaultValue?: boolean): boolean | undefined {
    const value = this.get<string | boolean>(key, defaultValue);
    if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return undefined;
  }

  getBooleanOrThrow(key: string) {
    const value = this.getBoolean(key);

    if (typeof value === 'undefined') throw new Error(`Env variable with key '${key}' not defined`);
    return value;
  }
}
