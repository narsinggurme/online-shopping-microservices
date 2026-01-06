import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { CartItem } from '../../src/app/models/cart-item.model';
import { OrderService } from '../../Services/order.service';

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

  constructor(private cartService: CartService, private orderService: OrderService) { }

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
  checkout() {
    this.cartItems$.subscribe(items => {

      if (!items.length) {
        return;
      }

      const userDetails = {
        firstName: 'Narsing',
        lastName: 'Gurme',
        email: 'user@gmail.com'
      };

      const orderRequests = items.map(item => ({
        orderNumber: crypto.randomUUID(),
        skuCode: item.product.skuCode,
        quantity: item.quantity,
        price: item.product.price,
        userDetails
      }));

      forkJoin(
        orderRequests.map(order =>
          this.orderService.placeOrder(order)
        )
      ).subscribe({
        next: () => {
          alert('Checkout successful');
          this.cartService.clearCart();
        },
        error: err => {
          console.error(err);
          alert('Checkout failed. Please try again.');
        }
      });

    }).unsubscribe();
  }


}
