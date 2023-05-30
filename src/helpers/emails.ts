import nodemailer, { type Transporter } from 'nodemailer'
import { type Mailing } from '../types'

const INFO_CONSTS = {
  companyName: 'Money Watcher',
  from: 'Money Watcher - Administrador de Finanzas'
}

export async function signInEmail(data: Mailing): Promise<void> {
  const { email, token, userName } = data

  const transportOptions = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }

  const transport: Transporter = nodemailer.createTransport(
    transportOptions as any
  )

  await transport.sendMail({
    from: INFO_CONSTS.from,
    to: email,
    subject: `${INFO_CONSTS.companyName} - Comprueba tu cuenta`,
    text: 'Comprueba tu cuenta',
    html: `
        <p>Hola ${userName} comprueba tu cuenta en Money Watcher</p>
        <a href="${process.env.FRONTEND_URL}/confirm/${token}">Haz click aquí</a>
    `
  })
}

export async function forgotPasswordEmail(data: Mailing): Promise<void> {
  const { email, token, userName } = data

  const transportOptions = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }

  const transport: Transporter = nodemailer.createTransport(
    transportOptions as any
  )

  await transport.sendMail({
    from: INFO_CONSTS.from,
    to: email,
    subject: `${INFO_CONSTS.companyName} - Reestablece tu contraseña`,
    text: 'Recupera tu acceso',
    html: `
        <p>Hola ${userName} sigue el siguiente enlace para definir una nueva contraseña</p>
        <a href="${process.env.FRONTEND_URL}/new-password/${token}">Haz click aquí</a>
    `
  })
}
