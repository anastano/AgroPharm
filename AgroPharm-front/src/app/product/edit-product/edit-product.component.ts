import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  @Input() product!: Product;
  categories: Category[] = [];

  constructor(public activeModal: NgbActiveModal, private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    this.productService.updateProduct(this.product.id!, this.product).subscribe(response => {
      this.toastr.success('Proizvod je uspešno ažuriran', 'Uspeh');
      this.activeModal.close('Updated');
    }, error => {
      this.toastr.error('Greška prilikom ažuriranja proizvoda', 'Greška');
    });
  }
}
