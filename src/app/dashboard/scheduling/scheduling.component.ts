import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit {
  public readonly currentDate = moment();

  public blocks: any[] = [];

  constructor() {}

  ngOnInit() {}

  handleAddedBlock(payload: any): void {
    this.blocks.push(payload);
  }
}
