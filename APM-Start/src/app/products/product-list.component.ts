import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.services';

@Component ({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string  {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    filteredProducts: IProduct[];
    products: IProduct[] = [];

    // Here the service is injected
    // functionParamtere:ServiceName
    constructor(private productService: ProductService) {
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List ' + message;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    // lifecicle hooks
    ngOnInit(): void {
        // subscribtion to observable
        // subscribtion has 3 responses - next, error, complete
        // ....getProducts() - calls the service
        // .subscribe triggers the http get request
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products,
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }
}
