import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
})
export class RxjsComponent implements OnInit, OnDestroy {
  intervalSubscription: Subscription; 
  
  constructor() {
    // // función 1.
    /* 
    this.returnObs()
      .pipe(retry(2))
      .subscribe(
        (data) => console.log('Subs', data), // subscripción
        (err) => console.error(err), // error
        () => console.info('Obs terminando') // bandera que indica que finalizó el obs
      );

    // // función 2.
    this.returnInterval2().subscribe(console.log);
    */

    // función 3.
    this.intervalSubscription = this.returnInterval3Inf().subscribe(console.log);
  }

  // cancelar subscripción
  ngOnDestroy(): void {
    this.intervalSubscription && this.intervalSubscription.unsubscribe();
  }

  ngOnInit(): void {}

  // 2. metodo que retorna obs
  returnInterval2(): Observable<string> {
    return interval(1000).pipe(
      take(10), // iteraciones del obs
      map((data) => data + 1),
      filter((data) => data % 2 === 0), // filtrar la data (si no se cumple la condición no pasa al sig map)
      map((data) => 'number: ' + data) // transformar el valor que retorna
    );
  }

  // 3. metodo infinito
  returnInterval3Inf(): Observable<number> {
    return interval(1000).pipe(
      map((data) => data * 2), // modificar resp
      filter((data) => data % 3 === 0) // multiplos de tres
    );
  }

  // 1. metodo que retorna un obsv
  returnObs = () => {
    let i = 0;
    // definición del observable
    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        observer.next(i++); // valor a emitir
        if (i == 4) {
          // cancelar el observable
          clearInterval(intervalo);
          observer.complete(); // finalizar el obsv
        }
        if (i == 2) {
          // lanzar un error y cancela el obs
          i = 0;
          observer.error('i llegó al valor de 2');
        }
      }, 1000);
    });
  };
}
