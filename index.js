import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import socketIO from "socket.io";
import socketServerRouter from "./controllers/Socket-server";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  transports: ["polling"],
  cors: {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  },
});

io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("message", (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});

export { io };

app.use(express.json());
app.use(cors());
app.use("/api", socketServerRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
