import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterForm } from 'src/app/models/registerForm.model';
import { CreateUser } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;
  formSubmitted: boolean = false;
  formFields: string[] = ['name', 'email', 'password', 'passwordTwo', 'terms'];

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: [
          '',
          [Validators.required, Validators.minLength(3), Validators.email],
        ],
        password: ['', [Validators.required, Validators.minLength(3)]],
        passwordTwo: ['', [Validators.required, Validators.minLength(3)]],
        terms: [true, [Validators.required]],
      },
      {
        validators: this.passwordSame('password', 'passwordTwo'),
      }
    );
  }

  validateField(formControl: string): boolean {
    return this.registerForm.get(formControl).invalid && this.formSubmitted;
  }
  onSubmit() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    const user = this.createObjUser(this.registerForm.value);

    this.registerForm.reset();

    this.userService.createUser(user).subscribe({
      next: (v) => {
        console.log(v);
        this.router.navigateByUrl('/'); // dashboard
      },
      error: (e) => {
        console.log(e);
        Swal.fire({
          title: e.error.message,
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
      complete: () => console.info('complete'),
    });
  }

  createObjUser(dataForm: RegisterForm): CreateUser {
    return {
      name: dataForm.name,
      email: dataForm.email,
      password: dataForm.password,
    };
  }

  validatePassword(): boolean {
    return (
      this.registerForm.get('password').value ===
      this.registerForm.get('passwordTwo').value
    );
  }

  passwordSame(password: string, passwordTwo: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(password);
      const passwordTwoControl = formGroup.get(passwordTwo);
      if (passwordControl?.value === passwordTwoControl?.value) {
        passwordTwoControl?.setErrors(null);
      } else {
        passwordTwoControl?.setErrors({ passwordnotSame: true });
      }
    };
  }
}
