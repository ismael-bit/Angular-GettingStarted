import { Component, OnInit } from "@angular/core";
import { Iproduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class  ProductListComponent implements OnInit {
pageTitle: string='Product List!';
imageWidth: number = 50;
imageMargin: number = 2;
showImage: boolean = false;

private _listFilter: string= '';
get listFilter(): string{
  return  this._listFilter;
}
set listFilter(value: string){
this._listFilter = value;
this.filteredProducts = this.performfilter(value);
console.log('In Setter');
}

filteredProducts: Iproduct[]=[];
products: Iproduct[] = [];

constructor(private productService: ProductService){}

performfilter(filterBy: string): Iproduct[]{
  filterBy: filterBy.toLocaleLowerCase();
  return this.products.filter((product: Iproduct)=>
  product.productName.toLocaleLowerCase().includes(filterBy));
}

toggleImage():void{
this.showImage= !this.showImage;    
}

ngOnInit(): void {
this.products = this.productService.getProducts();
this.filteredProducts = this.products;
}

onRatingClicked(message: string): void{
  this.pageTitle = 'Product List: ' + message;
}

}