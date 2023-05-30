import bcrypt from 'bcrypt'

export async function comparePasswords(
  passwordSent: string,
  passwordSaved: string
): Promise<boolean> {
  const result = bcrypt.compare(passwordSent, passwordSaved)
  return await result
}
