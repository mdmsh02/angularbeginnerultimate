import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'app-passenger-detail',
  templateUrl: './passenger-detail.component.html',
  styleUrls: ['./passenger-detail.component.scss']
})
export class PassengerDetailComponent implements OnInit,OnChanges {

  
  @Input()
  detail: Passenger;
  @Output()
  remove: EventEmitter<any> = new EventEmitter();
  @Output()
  edit: EventEmitter<any> = new EventEmitter();
  editing: Boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.detail) {
      this.detail = Object.assign({},changes.detail.currentValue);
    }
  }
  ngOnInit() {
  }
  onNameChange(value) {
    this.detail.fullname = value;
  }
  onToggle() {
    if(this.editing){
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }
  onRemove() {
    this.remove.emit(this.detail);
  }

}
