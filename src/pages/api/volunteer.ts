import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface VolunteerPayload {
  name?: string;
  email?: string;
  role?: string;
  message?: string;
  honey?: string;
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

  const { name, email, role, message, honey }: VolunteerPayload =
    req.body || {};

  if (honey && honey.trim() !== "") {
    return res.status(403).json({ error: "Spam detected, message rejected" });
  }

  if (!name || !email || !role) {
    return res
      .status(400)
      .json({ error: "Please fill in your name, email and preferred role" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Unlike the contact form, links are NOT treated as spam here — a volunteer
  // sending a LinkedIn profile or a portfolio is the expected case, not abuse.

  const { data, error } = await resend.emails.send({
    from: `MVI Website <${process.env.RESEND_FROM_EMAIL!}>`,
    to: [process.env.EMAIL!],
    replyTo: email,
    subject: `MVI - New volunteer application from ${name}`,
    html: `
        <h2>New volunteer application</h2>
        <h4>Name: ${escapeHtml(name)}</h4>
        <h4>Email: ${escapeHtml(email)}</h4>
        <h4>Preferred role: ${escapeHtml(role)}</h4>
        <p>${message ? escapeHtml(message).replace(/\n/g, "<br />") : "<em>No message provided.</em>"}</p>
      `,
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
}

export default handler;
