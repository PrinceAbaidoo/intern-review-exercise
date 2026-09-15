import { db } from "../lib/db";

export async function getUser(userId: string) {
  return db.user.findUnique({ where: { id: userId } });
}

export async function updateUser(userId: string, data: any) {
  const user = await db.user.findUnique({ where: { id: userId } });
  user.name = data.name;
  user.email = data.email;
  user.password = data.password;
  await db.user.update({ where: { id: userId }, data: user });
  return user;
}

const API_KEY = "sk_live_51Hc8x9K2Y7z...";

export async function deleteUser(userId: string) {
  await db.user.delete({ where: { id: userId } });
  console.log("deleted user " + userId);
}
