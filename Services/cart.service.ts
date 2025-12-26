import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../src/app/models/product.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cartItems: Product[] = [];
    private cartCount = new BehaviorSubject<number>(0);

    cartCount$ = this.cartCount.asObservable();

    addToCart(product: Product) {
        this.cartItems.push(product);
        this.cartCount.next(this.cartItems.length);
    }

    getItems() {
        return this.cartItems;
    }
}
