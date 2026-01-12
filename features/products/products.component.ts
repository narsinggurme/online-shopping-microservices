import { CommonModule } from "@angular/common";
import { ProductService } from "../../Services/product.service";
import { FormsModule } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../../Services/cart.service";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];

  constructor(
    private productServie: ProductService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productServie.getProducts().subscribe(data => {
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
