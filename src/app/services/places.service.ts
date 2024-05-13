import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { MapService } from './map.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Feature } from '../interfaces/places';
import { ProjectService } from './project.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];
  public places: Feature[] = [];
  public place!: Feature;
  private debounceTimer?: NodeJS.Timeout;

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(
    private router: Router,
    private mapService: MapService,
    private projectService: ProjectService,
    private ngxService: NgxUiLoaderService,) {
    this.getUserLocation();
   }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation)
        },
        (err)=>{
          Swal.fire('Error', 'No se puedo obtener la geolocalización', 'error');
          console.log(err);
        }
      )
    });
  }

  getPlacesByQuery(){

    this.projectService.getProjects()
    .subscribe({
      next: resp => {
        this.ngxService.stop();
        console.log(resp);

        if (resp.msg !== "success"){
          Swal.fire('Error', resp.msg, 'error');
          return;
        }

        for(const place of resp.projectsData){
          this.place = {
            id: place.id.toString(),
            type: '',
            place_type: [],
            relevance: 0,
            properties: {},
            text_es: '',
            place_name_es: '',
            text: '',
            place_name: place.descripcion,
            bbox: [],
            center: [place.longitud, place.latitud],
            geometry: {
              type: "Point",
              coordinates: [place.longitud, place.latitud]
            },
            context: []
          };
          this.places.push(this.place);
        }

        if ( this.debounceTimer ) clearTimeout( this.debounceTimer );

        this.debounceTimer = setTimeout(() => {
          this.mapService.createMarkersFromPlaces(this.places);
        }, 350 );

      },
      error: err => {
        this.ngxService.stop();
        if (err.error.msg == "Token no válido"){
          localStorage.removeItem('doublevpartnerstoken');
          this.router.navigateByUrl('/login');
        }else{
          Swal.fire('Error', err.error.msg, 'error');
        }
        //console.log(err)
      }
    });
  }
}
