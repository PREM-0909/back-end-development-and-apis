import http from "http";
import fs from "fs";
import { WebSocketServer, WebSocket } from "ws";

const PORT = 3001;

const server = http.createServer((req, res) => {
  fs.readFile("./public/index.html", (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("404 Not Found");
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket, req) => {
  const host = req.headers.host || "localhost:3001";
  const url = new URL(req.url, `http://${host}`);
  const username = url.searchParams.get("username") || "Anonymous";

  // Notify existing clients that someone joined
  const joinedMessage = JSON.stringify({
    type: "system",
    text: `${username} joined`,
  });

  wss.clients.forEach((client) => {
    if (
      client !== socket &&
      client.readyState === WebSocket.OPEN
    ) {
      client.send(joinedMessage);
    }
  });

  // Receive chat messages
  socket.on("message", (data) => {
    try {
      const parsedData = JSON.parse(data.toString());

      const chatMessage = JSON.stringify({
        type: "chat",
        username,
        text: parsedData.text,
      });

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(chatMessage);
        }
      });
    } catch (err) {
      console.error("Invalid message format");
    }
  });

  // Notify remaining clients when someone leaves
  socket.on("close", () => {
    const leftMessage = JSON.stringify({
      type: "system",
      text: `${username} left`,
    });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(leftMessage);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});