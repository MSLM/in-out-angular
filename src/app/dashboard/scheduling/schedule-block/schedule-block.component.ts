import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'schedule-block',
  templateUrl: './schedule-block.component.html',
  styleUrls: ['./schedule-block.component.scss']
})
export class ScheduleBlockComponent implements OnInit {
  public readonly blockForm: FormGroup;

  @Input('showButton')
  public showButton: boolean = false;

  @Output('addedBlock')
  public addedBlock: EventEmitter<any> = new EventEmitter();

  constructor(private readonly fb: FormBuilder) {
    this.blockForm = this.fb.group({
      timeIn: [null, [Validators.required]],
      timeOut: [null, [Validators.required]]
    });
  }

  ngOnInit() {}

  addBlock(): void {
    console.log('added block');
    this.addedBlock.emit(this.blockForm.value);
  }
}
