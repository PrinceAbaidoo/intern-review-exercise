import { db } from "../lib/db";
import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

export interface UpdateUserInput {
  name: string;
  email: string;
  password?: string;
}

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function getUser(userId: string) {
  return db.user.findUnique({ where: { id: userId } });
}

export async function updateUser(userId: string, data: UpdateUserInput) {
  const password = data.password
    ? { password: await hashPassword(data.password) }
    : {};

  return db.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      email: data.email,
      ...password,
    },
  });
}

export async function deleteUser(userId: string) {
  await db.user.delete({ where: { id: userId } });
  console.log("deleted user " + userId);
}
