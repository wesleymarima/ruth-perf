import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StockValue} from "../../models/stock-value";

@Injectable({
  providedIn: 'root'
})
export class StocksValueRestService {
  baseUrl = environment.apiUrl + 'stockvalues/'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<StockValue[]> {
    return this.http.get<StockValue[]>(this.baseUrl + 'get_all');
  }

  getByStockId(id: number): Observable<StockValue[]> {
    return this.http.get<StockValue[]>(this.baseUrl + 'get/' + id);
  }
}
