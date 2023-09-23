import { Injectable, Signal, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  token = signal<string | null>(null);
  logToken = effect(() => console.log('access_token:  ' + this.token()));

  setAccessToken(access_token: string): void {
    if (access_token?.length > 0) {
      this.token.set(access_token);
    } else {
      this.token.set(null);
    }
  }

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
