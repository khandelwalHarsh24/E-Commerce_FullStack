import { Injectable } from '@angular/core';

const TOKEN='jwtToken'
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { console.log()}

  setToken(data:string){
    localStorage.setItem(TOKEN,data)
  }

  getToken(){
    return localStorage.getItem(TOKEN);
  }

  removeToken(){
    localStorage.removeItem(TOKEN);
  }

}
