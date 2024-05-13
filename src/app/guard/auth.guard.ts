import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, catchError, map, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private userServices: AuthenticationService, private router: Router){}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('ENTRANDO A AuthGuard canLoad');
    return this.userServices.validarToken().pipe(
      map(response => {
        // Suponiendo que la API devuelve un objeto ResponseModel con un campo 'success'
        console.log('Resultado', response);
        if (response.IsSuccess) {
          return true;
        } else {
          return this.router.createUrlTree(['/login']);
        }
      }),
      catchError((err) => {
        // En caso de error, redirige al usuario a la página de login
        console.error('Error al validar token:', err);
        return this.router.navigateByUrl('/login');
      })
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    console.log('ENTRANDO A AuthGuard canActivate');
    return this.userServices.validarToken().pipe(
      map(response => {
        if (response.IsSuccess) {
          return true; // Si el token es válido, retorna true permitiendo el acceso a la ruta.
        } else {
          return this.router.createUrlTree(['/login']); // Si no, redirige a login.
        }
      })
    );
  }

  // canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //   return this.userServices.validarToken() 
  //       .pipe(
  //         tap(estaAutenticado => {
  //           if (!estaAutenticado){
  //             this.router.navigateByUrl('/login');
  //           }
  //         })
  //       );
  // }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot) {
  //     return this.userServices.validarToken()
  //       .pipe(
  //         tap(estaAutenticado => {
  //           if (!estaAutenticado){
  //             this.router.navigateByUrl('/login');
  //           }
  //         })
  //       );
  // }
}
