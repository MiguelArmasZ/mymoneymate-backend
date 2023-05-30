import bcrypt from 'bcrypt'

export async function hashingPassword(password: string): Promise<string> {
  const salt = 10
  const passwordHash = bcrypt.hashSync(password, salt)

  return passwordHash
}
