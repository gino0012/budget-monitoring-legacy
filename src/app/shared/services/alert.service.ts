import { Injectable } from '@angular/core';
import { AlertInterface } from '../interfaces/alert-interface';
import { MdSnackBar, MdSnackBarConfig, MdSnackBarRef } from '@angular/material';

@Injectable()
export class AlertService implements AlertInterface {
  private snackBarRefs: Array<MdSnackBarRef<any>>;

  constructor(private snackBar: MdSnackBar) {
    this.snackBarRefs = [];
  }

  show(message: string) {
    const config = new MdSnackBarConfig;
    config.duration = 5000;

    this.snackBar.open(message, null, config);
  }

  display(message: string) {
    this.snackBarRefs.push(this.snackBar.open(message));
  }

  hide() {
    for (const snackBarRef of this.snackBarRefs) {
      snackBarRef.dismiss();
    }
  }
}
