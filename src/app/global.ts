import { Injectable } from '@angular/core';
import * as beautify from 'js-beautify';
import { _ } from 'underscore';
import sqlFormatter from 'sql-formatter';
import data from '../assets/data/data.json';

@Injectable({
  providedIn: 'root'
})
export class Global {
    beautify: any;
    underscore: any;
    sqlFormatter: any;
    data: any;

  constructor() {
      this.beautify = beautify;
      this.underscore = _;
      this.sqlFormatter = sqlFormatter.format;
      this.data = data;
  }
}
