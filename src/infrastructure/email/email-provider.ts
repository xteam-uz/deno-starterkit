export type EmailMessage = { to: string; subject: string; html?: string; text?: string };

export interface EmailProvider { send(message: EmailMessage): Promise<void>; }

export class ConsoleEmailProvider implements EmailProvider {
  async send(message: EmailMessage): Promise<void> {
    console.log(JSON.stringify({ event: "email.send", message }));
  }
}

export class SmtpEmailProvider implements EmailProvider { async send(_message: EmailMessage): Promise<void> { throw new Error("SMTP adapter not configured"); } }
export class ResendEmailProvider implements EmailProvider { async send(_message: EmailMessage): Promise<void> { throw new Error("Resend adapter not configured"); } }
export class SendGridEmailProvider implements EmailProvider { async send(_message: EmailMessage): Promise<void> { throw new Error("SendGrid adapter not configured"); } }
