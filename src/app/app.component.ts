import { Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {

  ngOnChanges(changes: SimpleChanges): void {

  }
  title = 'doublevpartnersui';
}
