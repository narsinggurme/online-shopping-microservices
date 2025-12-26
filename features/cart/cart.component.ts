import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CartItem } from '../../src/app/models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems$!: Observable<CartItem[]>;
  total = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems$ = this.cartService.cartItems$;

    this.cartItems$.subscribe(items => {
      this.total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    });
  }

  updateQty(productId: string, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }
  updateQtyInput(productId: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  remove(productId: string) {
    this.cartService.removeFromCart(productId);
  }
}
