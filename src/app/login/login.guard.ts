import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {  toObservable } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {

  const authSvc = inject(AuthService);
  const router = inject(Router);

  return toObservable(authSvc.token).pipe(
    tap(token => console.log(token)),
    map(token => !!(token && token?.length > 0)),
    tap(canActivate => {
      if (!canActivate) {
        router.navigate(['/login']);
      }
    })
  );
};
