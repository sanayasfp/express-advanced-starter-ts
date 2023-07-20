import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export default class Config {
  private readonly config: Record<string, any>;

  constructor(_envFilePath?: string) {
    const envFilePath = _envFilePath || this.findEnvFile();
    dotenv.config({ path: envFilePath });
    this.config = process.env;
  }

  private findEnvFile(): string {
    const rootPath = process.cwd();
    let currentPath = rootPath;

    while (true) {
      const files = fs.readdirSync(currentPath);
      const envFile = files.find((file) => file.match(/^\.env(\..+)?$/));

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

  get<T extends string | number | boolean = string>(key: string): T | undefined {
    return this.config[key] as T | undefined;
  }

  getOrThrow<T extends string = string>(key: string) {
    const value = this.get<T>(key);

    if (typeof value === 'undefined') throw new Error(`Env variable with key '${key}' not defined`);
    return value;
  }

  getInt(key: string): number | undefined {
    return parseInt(`${this.get(key)}`, 10) || undefined;
  }

  getIntOrThrow(key: string) {
    const value = this.getInt(key);

    if (typeof value === 'undefined') throw new Error(`Env variable with key '${key}' not defined`);
    return value;
  }

  getBoolean(key: string): boolean | undefined {
    const value = this.get(key);
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
