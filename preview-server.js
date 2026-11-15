const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const token =
  Buffer.from("portfolio" + Date.now().toString(36))
    .toString("base64")
    .replace(/[+\/]/g, "")
    .slice(0, 11) + "=";

const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const server = http.createServer((req, res) => {
  let u = decodeURIComponent((req.url || "/").split("?")[0]);

  if (u === "/" || u === "/" + token || u === "/" + token + "/") {
    u = "/index.html";
  } else if (u.startsWith("/" + token + "/")) {
    u = u.slice(("/" + token).length);
  }

  const clean = u.replace(/^\/+/, "");
  const file = path.normalize(path.join(root, clean));

  if (!file.startsWith(root)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end("Not found");
    }
    const type = mime[path.extname(file).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
});

server.listen(0, "127.0.0.1", () => {
  const port = server.address().port;
  const link = "http://127.0.0.1:" + port + "/" + token;
  fs.writeFileSync(path.join(root, ".preview-link.txt"), link);
  console.log("PREVIEW_LINK=" + link);
});
