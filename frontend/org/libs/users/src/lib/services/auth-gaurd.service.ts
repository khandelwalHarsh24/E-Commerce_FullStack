import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

  // atab= decoding strings of data that encoded based on base64 encoding
  // Interceptors checking all the request going out by frontend

  constructor(private router: Router,private localStorage: LocalStorageService) { 
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const token=this.localStorage.getToken();
      if(token){
        const tokenDecode=JSON.parse(atob(token.split('.')[1]));
        if(tokenDecode.isAdmin && this._tokenExpired(tokenDecode.exp)) return true;
      }
      this.router.navigate(['/login']);
      return false;
  }

  private _tokenExpired(expiration: number): boolean{
    return Math.floor(new Date().getTime()/1000)<=expiration;
  }
}
