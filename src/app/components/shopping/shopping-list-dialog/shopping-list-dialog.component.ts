import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ShoppingList} from '../../../models/shopping-list';

@Component({
  selector: 'app-shopping-list-dialog',
  templateUrl: './shopping-list-dialog.component.html',
  styleUrls: ['./shopping-list-dialog.component.scss']
})
export class ShoppingListDialogComponent implements OnInit {

  public shoppingList: ShoppingList;

  constructor() {}

  ngOnInit(): void {
    this.shoppingList = {
      shoppingBagsAmount: 3,
      preferCheapProducts: true,
    };
  }

}
