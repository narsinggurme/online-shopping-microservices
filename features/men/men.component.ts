import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-men',
  imports: [CommonModule, FormsModule],
  templateUrl: './men.component.html',
  styleUrl: './men.component.css'
})
export class MenComponent implements OnInit {

  products: any[] = [];

  constructor(
    private productServie: ProductService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productServie.getProductsByCategory('M').subscribe(data => {
      this.products = data;
    });
  }


  viewProduct(id: number) {
    this.router.navigate(['/product-details', id]);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  isInCart(productId: string): boolean {
    return this.cartService.isInCart(productId);
  }


  goToCart() {
    this.router.navigate(['/cart']);
  }
}

