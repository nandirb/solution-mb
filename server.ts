import { startServer } from "./src/app";

if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}
