export type LogLevel = "debug" | "info" | "warn" | "error";

export class Logger {
  log(level: LogLevel, message: string, context: Record<string, unknown> = {}) {
    console.log(JSON.stringify({ level, message, time: new Date().toISOString(), ...context }));
  }
  debug(message: string, context?: Record<string, unknown>) { this.log("debug", message, context); }
  info(message: string, context?: Record<string, unknown>) { this.log("info", message, context); }
  warn(message: string, context?: Record<string, unknown>) { this.log("warn", message, context); }
  error(message: string, context?: Record<string, unknown>) { this.log("error", message, context); }
}

export const logger = new Logger();
