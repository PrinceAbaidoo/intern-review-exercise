import { describe, it, expect } from 'vitest'; 
import calculateCartItems from './calculateCartTotal.ts';

const mockCartItemsData = [
    {productId: "product1", unitPrice: 1, quantity: 5},
    {productId: "product2", unitPrice: 2, quantity: 2},
    {productId: "product3", unitPrice: 10, quantity: 5},
    {productId: "product4", unitPrice: 5, quantity: 3},
]

describe('Testing calculateCartItems() function', () => {
    it('Calculation works correctly for multiply cart items', () => {
        const totalPrice = calculateCartItems(mockCartItemsData);
        expect(totalPrice).toBe(74);
    });

    it('Calculation works correctly for only on cart item', () => {
        const totalPrice = calculateCartItems(mockCartItemsData.slice(0,1));
        expect(totalPrice).toBe(5);
    });

    it('Calculation works on floating point numbers (numbers with decimals)', () => {
        const totalPrice = calculateCartItems([
            {productId: "product1", unitPrice: 0.1, quantity: 1},
            {productId: "product2", unitPrice: 0.2, quantity: 1},
        ]);
        expect(totalPrice).toBe(0.3)
    })
});
