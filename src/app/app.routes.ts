import { Routes } from '@angular/router';
import { LoginComponent } from '../../Authentication/login/login.component';
import { RegisterComponent } from '../../Authentication/register/register.component';
import { HomeComponent } from '../../features/home/home.component';
import { authGuard } from '../../guards/auth.guard';
import { ProductsComponent } from '../../features/products/products.component';
import { MenComponent } from '../../features/men/men.component';
import { WomenComponent } from '../../features/women/women.component';
import { ElectronicsComponent } from '../../features/electronics/electronics.component';
import { CartComponent } from '../../features/cart/cart.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'men', component: MenComponent },
    { path: 'women', component: WomenComponent },
    { path: 'electronics', component: ElectronicsComponent },
    { path: 'cart', component: CartComponent }

];
