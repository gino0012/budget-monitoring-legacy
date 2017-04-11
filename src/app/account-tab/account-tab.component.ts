import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { AddNewAccountComponent } from '../shared/modals/add-new-account/add-new-account.component';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account-tab',
  templateUrl: './account-tab.component.html',
  styleUrls: ['./account-tab.component.css']
})
export class AccountTabComponent implements OnInit {

  constructor(private dialog: MdDialog,
              private accountService: AccountService) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddNewAccountComponent);
    dialogRef.afterClosed().subscribe(values => {
      if (typeof values !== 'undefined') {
        this.accountService.addAccount(values.maintaining, values.initial, values.other)
          .subscribe(() => {});
      }
    });
  }
}
