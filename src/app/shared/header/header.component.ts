import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router){}


  ngOnInit(): void {

  }


  navigateToPersonas() {
    this.router.navigate(['/dashboard/personas']);
  }

  navigateToStatistics(){
    this.router.navigate(['/dashboard/estadisticas']);
  }

  navigateDashBoard(){
    this.router.navigate(['/']);
  }

  closeSesion(){

    Swal.fire({
      title: "¿Está seguro de cerrar la sesión?",
      text: "Puedes volver a entrar en cualquier momento!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('doublevpartnerstoken');
        this.router.navigate(['/login']);
      }
  });


  }

}
