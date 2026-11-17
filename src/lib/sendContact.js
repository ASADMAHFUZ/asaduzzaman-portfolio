const CONTACT_EMAIL = "mdasadujjaman101@gmail.com";

async function parseJson(response) {
  return response.json().catch(() => ({}));
}

async function sendViaApi(payload) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  // SPA fallback HTML means the API route is missing
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("API unavailable");
  }

  return parseJson(response);
}

async function sendViaFormSubmit(payload) {
  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      message: payload.message,
      _replyto: payload.email,
      _subject: payload.subject || `Portfolio message from ${payload.name}`,
      _template: "table",
      _captcha: "false",
    }),
  });

  const data = await parseJson(response);
  const success = data.success === true || data.success === "true";
  const activation =
    typeof data.message === "string" && data.message.toLowerCase().includes("activation");

  if (success) return { success: true, message: data.message };
  if (activation) {
    return {
      success: false,
      activation: true,
      message:
        "FormSubmit sent an activation email to mdasadujjaman101@gmail.com. Open Gmail, click Activate Form, then submit again.",
    };
  }

  return {
    success: false,
    message: data.message || "Email provider rejected the message.",
  };
}

export async function sendContactMessage(payload) {
  try {
    const data = await sendViaApi(payload);
    if (data && typeof data.success !== "undefined") return data;
  } catch {
    // Fall through to FormSubmit (covers Vercel when API is unavailable)
  }

  return sendViaFormSubmit(payload);
}

export { CONTACT_EMAIL };
