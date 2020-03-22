import {Component, OnInit} from '@angular/core';
import {ShoppingItem} from '../../../models/shopping-item';
import {Product} from '../../../models/product';
import {BehaviorSubject, zip} from 'rxjs';
import {FormControl} from '@angular/forms';
import {ShoppingListService} from '../../../shared/services/shopping-list.service';
import {ShoppingItemService} from '../../../shared/services/shopping-item.service';
import {ProductService} from '../../../shared/services/product.service';
import {HttpParams} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {CommentDialogComponent} from '../../../shared/comment-dialog/comment-dialog.component';
import {ShoppingListDialogComponent} from '../shopping-list-dialog/shopping-list-dialog.component';
import {switchMap} from 'rxjs/operators';
import {ShoppingList} from '../../../models/shopping-list';
import {UserService} from '../../../shared/services/user.service';

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
  public minAmount = 5;
  public isRequiringValidation = false;

  constructor(private shoppingListService: ShoppingListService,
              private shoppingItemService: ShoppingItemService,
              private productService: ProductService,
              private dialog: MatDialog,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.addListItem();
  }

  public addListItem() {
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
    this.productForms.splice(index, 1);
    this.isRequiringValidation = false;
    if (this.items.length < 5) {
      this.addListItem();
    }
  }

  public onCommentClick(item: ShoppingItem) {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '400px',
      data: item.comment
    });
    dialogRef.afterClosed().subscribe(comment => {
      item.comment = comment;
    });
  }

  public displayedValue(product: Product) {
    return product ? product.name : null;
  }

  public onSelectOption(product: Product, index: number) {
    this.items[index].product = product;
    this.isRequiringValidation = false;
    if (this.items.length < this.minAmount) {
      this.addListItem();
    }
  }

  public onSaveClick() {
    this.isRequiringValidation = true;
    if (!this.allItemsAreValid()) {
      return;
    }
    const dialogRef = this.dialog.open(ShoppingListDialogComponent, {width: '500px'});
    dialogRef.afterClosed().pipe(
      switchMap((shoppingList: ShoppingList) => {
        shoppingList.consumer_id = this.userService.currentUserValue.id;
        shoppingList.shopType = '';
        return this.shoppingListService.createShoppingList(shoppingList);
      }),
      switchMap(shoppingList => {
        const createItemsObs = this.items.map(item => {
          item.product_id = item.product.id;
          item.shoppingList_id = shoppingList.id;
          return this.shoppingItemService.createShoppingItem(item);
        });
        return zip(...createItemsObs);
      })).subscribe();
  }

  public allItemsAreValid() {
    return this.items.length >= this.minAmount && this.items.reduce((acc, curr) => acc && !!curr.product, true) ;
  }
}


