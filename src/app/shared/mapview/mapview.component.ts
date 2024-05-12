import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { Map, Popup, Marker } from 'mapbox-gl';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MapService, PlacesService } from 'src/app/services';

import Swal from 'sweetalert2'
import { ModalGeoProjectComponent } from '../modal-geo-project/modal-geo-project.component';

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef

  constructor(
    private placesService: PlacesService,
    private mapService: MapService,
    public dialog: MatDialog){}

  ngAfterViewInit(): void {
    this.configMap();
  }

  configMap = () => {

    if (!this.placesService.useLocation) throw Error('No hay placesServices.userLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/light-v10', // style URL
      center: this.placesService.useLocation,
      zoom: 14,
    });

    map.on('load', () => {
      map.on('click', (event) => {
        const coordinates = event.lngLat; // Objeto con latitud y longitud
        const target = event.originalEvent.target as HTMLElement; // Usar type assertion aquí

        if (target && target["ariaLabel"] == null) {
            return;
        }
        this.openDialog(coordinates);
      });
    });

    const popup = new Popup()
    .setHTML(`
      <h6>Mi ubicación</h6>
      <span>Marcador ${this.placesService.useLocation} </span>
    `);

    new Marker({ color: 'red' })
      .setLngLat( this.placesService.useLocation )
      .setPopup( popup )
      .addTo( map )

    this.mapService.setMap( map );

  }

  openDialog(coordinates: any) {
    const dialogRef = this.dialog.open(ModalGeoProjectComponent, {
      width: '250px',
      data: { lat: coordinates.lat, lng: coordinates.lng } // Pasar datos al modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
      this.placesService.getPlacesByQuery();
      // Opcional: manejo de datos al cerrar el modal
    });
  }

}
