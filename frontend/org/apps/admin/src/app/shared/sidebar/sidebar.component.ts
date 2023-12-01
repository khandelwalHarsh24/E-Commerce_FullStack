import { Component } from '@angular/core';
import { AuthService } from '@org/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private authService: AuthService){}

  onLogout(){
    this.authService.logout();
  }

}
