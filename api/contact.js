const CONTACT_EMAIL = "mdasadujjaman101@gmail.com";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
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
    },
    body: body.toString(),
  });

  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, data };
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const name = String(payload.name || "").trim();
    const email = String(payload.email || "").trim();
    const subject = String(payload.subject || "").trim();
    const message = String(payload.message || "").trim();

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required.",
      });
    }

    const result = await forwardToFormSubmit({ name, email, subject, message });
    const successFlag = result.data.success === true || result.data.success === "true";
    const activation =
      typeof result.data.message === "string" &&
      result.data.message.toLowerCase().includes("activation");

    if (successFlag) {
      return res.status(200).json({
        success: true,
        message: "Message sent successfully to your email.",
      });
    }

    if (activation) {
      return res.status(200).json({
        success: false,
        activation: true,
        message:
          "FormSubmit sent an activation email to mdasadujjaman101@gmail.com. Open Gmail, click Activate Form, then submit again.",
      });
    }

    return res.status(200).json({
      success: false,
      message: result.data.message || "Email provider rejected the message.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Server error while sending message.",
    });
  }
}
