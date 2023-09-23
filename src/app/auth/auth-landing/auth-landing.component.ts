import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.scss'],
})
export class AuthLandingComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  authSvc = inject(AuthService);

  accessToken = this.authSvc.token;

  constructor() {
    this.route.fragment
      .pipe(
        takeUntilDestroyed(),
        map((fragment) => new URLSearchParams(fragment ?? '')),
        map((params) => decodeURIComponent(params.get('access_token') ?? ''))
      )
      .subscribe({
        next: (token) => {
          this.authSvc.setAccessToken(token);
          this.router.navigate(['/users']);
        },
      });
  }
}
