import { Injectable } from '@angular/core';
import { start } from 'repl';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }
  getCreditCardMonths(startMonth: number) : Observable<number[]>{
    let data: number[] = [];
    for(let month = startMonth; month <=12; month++){
      data.push(month)
    }

    return of(data)
  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];
    const startYear : number = new Date().getFullYear();
    const endYear : number = startYear + 10;
    for(let i = startYear; i <= endYear; i++){
      data.push(i)
    }
    return of(data)
  }
}
