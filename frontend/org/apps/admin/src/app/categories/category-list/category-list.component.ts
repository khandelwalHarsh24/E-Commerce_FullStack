/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@org/products';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
@Component({
    selector: 'admin-category-list',
    templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
    categories: Category[] = [];

    constructor(private categoryService: CategoriesService, 
        private messageService: MessageService, 
        private confirmationService: ConfirmationService,
        private router:Router) {}

    ngOnInit(): void {
        this._getCategory();
    }

    deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete the Category',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.categoryService.deleteCategory(categoryId).subscribe(
                (response) => {
                    this._getCategory();
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is Deleted' });
                },
                (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not Deleted' });
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


    updateCategory(categoryId:string){
        this.router.navigateByUrl(`categories/form/${categoryId}`);
    }

    private _getCategory() {
        this.categoryService.getCategory().subscribe((cats) => {
            this.categories = cats;
        });
    }
}
