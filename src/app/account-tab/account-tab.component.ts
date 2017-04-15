import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';

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
    const config = new MdDialogConfig;
    config.width = '500px';
    const dialogRef = this.dialog.open(AddNewAccountComponent, config);
    dialogRef.afterClosed().subscribe(values => {
      if (typeof values !== 'undefined') {
        this.accountService.addAccount(values.name, values.maintaining, values.initial,
          values.other, values.description).subscribe(() => {}, () => {});
      }
    });
  }
}
