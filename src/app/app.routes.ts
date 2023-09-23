import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthLandingComponent } from './auth/auth-landing/auth-landing.component';
import { LoginComponent } from './login/login.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { loginGuard } from './login/login.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
        title: 'DocuSign User Manger'
    },
    {
        path: 'login',
        title: 'DocuSign User Manger',
        component: LoginComponent
    },
    {
        path: 'auth/callback',
        title: 'DocuSign User Manger',
        component: AuthLandingComponent
    },
    {
        path: 'users',
        title: 'DocuSign User Manger',
        component: UserManagerComponent,
        canActivate: [loginGuard]
    }
];
