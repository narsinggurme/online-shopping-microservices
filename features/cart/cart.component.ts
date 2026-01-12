import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, forkJoin, take } from 'rxjs';

import { CartService } from '../../Services/cart.service';
import { OrderService } from '../../Services/order.service';
import { KeycloakService } from '../../src/app/KeyCloak/keycloak.service';
import { AuthService } from '../../Services/auth.service';
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

  userDetails!: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private keycloakService: KeycloakService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems$;

    // Calculate total
    this.cartItems$.subscribe(items => {
      this.total = items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
      );
    });

    // Load user profile ONLY if logged in
    if (this.authService.isLoggedIn()) {
      this.keycloakService.getProfile().then(profile => {
        this.userDetails = {
          firstName: profile.firstName ?? '',
          lastName: profile.lastName ?? '',
          email: profile.email ?? ''
        };
      });
    }
  }

  updateQty(productId: string, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  updateQtyInput(productId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);

    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  remove(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  async checkout(): Promise<void> {

    // 🔐 Step 1: Force login if not authenticated
    if (!this.authService.isLoggedIn()) {
      console.log('User not logged in → redirecting to Keycloak');
      await this.authService.login(window.location.origin + '/cart');
      return;
    }

    // ✅ Step 2: Proceed with checkout
    this.cartItems$.pipe(take(1)).subscribe(items => {

      if (!items.length) return;

      const orderRequests = items.map(item => ({
        orderNumber: crypto.randomUUID(),
        skuCode: item.product.skuCode,
        quantity: item.quantity,
        price: item.product.price,
        userDetails: this.userDetails
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
    });
  }
}
