import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit{
  isAuthenticated: boolean = false
  userFullName: string = ''
  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth){

  }
  ngOnInit(): void {
    // subscribe to auth state
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!,
        this.getUserDetails();
      }
    )
  }
  getUserDetails() {
    if(this.isAuthenticated){
      // get logged in user details (user's claims)

      this.oktaAuth.getUser().then(
        (result) => {
          this.userFullName = result.name as string
          this.storage.setItem('userEmail', JSON.stringify(result.email));
        }
      )
    }
  }

  logout(){
    // terminate okta session and remove current tokens
    this.oktaAuth.signOut();
  }
}
