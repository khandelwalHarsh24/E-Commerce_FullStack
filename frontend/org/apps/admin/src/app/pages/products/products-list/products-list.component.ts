import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '@org/products';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products : Product[]=[];

  constructor(private productService: ProductService,private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService){

  }

  ngOnInit(): void {
      this._getproduct();
  }

  private _getproduct(){
    this.productService.getProduct().subscribe(product=>{
      this.products=product;
    })
  }

  updateProduct(productId:string){
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
        message: 'Do you want to delete the Product',
        header: 'Delete Product',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.productService.deleteProduct(productId).subscribe(
            (response) => {
                this._getproduct();
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
