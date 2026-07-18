import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  honey?: string;
}

function isSpam({ name, email, message, honey }: ContactPayload) {
  if (honey && honey.trim() !== "") return true; // This is a bot

  const suspectPhrases = ["http://", "https://", "buy now", "free money"];
  const text = `${name} ${email} ${message}`.toLowerCase();

  return suspectPhrases.some((p) => text.includes(p));
}

function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Submitted values land in an HTML email, so they must not be able to carry markup.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message, honey }: ContactPayload = req.body || {};

  if (isSpam({ name, email, message, honey })) {
    return res.status(403).json({ error: "Spam detected, message rejected" });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const { data, error } = await resend.emails.send({
    from: `MVI Website <${process.env.RESEND_FROM_EMAIL!}>`,
    to: [process.env.EMAIL!],
    replyTo: email,
    subject: `MVI - New contact form message from ${name}`,
    html: `
        <h2>Hello from ${escapeHtml(name)}</h2>
        <h4>Email address: ${escapeHtml(email)}</h4>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
}

export default handler;
