import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public elementTheme = document.querySelector('#theme'); // id presente en el index ppal

  constructor() {
    const url =
      localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    if (url) {
      this.elementTheme?.setAttribute('href', url);
    }
  }

  // cambiar estilo de tema
  changeTheme(theme: string, links: NodeListOf<Element> | undefined) {
    const url = `./assets/css/colors/${theme}.css`;
    this.elementTheme?.setAttribute('href', url); // asignar nueva url a index ppal 
    localStorage.setItem('theme', url); // almacenar el tema en LS
    this.checkCurrentTheme(links); // simbolo de check del recuadro 
  }

  // agg check al recuadro del tema (icono)
  checkCurrentTheme(links: NodeListOf<Element> | undefined) {
    links?.forEach((link) => {
      link.classList.remove('working'); // remover el simbolo check de todos los recuadros
      const btnTheme = link.getAttribute('data-theme'); // obtener el atributo html data-theme
      const btnUrlTheme = `./assets/css/colors/${btnTheme}.css`; // crear una url 
      const currentTheme = this.elementTheme?.getAttribute('href'); // obtener href del index ppal

      // comparar url's para mirar cual es la que está activa
      if (btnUrlTheme === currentTheme) {
        link.classList.add('working');
      }
    });
  }
}
