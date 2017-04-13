import { Injectable } from '@angular/core';
import { AlertInterface } from '../interfaces/alert-interface';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Injectable()
export class AlertService implements AlertInterface {

  constructor(private snackBar: MdSnackBar) { }

  show(message: string) {
    const config = new MdSnackBarConfig;
    config.duration = 5000;

    this.snackBar.open(message, null, config);
  }
}
