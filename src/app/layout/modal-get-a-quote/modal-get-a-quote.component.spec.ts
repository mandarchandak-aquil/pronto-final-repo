import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGetAQuoteComponent } from './modal-get-a-quote.component';

describe('ModalGetAQuoteComponent', () => {
  let component: ModalGetAQuoteComponent;
  let fixture: ComponentFixture<ModalGetAQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGetAQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGetAQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
