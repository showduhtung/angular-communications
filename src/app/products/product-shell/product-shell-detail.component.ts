import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';
    // product: IProduct = this.productService.currentProduct- this doesn't work because it'll only open up oninit, need a getter
    
    // get product(): IProduct | null {
    //     return this.productService.currentProduct
    // }

    product : IProduct | null;

    sub : Subscription

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.sub = this.productService.selectedProductChanges$.subscribe(
            selectedProduct => this.product = selectedProduct
        )
    }

    ngOnDestroy(){
        this.sub.unsubscribe()
    }

}
