import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterQuoteComponent } from './footer-quote.component';

describe('FooterQuoteComponent', () => {
  let component: FooterQuoteComponent;
  let fixture: ComponentFixture<FooterQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
