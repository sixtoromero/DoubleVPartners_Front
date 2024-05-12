import { Component } from '@angular/core';
import { MapService, PlacesService } from 'src/app/services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  constructor(private mapService: MapService, private placeService: PlacesService){}

  goToMyLocation() {
    if (!this.placeService.isUserLocationReady) throw Error('No existe ubicación de usuario');
    if (!this.mapService.isMapReady) throw Error('No hay mapa disponible');

    this.mapService.flyTo(this.placeService.useLocation!);
  }

}
