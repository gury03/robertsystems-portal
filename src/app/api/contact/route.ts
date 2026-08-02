import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
  website?: string; // honeypot anti-spam
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: si el campo oculto viene lleno, es un bot.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const smtpUser = process.env.ZOHO_SMTP_USER;
  const smtpPass = process.env.ZOHO_SMTP_PASS;
  const to = process.env.CONTACT_TO ?? smtpUser;

  if (!smtpUser || !smtpPass) {
    console.error("Faltan credenciales SMTP de Zoho");
    return NextResponse.json(
      { error: "Servicio no configurado" },
      { status: 500 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST ?? "smtp.zoho.com",
      port: Number(process.env.ZOHO_SMTP_PORT ?? 465),
      secure: true, // SSL (puerto 465)
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `Robertsystems <${smtpUser}>`,
      to,
      replyTo: email,
      subject: `Nuevo mensaje desde el portal: ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px">
          <h2 style="margin-top:0;color:#0f172a">Nuevo mensaje desde robertsystems.org</h2>
          <p style="margin:4px 0;color:#334155"><strong>Nombre:</strong> ${name}</p>
          <p style="margin:4px 0;color:#334155"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0"/>
          <p style="color:#334155;white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error enviando email:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
