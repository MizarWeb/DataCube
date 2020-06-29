
import {catchError, map} from 'rxjs/operators';



import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, of, throwError } from 'rxjs';

const routes = {
  quote: (c: RandomQuoteContext) => `/jokes/random?category=${c.category}`
};

export interface RandomQuoteContext {
  // The quote's category: 'nerdy', 'explicit'...
  category: string;
}

@Injectable()
export class QuoteService {

  constructor(private http: Http) { }

  getRandomQuote(context: RandomQuoteContext): Observable<string> {
    return this.http.get(routes.quote(context), { cache: true }).pipe(
      map((res: Response) => res.json()),
      map(body => body.value),
      catchError((err) => { of('Error, could not load joke :-('); 
      return throwError(err);
  }),);
  }

}
