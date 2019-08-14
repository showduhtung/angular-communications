import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';


@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    // showImage: boolean = true;
    includeDetail: boolean = true
    parentListFilter: string;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;


    filteredProducts: IProduct[];
    products: IProduct[];

    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent

    get showImage(): boolean {
        return this.productParameterService.showImage

    }
    set showImage(value: boolean){
        this.productParameterService.showImage = value
    }

    constructor(private productService: ProductService,
                private productParameterService:ProductParameterService
        ) {
    }

    // ngAfterViewInit(): void{
    //     this.parentListFilter = this.filterComponent.listFilter;
    // }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.filterComponent.listFilter = this.productParameterService.filterBy
                // this.performFilter(this.parentListFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    onValueChange(value : string) : void{ //listens to criteria's @Output 
        this.productParameterService.filterBy = value
        this.performFilter(value)
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}

    // private _sub: Subscription
    // private _filterInput: NgModel;

    // get filterInput():NgModel {
    //     return this._filterInput
    // }

    // @ViewChild(NgModel)

    // set filterInput(value: NgModel) {
    //     this._filterInput = value
    //     console.log(this.filterInput)
    //     if (this.filterInput && !this._sub){
    //         console.log('subscribing')
    //         this._sub = this.filterInput.valueChanges.subscribe(
    //             () => {
    //                 this.performFilter(this.listFilter)
    //                 console.log('subscribing')
    //             }
    //         )
    //     }
    //     if (this.filterElementRef) {
    //         this.filterElementRef.nativeElement.focus()
    //     }
    // }
    
    // super long way
    // onFilterChange(filter: string): void {
    //     this.listFilter = filter
    //     this.performFilter(this.listFilter)
    // }
    
    // private _listfilter: string;
    // get listFilter(): string {
    //     return this._listfilter;
    // }

    // set setFilter(value: string){
    //     this._listfilter = value;
    //     this.performFilter(this.listFilter)
    // }