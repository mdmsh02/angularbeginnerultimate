import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService }  from './passenger-in-memory-data.service';
import { PassengerDashboardComponent } from './container/passenger-dashboard/passenger-dashboard.component';
import { PassengerCountComponent } from './components/passenger-count/passenger-count.component';
import { PassengerDetailComponent } from './components/passenger-detail/passenger-detail.component';
import { PassengerDashboardService } from './passenger-dashboard.service';
import { RouterModule, Route,  } from '@angular/router';
import { PassengerViewerComponent } from './components/passenger-viewer/passenger-viewer.component';

const routes: Route[] = [
  {
    path: 'passengers',
    children: [
      { path: '', component: PassengerDashboardComponent},
      { path: ':id', component: PassengerViewerComponent}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {post204: false, put204: false, dataEncapsulation: false }
    ),
    RouterModule.forChild(routes)
  ],
  declarations: [PassengerDashboardComponent, PassengerCountComponent, PassengerDetailComponent, PassengerViewerComponent],
  providers: [PassengerDashboardService]
})
export class PassengerDashboardModule { }
