import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ShoppingList} from '../../../models/shopping-list';

@Component({
  selector: 'app-shopping-list-dialog',
  templateUrl: './shopping-list-dialog.component.html',
  styleUrls: ['./shopping-list-dialog.component.scss']
})
export class ShoppingListDialogComponent implements OnInit {

  public shoppingList: ShoppingList;

  constructor(public dialogRef: MatDialogRef<ShoppingListDialogComponent>) {}

  ngOnInit(): void {
    this.shoppingList = {
      shoppingBagsAmount: 3,
      preferCheapProducts: true,
    };
  }

}
