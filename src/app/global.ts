import { Injectable } from '@angular/core';
import * as beautify from 'js-beautify';
import { _ } from 'underscore';
import sqlFormatter from 'sql-formatter';

@Injectable({
  providedIn: 'root'
})
export class Global {
    beautify: any;
    underscore: any;
    sqlFormatter: any;

  constructor() {
      this.beautify = beautify;
      this.underscore = _;
      this.sqlFormatter = sqlFormatter.format;
  }
}
