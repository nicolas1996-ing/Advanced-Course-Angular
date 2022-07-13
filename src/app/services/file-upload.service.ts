import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  public baseUrl = environment.baseUrl;

  constructor(private userServices: UsersService) {}

  // fetch
  async updateImg(
    file: File,
    type: 'users' | 'doctors' | 'hospitals',
    id: string
  ) {
    try {
      const url = `${this.baseUrl}/uploads/${type}/${id}`;
      const formData = new FormData(); // data
      formData.append('image', file);

      // requests
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token-angular-avanz') || '',
        },
        body: formData,
      });
      const data = await resp.json();
      // console.log(data);
      if (data.success) {
        return data.nameFileUpload;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
