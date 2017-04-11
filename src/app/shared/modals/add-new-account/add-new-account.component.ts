import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-new-account',
  templateUrl: './add-new-account.component.html',
  styleUrls: ['./add-new-account.component.css']
})
export class AddNewAccountComponent implements OnInit {
  maintaining: number;
  initial: number;
  other: number;

  constructor(public dialogRef: MdDialogRef<AddNewAccountComponent>) { }

  ngOnInit() {
  }

  addAccount() {
    this.dialogRef.close({
      maintaining: this.maintaining,
      initial: this.initial,
      other: this.other
    });
  }
}
