import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@org/users';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';

declare const require

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {
  users:User[]=[];
  constructor(private userService: UsersService,private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService){}

  ngOnInit(): void {
      this._getUsers();
      
  }

  private _getUsers(){
    this.userService.getUsers().subscribe(user=>{
      this.users=user;
    })
  }

  

  updateUser(userId:string){
    this.router.navigateByUrl(`users/form/${userId}`);
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
        message: 'Do you want to delete the User',
        header: 'Delete User',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.userService.deleteUser(userId).subscribe(
            (response) => {
                this._getUsers();
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is Deleted' });
            },
            (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not Deleted' });
            }
          );
        },
        reject: (type) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
  }

}
