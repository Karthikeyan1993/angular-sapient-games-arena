import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GameServiceService {
  private readonly $URL = "./assets/games.json";
  constructor(private _http: HttpClient) { }

  getData = (): Observable<any[]> => {
    return this._http.get<any[]>(`${this.$URL}`).pipe(
      map(res => res),
      catchError(err => {
        console.log("Error while retriving data");
        return throwError(err);
      })
    );
  };
}
