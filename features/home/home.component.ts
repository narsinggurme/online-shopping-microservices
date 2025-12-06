import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  heroImages = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f',
    'https://plus.unsplash.com/premium_photo-1683887064255-1c428d0b3934'
  ];

  currentIndex = 0;

  constructor(private auth: AuthService, private route: Router) { }

  logout() {
    this.auth.logout;
    this.route.navigate(["/login"]);

  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.heroImages.length;

    }, 5000);
  }

  get currentHeroBg() {
    return `url('${this.heroImages[this.currentIndex]}')`;
  }
  categories = [
    { name: 'Men', description: 'Explore latest men’s fashion', route: '/category/men' },
    { name: 'Women', description: 'Trendy women’s wear & accessories', route: '/category/women' },
    { name: 'Electronics', description: 'Smart gadgets & devices', route: '/category/electronics' },
    { name: 'Home & Living', description: 'Decor, furniture & essentials', route: '/category/home' },
    { name: 'Sports', description: 'Sports gear & outdoor equipment', route: '/category/sports' }
  ];

  featuredProducts = [
    { name: 'Men\'s Leather Jacket', price: 3499, image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGphY2tldHxlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Women\'s Handbag', price: 1299, image: 'https://plus.unsplash.com/premium_photo-1723826753083-2309f7203ab1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFuZGJhZ3xlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Wireless Earbuds', price: 1999, image: 'https://placehold.co/250x250?text=Earbuds' },
    { name: 'Smartwatch', price: 4999, image: 'https://placehold.co/250x250?text=Smartwatch' }
  ];

  navigateToCategory(route: string) {
    // Use Angular router to navigate
    window.location.href = route; // or this.router.navigate([route]) if using Angular Router
  }

}
