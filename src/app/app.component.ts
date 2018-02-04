import { Component } from '@angular/core';
import { Nav } from './nav.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;

  navs: Nav[] = [
    { link: '/', name: 'Home', exactMatch: true },
    { link: '/oops', name: '404', exactMatch: false }
  ]
  constructor(){
    this.title = 'Ultimate angular'
  }
}
