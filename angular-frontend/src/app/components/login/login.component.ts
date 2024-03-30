import { Component, Inject, OnInit } from '@angular/core';
import AppConfig from "../../config/app-config"
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  oktaSignin: any;
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth){
    this.oktaSignin = new OktaSignIn({
      logo: "assets/images/logo.png",
      baseUrl: AppConfig.oidc.issuer.split("/oauth2")[0],
      clientId: AppConfig.oidc.clientId,
      redirectUri: AppConfig.oidc.redirectUri,
      authParams:{
        pkce: true,
        issuer: AppConfig.oidc.issuer,
        scopes: AppConfig.oidc.scopes
      }
    });
  }
}
