const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const port = 3000 || process.env.PORT;

app.use(cors());
function randomData() {
  let red = Math.floor(Math.random() * 25);
  let blue = Math.floor(Math.random() * 25);
  let green = Math.floor(Math.random() * 25);

  return [red, blue, green];
}

io.on("connection", function(socket) {
  setInterval(() => {
    socket.emit("updateData", { data: randomData() });
  }, 3000);
});

app.post("/api/upload-csv", upload.single("file"), (req, res) => {
  res.send("Your data is being processed, hold on...");
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
