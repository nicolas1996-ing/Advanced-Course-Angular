import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public profileForm!: FormGroup;
  public user!: User;
  public imageUpload!: File;
  public previewImgProfile: any | undefined;
  private _userSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private fileUploadService: FileUploadService
  ) {
    this.getProfile();
    this.getImgProfile();
    // this.user = this.userService.user; // asignación por referencia al puntero donde está la información
    // this.user hace referencia a la variable user del servicio ( que es usada por varios componentes sidebar/header)
    // cuando ocurre un cambio en this.user (updateProfile) inmediatamente cambia el valor del user asociado al servicio
    // como hay varios componentes que consumen esa variable ( sidebar / header) también cambiará el valor de las variables
    // asociadas al user del servicio.
    // "en todo los lugares donde yo use el user del servicio está manejando la misma instancia"
    // los servicios son tipo 'singlenton'
  }

  ngOnDestroy(): void {
    this._userSubscription && this._userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  getImgProfile() {
    return this.userService.getImgProfile();
  }
  getProfile() {
    this._userSubscription = this.userService.userBehavior.subscribe((resp) => {
      this.user = resp;
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value).subscribe(
      (resp) => {
        this.userService.userBehavior.next(resp.userUpdate);
        Swal.fire('Updated', 'Changes were saved', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.message, 'error');
      }
    );
  }

  updateDisabledClass() {
    return this.profileForm.invalid
      ? 'btn-light'
      : 'btn-success waves-effect waves-light m-r-10';
  }

  changeImg(event: any) {
    this.imageUpload = event.target?.files[0];

    // Importante
    // preview img profile from input file type
    if (this.imageUpload) {
      const reader = new FileReader();
      const url64 = reader.readAsDataURL(this.imageUpload);
      reader.onloadend = () => {
        // console.log(reader.result);
        this.previewImgProfile = reader.result;
      };
    } else {
      this.previewImgProfile = null;
    }
  }

  imgUpload() {
    this.fileUploadService
      .updateImg(this.imageUpload, 'users', this.user.uid || '')
      .then((resp) => {
        this.userService.userBehavior.next({
          ...this.user,
          img: resp,
        });
        Swal.fire('Updated', 'Image uploaded', 'success');
      })
      .catch((err) => {
        console.log(err)
        Swal.fire('Error', 'Image was not uploaded', 'error');
      });
  }
}
