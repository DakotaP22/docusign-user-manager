import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  private authSvc = inject(AuthService); 

  token$: Observable<string | null> = toObservable(this.authSvc.token); 
}
