import {Component, OnInit} from '@angular/core';
import {ShoppingItem} from '../../../models/shopping-item';
import {Product} from '../../../models/product';
import {BehaviorSubject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {ShoppingListService} from '../../../shared/services/shopping-list.service';
import {ShoppingItemService} from '../../../shared/services/shopping-item.service';
import {ProductService} from '../../../shared/services/product.service';
import {HttpParams} from '@angular/common/http';

interface ExtendedShoppingItem extends ShoppingItem {
  product?: Product;
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  public items: ExtendedShoppingItem[] = [];
  public productOptions: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public productForms: FormControl[] = [];

  constructor(private shoppingListService: ShoppingListService,
              private shoppingItemService: ShoppingItemService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.addListItem();
  }

  private addListItem() {
    this.items.push({quantity: 1});
    this.productForms.push(new FormControl(''));
    const index = this.productForms.length - 1;
    this.productForms[index].valueChanges.subscribe(text => {
      if (text.length >= 4) {
        const param = new HttpParams().set('name', text);
        this.productService.getAllProducts(param).subscribe(products => {
          this.productOptions.next(products);
        });
      } else {
        this.productOptions.next([]);
      }
    });
  }

  public onDeleteClick(index: number) {
    this.items.splice(index, 1);
  }

  public displayedValue(product: Product) {
    return product ? product.name : null;
  }

  public onSelectOption(product: Product, index: number) {
    this.items[index].product = product;
    this.addListItem();
  }

  public onSaveClick() {
    this.items.forEach(item => {
      item.productId = item.product.id;
      this.shoppingItemService.createShoppingItem(item).subscribe();
    });
  }
}


