import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { ratingAbilities } from "@/lib/mviexperience";

const resend = new Resend(process.env.RESEND_API_KEY);

function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Submitted values land in an HTML email, so they must not carry markup.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** One labelled row in the application email. Blank optional answers are noted. */
function row(label: string, value: unknown) {
  const text = typeof value === "string" ? value.trim() : "";
  const shown = text
    ? escapeHtml(text).replace(/\n/g, "<br />")
    : "<em>Not provided</em>";
  return `<tr>
      <td style="padding:6px 12px 6px 0;vertical-align:top;font-weight:bold;">${escapeHtml(label)}</td>
      <td style="padding:6px 0;vertical-align:top;">${shown}</td>
    </tr>`;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = (req.body || {}) as Record<string, string>;
  const {
    honey,
    gender,
    fullName,
    dob,
    address,
    phone,
    email,
    guardian,
    motivation,
    parentalConsent,
    confirmation,
  } = body;

  if (honey && honey.trim() !== "") {
    return res.status(403).json({ error: "Spam detected, message rejected" });
  }

  // Mirror the fields the form marks required so a crafted POST cannot bypass
  // the browser's validation.
  const missingRequired =
    !gender ||
    !fullName ||
    !dob ||
    !address ||
    !phone ||
    !email ||
    !guardian ||
    !motivation ||
    !parentalConsent ||
    !confirmation ||
    ratingAbilities.some((ability) => !body[ability.name]);

  if (missingRequired) {
    return res
      .status(400)
      .json({ error: "Please complete all required fields before submitting." });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const ratingRows = ratingAbilities
    .map((ability) => row(ability.label, body[ability.name]))
    .join("");

  const html = `
    <h2>New #MVIExperience application</h2>
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;color:#111;">
      ${row("Full name", fullName)}
      ${row("Gender", gender)}
      ${row("Date of birth", dob)}
      ${row("Home address", address)}
      ${row("Calls/WhatsApp number", phone)}
      ${row("Email", email)}
      ${row("Parent/Guardian details", guardian)}
      ${row("Instagram", body.instagram)}
      ${row("Facebook", body.facebook)}
    </table>

    <h3>Self-assessment</h3>
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;color:#111;">
      ${ratingRows}
    </table>

    <h3>Responses</h3>
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;color:#111;">
      ${row("Hopes / motivation", motivation)}
      ${row("Support or adjustments needed", body.support)}
      ${row("Parent consents (if under 18)", parentalConsent)}
      ${row("Confirmed information is truthful", confirmation)}
    </table>
  `;

  const { data, error } = await resend.emails.send({
    from: `MVI Website <${process.env.RESEND_FROM_EMAIL!}>`,
    to: [process.env.EMAIL!],
    replyTo: email,
    subject: `MVI - #MVIExperience application from ${fullName}`,
    html,
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
}

export default handler;
