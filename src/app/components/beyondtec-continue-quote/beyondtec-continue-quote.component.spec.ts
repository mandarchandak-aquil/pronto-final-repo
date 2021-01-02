import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeyondtecContinueQuoteComponent } from './beyondtec-continue-quote.component';

describe('BeyondtecContinueQuoteComponent', () => {
  let component: BeyondtecContinueQuoteComponent;
  let fixture: ComponentFixture<BeyondtecContinueQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeyondtecContinueQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeyondtecContinueQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
