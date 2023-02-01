import {Component, OnInit} from '@angular/core';
import {StocksRestService} from "./modules/shared/services/rest/stocks.rest.service";
import {Stocks} from "./modules/shared/models/stocks";
import {Sort} from "@angular/material/sort";
import {StocksValueRestService} from "./modules/shared/services/rest/stocks-value.rest.service";
import {StockValue} from "./modules/shared/models/stock-value";
import {StockValueItem} from "./modules/shared/models/stock-value-item";
import {FileService} from "./modules/shared/services/file.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-end';

  stocks: Stocks[] = [];
  sortedStocks: Stocks[];

  stockValueItems: StockValueItem[] = [];
  sortedStockValueItems: StockValueItem[];
  stockSelected: boolean = false;
  stocksHeaders: string [] = ['stock', 'industry', 'sector', 'currency_Code'];
  stockValueItemHeaders: string[] = ['stock', 'date', 'value'];
  stockValues: StockValue[] = [];

  stockName: string;
  searchForm: FormGroup;

  constructor(private stocksRestService: StocksRestService,
              private stockValueRestService: StocksValueRestService,
              private fileService: FileService) {
    this.sortedStocks = this.stocks;
    this.stockName = '';
    this.sortedStockValueItems = this.stockValueItems;
    this.searchForm = new FormGroup({
      'query': new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.stocksRestService.getAll().subscribe(response => {
      this.stocks = response;
      this.sortedStocks = this.stocks.slice();
    });
  }

  sortStocks(sort: Sort) {
    const data = this.stocks.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedStocks = data;
      return;
    }

    // @ts-ignore
    this.sortedStocks = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'stocks':
          return this.compare(a.stocks, b.stocks, isAsc);
        case 'industry':
          return this.compare(a.industry, b.industry, isAsc);
        case 'sector':
          return this.compare(a.sector, b.sector, isAsc);
        case 'currency_Code':
          return this.compare(a.currency_Code, b.currency_Code, isAsc)
        default:
          return 0;
      }
    });
  }


  sortSelectedValues(sort: Sort) {

  }

  compare(a: string, b: string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getRow(row: Stocks) {
    this.stockSelected = true;
    this.stockValueRestService.getByStockId(row.id).subscribe(response => {
      this.stockValues = response;
      this.stockValueItems = [];
      this.stockName = row.stock;
      this.stockValues.forEach((item) => {
        let stockValueItem: StockValueItem = {
          value: item.value,
          stock: row.stock,
          date: item.date
        };
        this.stockValueItems.push(stockValueItem);
      });
    });
    this.sortedStockValueItems = [];
    this.sortedStockValueItems = this.stockValueItems;
  }

  exportFile() {
    this.fileService.exportToJson(this.sortedStockValueItems)
  }

  sortStockItemValues(sort: Sort) {
    const data = this.sortedStockValueItems.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedStockValueItems = data;
      return;
    }

    // @ts-ignore
    this.sortedStockValueItems = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'stock':
          return this.compare(a.stock, b.stocks, isAsc);
        case 'date':
          return this.compare(a.date, b.date, isAsc);
        case 'value':
          return this.compare(a.value, b.value, isAsc);
        default:
          return 0;
      }
    });
  }

  search() {
    const query: string = this.searchForm.get('query')?.value;

    if (query.length === 0) {
      this.getAll();
      return;
    }
    this.stocksRestService.search(query).subscribe(response => {
      this.sortedStocks = response;
      console.log(response)
    })
  }
}
