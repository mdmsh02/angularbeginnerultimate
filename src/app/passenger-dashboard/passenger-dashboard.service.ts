import { Injectable } from '@angular/core';
import { Passenger } from './models/passenger.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, tap, catchError} from 'rxjs/operators'
import { of } from 'rxjs/observable/of';

const PASSENGER_API = `api/passengers`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class PassengerDashboardService {

  constructor(private http: HttpClient) { 
    console.log(this.http);
  }
  

  getPassenger(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(PASSENGER_API);
  }
  updatePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.put<Passenger>(`${PASSENGER_API}`,passenger,httpOptions).pipe(
      tap(_ => console.log(`updated passenger id=${passenger.id}`)),
      catchError(this.handleError<any>('Update Passenger'))
    )
  }
  /** DELETE: delete the Passenger from the server */
  removePassenger (passenger: Passenger | number): Observable<Passenger> {
    const id = typeof passenger === 'number' ? passenger : passenger.id;
    const url = `${PASSENGER_API}/${id}`;
 
    return this.http.delete<Passenger>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Passenger id=${id}`)),
      catchError(this.handleError<Passenger>('deletePassenger'))
    );
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
