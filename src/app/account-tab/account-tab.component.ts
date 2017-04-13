import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { AddNewAccountComponent } from '../shared/modals/add-new-account/add-new-account.component';
import { AccountService } from './account.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-account-tab',
  templateUrl: './account-tab.component.html',
  styleUrls: ['./account-tab.component.css']
})
export class AccountTabComponent implements OnInit {

  constructor(private dialog: MdDialog,
              private accountService: AccountService,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddNewAccountComponent);
    dialogRef.afterClosed().subscribe(values => {
      if (typeof values !== 'undefined') {
        this.accountService.addAccount(values.maintaining, values.initial, values.other)
          .subscribe(() => {
            this.alertService.show('Successfully added');
          }, err => {
            if (err.message) {
              this.alertService.show(err.message);
            } else {
              this.alertService.show('Error occurred while adding Account');
            }
          });
      }
    });
  }
}
