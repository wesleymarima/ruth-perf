import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Stocks} from "../../models/stocks";

@Injectable({
  providedIn: 'root'
})
export class StocksRestService {
  baseUrl = environment.apiUrl + 'stocks/'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Stocks[]> {
    return this.http.get<Stocks[]>(this.baseUrl + 'all');
  }

  search(query: string): Observable<Stocks[]> {
    return this.http.get<Stocks[]>(this.baseUrl + 'search/' + query);
  }
}
