import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: any[] = [];

  constructor(private productServie: ProductService) { }

  ngOnInit(): void {
    this.productServie.getProducts().subscribe(data => {
      this.products = data;
    }
    );
  }

}
