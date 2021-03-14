import { Observable } from "rxjs";
import { ProductService } from "./../product.service";
import { Product } from "./../product";
import { Component, OnInit } from "@angular/core";
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { SelectItem } from 'primeng/components/common/api';

@Component( {
    selector: 'app-product-info',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.css']
} )
export class ProductInfoComponent implements OnInit {

    constructor( private productService: ProductService ) { }
    productsAutoCompleteList: String[];
    selectedProduct: Product;
    productsList : Product[];
    disableSaveButton = true;
    isNewProduct = false;
    modalMessage = ' ';
    showSuccessModal = false;
    categories = ['Foods', 'Cleaners', 'Toiletries',
        'Stationary', 'Raw Materials', 'Others', 'Consumer Goods'];
    unitDescription = ['Kg', 'Gram',
        'Mtr', 'Case', 'Pack', 'Unit'];
    stockLocation = ['Segment-1', 'Segment-2'];
    showItemLevel = true;
    cols: any[];
    
    categoryFilter: SelectItem[];
    stockSegmentFilter: SelectItem[];

    selectedColumns: any[];
    


    ngOnInit() {
        this.loadAutoCompleteList();
        this.resetForm();
        
    }
    
    loadTheFilterSection()
    {
        this.categoryFilter = [
                       { label: 'All Brands', value: null },
                       { label: 'Foods', value: 'Foods' },
                       { label: 'Cleaners', value: 'Cleaners' },
                       { label: 'Toiletries', value: 'Toiletries' },
                       { label: 'Stationary', value: 'Stationary' },
                       { label: 'Raw Materials', value: 'Raw Materials' },
                       { label: 'Others', value: 'Others' },
                       { label: 'Consumer Goods', value: 'Consumer Goods' }
                   ];
        
        this.stockSegmentFilter = [
                               { label: 'All Brands', value: null },
                               { label: 'Segment-1', value: 'Segment-1' },
                               { label: 'Segment-2', value: 'Segment-2' }
                           ];
        
        
    }
    
    resetForm()
    {
        this.selectedProduct = new Product( 1, '', 0, 0, 0, 0, 0, 0, 0, '', '', '', '', 0, false );;
        this.isNewProduct = false; 
        console.log('this.isNewProduct'+this.isNewProduct);
    }

    loadAutoCompleteList() {
        this.productService.getProductsAutoList()
            .subscribe( data => {
                console.log( 'Received data:' + data );
                this.productsAutoCompleteList = data;
            } );
    }

    productSearch =
    ( text$: Observable<string> ) =>
        text$.pipe(
            debounceTime( 200 ),
            distinctUntilChanged(),
            map( term => term.length < 2 ? []
                : this.productsAutoCompleteList.filter( v => v.toLowerCase().indexOf( term.toLowerCase() ) > -1 ).slice( 0, 10 ) )
        )
    formatter = ( result: string ) => (result+'').substring( 0, (result+'').indexOf( '-' )>-1 ? (result+'').indexOf( '-' ):(result+'').length  );


    //Get the product information by the product id
    getProductById( event ) {
        this.productService.getProductById( event.target.value )
            .subscribe( data => {
                console.log( 'Received product details:' + data.active );
                this.selectedProduct = data;
                console.log( 'Received product details after  set ' + this.selectedProduct.hsnacs );
            } );
    }

    contentChanged( event ) {
        if(event.target.type ==='checkbox')
        {
            this.selectedProduct[event.target.id] = (event.target.value==='on' ? true: false);
        }
        else
        {
            this.selectedProduct[event.target.id] = event.target.value;
        }
        this.disableSaveButton = false;
    }

    newProductCheck( event ) {
        this.resetForm();
        this.isNewProduct = event.target.checked;
        console.log( 'this.isNewProduct;' + this.isNewProduct );
    }
    saveInfo() {

        console.log( 'I was called to save some data' );
        if(this.isNewProduct)
        {
            this.productService.insertProduct( this.selectedProduct )
            .subscribe(data => {
                console.log( 'Received product details:' + data.status );
                this.showSuccessModal = true;
                this.selectedProduct.code = data.status ?  data.code : 1;
                this.isNewProduct = !data.status;
                this.modalMessage = data.status ? 'Successfully saved':'Error - Data not saved';
            } );
        }
        else
        {
            this.productService.updateProduct( this.selectedProduct )
            .subscribe(data => {
                console.log( 'Received product details:' + data.status );
                this.showSuccessModal = true;
                this.modalMessage = data.status ? 'Successfully saved':'Error - Data not saved';
            } );
        }
        
  }
    
    hideSuccessModal()
    {
        this.showSuccessModal = false;
    }
    
    showOrHideAllItemsPanel(event)
    {
        this.showItemLevel = !(event.target.checked);
        console.log('productsList.size'+this.productsList);
        if(this.productsList == undefined)
        {
            this.getAllProducts();
            this.loadTheFilterSection();
            this.initializeGrid();
        }
    }
    
    getAllProducts()
    {
        this.productService.getAllProducts()
        .subscribe( data => {
            console.log( 'Received data:' + data );
            this.productsList = data;
        } );
    }
    
    itemsRowSelect(row)
    {
        console.log("row:"+row);
    }
    
    initializeGrid()
    {
        this.cols = [
                     { field: 'code', header: 'Product Code' },
                     { field: 'name', header: 'Name' },
                     { field: 'mrp', header: 'MRP' },
                     { field: 'retailPrice', header: 'Retail Price' },
                     { field: 'wholesalerPrice', header: 'wholesale Price' }
               
              ];

                 this.selectedColumns = this.cols;
    }

}
 