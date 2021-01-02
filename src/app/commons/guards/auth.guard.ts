import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthServicess } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthServicess, public router: Router){

  }
  canActivate(): boolean {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['login']);
      return false;
    } 
    return true;
  }
}