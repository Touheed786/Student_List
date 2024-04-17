import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Product } from '../user.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private userService:LoginService,private sanitizer: DomSanitizer) { }

  imageData:any;
  products: any[] = [];
  baseUrl = "http://localhost:8089";
  ngOnInit(): void {
  }

  product:Product = new Product;


  onFileSelected(event: any) {
    this.product.imageFileName = event.target.files[0] as File;
  }

  addProduct() {
    if (this.product.imageFileName) {
      this.userService.addProduct(this.product,this.product.imageFileName).subscribe(
        response => {
          console.log('Product added successfully:', response);
          // Add any further actions upon successful product addition
        },
        error => {
          console.error('Error adding product:', error);
          // Handle error cases
        }
      );
    } else {
      console.error('No file selected');
      // Handle case when no file is selected
    }
  }

  getAllprod()
  {
    this.userService.getAllProd().subscribe((data:any)=>{
      this.products = this.handleFilePaths(data);
      this.imageData = data;
      console.log(this.imageData)
    })
  }
  handleFilePaths(data: any[]): any[] {
    return data.map((product) => {
      if (product.imageFileName) {
        product.imageFileName = product.imageFileName.replace(/\\/g, '/');
      }
      return product;
    });
  }

  getSanitizedImageUrl(imagePath: string): SafeUrl {
    const fullUrl = `${this.baseUrl}/${imagePath}`;
    return this.sanitizer.bypassSecurityTrustUrl(fullUrl);
  }
}
