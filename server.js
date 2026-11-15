const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 5500;
const CONTACT_EMAIL = "mdasadujjaman101@gmail.com";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".json": "application/json; charset=utf-8",
};

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function saveLocalCopy(payload) {
  const dir = path.join(ROOT, "inbox");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, "messages.json");
  let list = [];
  if (fs.existsSync(file)) {
    try {
      list = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (_) {
      list = [];
    }
  }
  list.unshift({ ...payload, receivedAt: new Date().toISOString() });
  fs.writeFileSync(file, JSON.stringify(list, null, 2));
}

async function forwardToFormSubmit(payload) {
  const body = new URLSearchParams();
  body.set("name", payload.name);
  body.set("email", payload.email);
  body.set("message", payload.message);
  body.set("_replyto", payload.email);
  body.set("_subject", payload.subject || `Portfolio message from ${payload.name}`);
  body.set("_template", "table");
  body.set("_captcha", "false");

  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: `http://127.0.0.1:${PORT}`,
      Referer: `http://127.0.0.1:${PORT}/`,
    },
    body: body.toString(),
  });

  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, data };
}

async function handleContact(req, res) {
  try {
    const raw = await readBody(req);
    let payload = {};
    const contentType = req.headers["content-type"] || "";

    if (contentType.includes("application/json")) {
      payload = JSON.parse(raw || "{}");
    } else {
      const params = new URLSearchParams(raw);
      payload = Object.fromEntries(params.entries());
    }

    const name = String(payload.name || "").trim();
    const email = String(payload.email || "").trim();
    const subject = String(payload.subject || "").trim();
    const message = String(payload.message || "").trim();

    if (!name || !email || !message) {
      return sendJson(res, 400, { success: false, error: "Name, email, and message are required." });
    }

    saveLocalCopy({ name, email, subject, message });

    const result = await forwardToFormSubmit({ name, email, subject, message });
    const successFlag = result.data.success === true || result.data.success === "true";
    const activation =
      typeof result.data.message === "string" &&
      result.data.message.toLowerCase().includes("activation");

    if (successFlag) {
      return sendJson(res, 200, {
        success: true,
        message: "Message sent successfully to your email.",
      });
    }

    if (activation) {
      return sendJson(res, 200, {
        success: false,
        activation: true,
        message:
          "FormSubmit sent an activation email to mdasadujjaman101@gmail.com. Open Gmail, click Activate Form, then submit again.",
        savedLocally: true,
      });
    }

    return sendJson(res, 200, {
      success: false,
      message: result.data.message || "Email provider rejected the message.",
      savedLocally: true,
    });
  } catch (error) {
    return sendJson(res, 500, {
      success: false,
      error: error.message || "Server error while sending message.",
    });
  }
}

function serveStatic(req, res, pathname) {
  let urlPath = decodeURIComponent(pathname);
  if (urlPath === "/") urlPath = "/index.html";
  const filePath = path.normalize(path.join(ROOT, urlPath.replace(/^\/+/, "")));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end("Not found");
    }
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);

  if (req.method === "OPTIONS" && url.pathname === "/api/contact") {
    return sendJson(res, 204, {});
  }

  if (req.method === "POST" && url.pathname === "/api/contact") {
    return handleContact(req, res);
  }

  if (req.method === "GET" || req.method === "HEAD") {
    return serveStatic(req, res, url.pathname);
  }

  res.writeHead(405);
  res.end("Method not allowed");
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Portfolio running at http://127.0.0.1:${PORT}`);
  console.log(`Contact API: POST http://127.0.0.1:${PORT}/api/contact`);
  console.log(`Messages go to: ${CONTACT_EMAIL}`);
});
