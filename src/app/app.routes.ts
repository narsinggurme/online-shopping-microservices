import { Routes } from '@angular/router';
import { LoginComponent } from '../../Authentication/login/login.component';
import { RegisterComponent } from '../../Authentication/register/register.component';
import { HomeComponent } from '../../features/home/home.component';
import { authGuard } from '../../guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent }

];
