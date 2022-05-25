import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const SERVER_DB_URL = process.env.SERVER_DB_URL;

export { PORT, SERVER_DB_URL };
