export const HOST = process.env.HOSTNAME || "localhost";
export const PORT = process.env.PORT || "3000";
export const ENV = process.env.NODE_ENV || "development";

export const isProduction = ENV === "production";
export const isDebug = ENV === "development";
export const isClient = typeof window !== "undefined";

export const baseURL = `http://${HOST}:${PORT}`;