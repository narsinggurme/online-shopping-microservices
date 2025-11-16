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

}
