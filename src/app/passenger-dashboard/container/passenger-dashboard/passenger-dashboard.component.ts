import { Component, OnInit } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboard.service';

@Component({
  selector: 'app-passenger-dashboard',
  templateUrl: './passenger-dashboard.component.html',
  styleUrls: ['./passenger-dashboard.component.scss']
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];
  constructor(private passengerDashboardService: PassengerDashboardService) { 

  }

  ngOnInit() {
    this.passengerDashboardService.getPassenger().subscribe((data: Passenger[]) => this.passengers = data);
  }
  handleRemove(event: Passenger) {
    this.passengerDashboardService.removePassenger(event).subscribe((data: Passenger) =>{
      this.passengers = this.passengers.filter((passenger: Passenger) => passenger.id !== event.id)
    })
    
  }
  handleEdit(event: Passenger) {
    this.passengerDashboardService.updatePassenger(event).subscribe((data: Passenger) =>{
      this.passengers = this.passengers.map((passenger: Passenger) => {
        if (passenger.id === data.id) {
          passenger = Object.assign({},passenger,data)
        }
        return passenger;
      })
    })
  }
}
