import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteProThanksComponent } from './quote-pro-thanks.component';

describe('QuoteProThanksComponent', () => {
  let component: QuoteProThanksComponent;
  let fixture: ComponentFixture<QuoteProThanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteProThanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteProThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
