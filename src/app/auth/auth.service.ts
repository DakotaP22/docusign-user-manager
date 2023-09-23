import { Injectable, Signal, computed, effect, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Subject } from 'rxjs';

export type AuthState = {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // state
  private state = signal<AuthState>(initialState);

  // selectors
  token = computed(() => this.state().accessToken);
  isAuthorized = computed(() => !!this.token);

  // events
  tokenUpdated$ = new Subject<string | null>();

  // effects
  logToken = effect(() => console.log('access_token:  ' + this.token()));


  constructor() {
    // reducers
    this.tokenUpdated$.pipe(takeUntilDestroyed()).subscribe((token: string | null) => {
      this.state.update(currentState => ({ ...currentState, accessToken: token }));
    })
  }

  // actions
  setAccessToken(token: string | null): void {
    this.tokenUpdated$.next(token);
  }

  // helper functions
  redirectToSignIn() {
    const token = '';
    const scopes = 'user-read,user-write,account-read';
    const integrationKey = '3c94b623-bf53-40d8-9cb1-2a8ff7bf3cd4';
    const redirectUri = 'http://localhost:4200/auth/callback';

    // redirect to docusign login
    window.location.href =
      'https://account-d.docusign.com/oauth/auth?' +
      'response_type=token' +
      '&scope=' +
      scopes +
      '&client_id=' +
      integrationKey +
      '&redirect_uri=' +
      redirectUri;
  }
}
