import { AfterViewInit, Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PlacesService } from 'src/app/services';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styles: [
  ]
})
export class ProyectosComponent implements AfterViewInit {
  constructor(
    private placesService: PlacesService,
    private ngxService: NgxUiLoaderService){

      this.ngxService.start();

  }

  get isUserLocationReady(){
      return this.placesService.isUserLocationReady;
  }

  ngAfterViewInit(): void {
    this.placesService.getPlacesByQuery();
  }





}
