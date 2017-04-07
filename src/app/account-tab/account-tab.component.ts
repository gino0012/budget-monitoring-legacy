import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { AddNewAccountComponent } from '../shared/modals/add-new-account/add-new-account.component';

@Component({
  selector: 'app-account-tab',
  templateUrl: './account-tab.component.html',
  styleUrls: ['./account-tab.component.css']
})
export class AccountTabComponent implements OnInit {

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(AddNewAccountComponent);
  }
}
