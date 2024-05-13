import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response.model';
import { Observable, tap } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';
import { AuthModel } from '../models/auth.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Contend-Type': 'multipart/form-data',
        'Accept': 'application/json'
    })
};
  
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    endPoint = `${environment.base_url}/Usuarios`;

    constructor(
        private _http: HttpClient,
        private router: Router) { }
        
    insert(formData: AuthModel): Observable<ResponseModel<boolean>> {    
        return this._http.post<ResponseModel<boolean>>(`${this.endPoint}/InsertAsync`, formData, httpOptions);
    }

    auth(formData: AuthModel){        
        return this._http.post<ResponseModel<UsuarioModel>>(`${this.endPoint}/Autenticar`, formData).pipe(
            tap((resp: any) => {
                localStorage.setItem('doublevpartnerstoken', resp.Data.Token)
            })
        );
    }

    validarToken(): Observable<ResponseModel<boolean>> {

        const token = localStorage.getItem('doublevpartnerstoken') || '';        
        if (token === '') {
          this.router.navigateByUrl('/login');
        }

        return this._http.post<ResponseModel<boolean>>(`${this.endPoint}/validate-token`, {token});
    }
}