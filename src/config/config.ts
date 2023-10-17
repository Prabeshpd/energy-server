import dotenv from "dotenv";

type ENV = "local" | "test";
interface Configuration {
  env: ENV;
  port: string | number;
  secret: string;
  cors: {
    whitelist: string[];
  };
  logger: {
    prettyPrint: boolean;
  };
  auth: {
    saltRounds: string;
    refreshTokenSecret: string;
    refreshTokenDuration: string;
    accessTokenDuration: string;
    accessTokenSecret: string;
  };
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
}

dotenv.config();

const config: Configuration = {
  secret: process.env.SECRET_KEY || "",
  env: process.env.ENV == "test" ? "test" : "local",
  port: process.env.EXPRESS_PORT || "3000",
  cors: {
    whitelist: ["/^localhost$/"]
  },
  logger: {
    prettyPrint: process.env.ENV !== "production"
  },
  auth: {
    saltRounds: "11",
    accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET || "ENTER_ACCESS_TOKEN_SALT_HERE",
    refreshTokenSecret: process.env.AUTH_REFRESH_TOKEN_SECRET || "ENTER_REFRESH_TOKEN_SALT_HERE",
    accessTokenDuration: process.env.AUTH_ACCESS_TOKEN_DURATION || "300000",
    refreshTokenDuration: process.env.AUTH_REFRESH_TOKEN_DURATION || "86400000"
  },
  database: {
    host: process.env.DB_TEST_HOST || "localhost",
    port: (process.env.DB_TEST_PORT && +process.env.DB_TEST_PORT) || 5432,
    user: process.env.DB_TEST_USER || "postgres",
    password: process.env.DB_TEST_PASSWORD || "Admin@1234",
    database: process.env.DB_TEST_DATABASE || "scraper"
  }
};

export default config;
