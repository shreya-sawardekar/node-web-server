const net = require("net");
const server = net.createServer((socket) => {
  //   socket.write("Enter a number>");

  // listen for data
  socket.on("data", (data) => {
    // console.log(data.toString());
    const request = data.toString();
    console.log(request);

    const [header, body] = request.split("\r\n\r\n");
    const headers = header.split("\r\n");
    const [method, path, version] = headers[0].split(" ");

    socket.write("HTTP/1.1 200 OK\r\n");
    // socket.write("Content-Type: text/plain\r\n");
    socket.write("Content-Type: text/html\r\n");
    socket.write("\r\n");
    // socket.write("Hello, world!");
    const html = `<html>
    <body> <h1>Welcome to my webpage!</h1>  <h1>${method} ${path}</h1></body>
    </html>
    `;
    socket.write(html);
    socket.end();
  });

  socket.on("error", (error) => {
    console.log(error);
  });

  //   socket.on("end", () => {
  //     console.log("client disconnected");
  //   });
});

server.listen(8080, () => {
  console.log("Started server on", server.address());
});
