import { Routes } from '@angular/router';
import { LoginComponent } from '../../Authentication/login/login.component';
import { RegisterComponent } from '../../Authentication/register/register.component';
import { HomeComponent } from '../../features/home/home.component';
import { authGuard } from '../../guards/auth.guard';
import { ProductsComponent } from '../../features/products/products.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'products', component: ProductsComponent }

];
