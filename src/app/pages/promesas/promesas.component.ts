import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const promesa = new Promise((resolve, reject) => {
      // resolve('Hola mundo');
      reject('nuevo error');
    });

    promesa
      .then((data) => {
        console.log(data);
        console.log('data recibida');
      })
      .catch((err) => console.log(err));

    this.getUsuarios().then((data) => console.log(data));
  }

  getUsuarios() {
    // forma 1.
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then((data) => resolve(data.data))
        .catch((err) => reject(err));
    });
  }
}
