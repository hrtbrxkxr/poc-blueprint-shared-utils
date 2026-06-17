export type LogLevel = "debug" | "info" | "warn" | "error";

export function createLogger(scope: string) {
  const log = (level: LogLevel, message: string, meta?: Record<string, unknown>) => {
    const entry = { timestamp: new Date().toISOString(), scope, level, message, ...meta };
    console[level === "debug" ? "log" : level](JSON.stringify(entry));
  };

  return {
    debug: (message: string, meta?: Record<string, unknown>) => log("debug", message, meta),
    info: (message: string, meta?: Record<string, unknown>) => log("info", message, meta),
    warn: (message: string, meta?: Record<string, unknown>) => log("warn", message, meta),
    error: (message: string, meta?: Record<string, unknown>) => log("error", message, meta),
  };
}
