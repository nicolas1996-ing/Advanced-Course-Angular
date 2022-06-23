import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  titleBreadcrumbs: string = '';
  subscriptionRouter$: Subscription | undefined;

  constructor(private router: Router) {
    this.subscriptionRouter$ = this.getArgRouter().subscribe(({ title }) => {
      this.titleBreadcrumbs = title;
      document.title = `AdminPro - ${title}`; // titulo de la pestaña
    });
  }
  ngOnDestroy(): void {
    this.subscriptionRouter$ && this.subscriptionRouter$.unsubscribe();
    console.log('onDestroy');
  }

  // función que retorna una promesa 
  getArgRouter() {
    return this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => {
        // console.log(event.snapshot.data); // {title: 'string'} - parametro configurado en el routing (title)
        return event.snapshot.data;
      }) // respuesta final que se retornará (argumento de rutas)
    );
  }

  ngOnInit(): void {}
}
