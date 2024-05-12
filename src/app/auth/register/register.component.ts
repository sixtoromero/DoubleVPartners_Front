import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm:FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  },{
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private userService: AuthService
  ){}

  createUser(){
    this.formSubmitted = true;

    if (this.registerForm.invalid){
      return;
    }

    this.ngxService.start();

    this.userService.createUser(this.registerForm.value)
      .subscribe({
        next: resp => {
          //tu codigo aqui
          this.formSubmitted = false;
          this.ngxService.stop();
          this.registerForm.reset();
          Swal.fire('success', 'Usuario creado exitosamente', 'success');
          console.log(resp)
        },
        error: err => {
          this.ngxService.stop();
          Swal.fire('Error', err.error.msg, 'error');
        }
      });
  }

  campoNoValidado(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else {
      return false;
    }
  }

  claveNoValidas(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ((pass1 !== pass2) && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  }

  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsIgual: true});
      }
    }
  }
}
