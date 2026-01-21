import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../src/app/models/product.model';
import { CartItem } from '../src/app/models/cart-item.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cartItems: CartItem[] = [];
    private cartCount = new BehaviorSubject<number>(0);
    cartCount$ = this.cartCount.asObservable();
    cartItems$ = new BehaviorSubject<CartItem[]>([]);

    constructor() {
        const stored = localStorage.getItem('cart');
        if (stored) {
            this.cartItems = JSON.parse(stored);
            this.cartItems$.next(this.cartItems);
            this.cartCount.next(this.getTotalQuantity());
        }
    }

    addToCart(product: Product) {
        const index = this.cartItems.findIndex(i => i.product.id === product.id);
        if (index > -1) {
            this.cartItems[index].quantity++;
        } else {
            this.cartItems.push({ product, quantity: 1 });
        }
        this.updateCart();
    }
    clearCart() {
        this.cartItems = [];
        this.cartItems$.next([]);
        this.cartCount.next(0);
        localStorage.removeItem('cart');
    }

    updateQuantity(productId: string, quantity: number) {
        const index = this.cartItems.findIndex(i => i.product.id === productId);
        if (index > -1 && quantity > 0) {
            this.cartItems[index].quantity = quantity;
            this.updateCart();
        }
    }

    removeFromCart(productId: string) {
        this.cartItems = this.cartItems.filter(i => i.product.id !== productId);
        this.updateCart();
    }

    isInCart(productId: string): boolean {
        return this.cartItems.some(i => i.product.id === productId);
    }

    getTotalQuantity(): number {
        return this.cartItems.reduce((sum, i) => sum + i.quantity, 0);
    }

    getTotalPrice(): number {
        return this.cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    }

    private updateCart() {
        this.cartItems$.next([...this.cartItems]);
        this.cartCount.next(this.getTotalQuantity());
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
}
