export type CartItem = {
    productId: string; 
    unitPrice: number; 
    quantity: number
};

const calculateCartTotal = (items: CartItem[]): number => {
    const totalCartPrice = items.reduce((accumulator: number, currentItem: CartItem) => {
        if (currentItem.unitPrice < 0 || currentItem.quantity < 0 || !Number.isInteger(currentItem.quantity)) {
            throw new RangeError(`Invalid cart item: ${currentItem.productId}`);
        }

        return accumulator + Math.round(currentItem.unitPrice * 100) * currentItem.quantity
    }, 0)

    return totalCartPrice / 100
} 
export default calculateCartTotal