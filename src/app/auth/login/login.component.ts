import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  public formSubmitted = false;

  public loginForm:FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private userService: AuthService
  ){}

  login() {

    this.formSubmitted = true;

    if (this.loginForm.invalid){
      return;
    }

    this.ngxService.start();
    this.userService.login(this.loginForm.value)
      .subscribe({
        next: resp => {
          //tu codigo aqui
          this.ngxService.stop();
          this.router.navigateByUrl('/');
        },
        error: err => {
          this.ngxService.stop();
          Swal.fire('Error', err.error.msg, 'error');
          //console.log(err)
        }
      });
  }

  campoNoValidado(campo: string): boolean {
    if (this.loginForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else {
      return false;
    }
  }

}
