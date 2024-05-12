import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import Swal from 'sweetalert2'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2l4dG9qb3NlIiwiYSI6ImNsdmdtNDA2cDBkczMyanB1ZXVkNjF5amYifQ.xe91U-fkEmHPiSfp6X3xKw';

// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
// mapboxgl.accessToken = 'pk.eyJ1Ijoic2l4dG9qb3NlIiwiYSI6ImNsdmdtNDA2cDBkczMyanB1ZXVkNjF5amYifQ.xe91U-fkEmHPiSfp6X3xKw';

// var map = new mapboxgl.Map({
//   container: 'YOUR_CONTAINER_ELEMENT_ID',
//   style: 'mapbox://styles/mapbox/streets-v11'
// });





if (!navigator.geolocation){
  Swal.fire('Error', 'Navegador no soporta la Geolocation', 'error');
  throw new Error('Navegador no soporta la Geolocation');
}



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
