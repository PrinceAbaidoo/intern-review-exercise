import { db } from "../lib/db";

export type CartItem = {
  productId: string;
  unitPrice: number;
  quantity: number;
};

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
}

export async function getUser(userId: string) {
  return db.user.findUnique({ where: { id: userId } });
}

export async function deleteUser(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } });
  await db.user.delete({ where: { id: userId } });
  return user;
}
