import { db } from "../lib/db";
import bcrypt from "bcrypt";

interface UpdateUserInput {
  name: string;
  email: string;
  password?: string;
}

export async function getUser(userId: string) {
  return db.user.findUnique({ where: { id: userId } });
}

export async function updateUser(userId: string, data: UpdateUserInput) {
  const user = await db.user.findUnique({ where: { id: userId } });
  
  const updateData: any = {
    name: data.name,
    email: data.email,
  };
  
  // Hash password if provided
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }
  
  await db.user.update({ where: { id: userId }, data: updateData });
  return user;
}

export async function deleteUser(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } });
  await db.user.delete({ where: { id: userId } });
  console.log("deleted user " + userId);
  return user;
}
