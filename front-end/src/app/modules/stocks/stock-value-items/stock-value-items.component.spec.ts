import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockValueItemsComponent } from './stock-value-items.component';

describe('StockValueItemsComponent', () => {
  let component: StockValueItemsComponent;
  let fixture: ComponentFixture<StockValueItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockValueItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockValueItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
