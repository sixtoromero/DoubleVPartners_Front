import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { RespUser } from '../interfaces/user.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('AIRIStoken') || '';

    if (token === '') {
      this.router.navigateByUrl('/login');
    }

    return this.http.get(`${base_url}/auth/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp:any) => {
        //localStorage.setItem('AIRIStoken', resp.token);
      }),
      map( resp => true),
      catchError(error => of(false))
    );
  }

  createUser(formData: RegisterForm){
    return this.http.post(`${base_url}/auth/create`, formData);
  }

  login(formData: RegisterForm){
    return this.http.post<RespUser>(`${base_url}/auth/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('AIRIStoken', resp.token)
      })
    );
  }

}
