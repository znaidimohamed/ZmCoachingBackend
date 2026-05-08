import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(Number(env.port), () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
};

startServer();