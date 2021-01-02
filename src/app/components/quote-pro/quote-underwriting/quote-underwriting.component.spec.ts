import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteUnderwritingComponent } from './quote-underwriting.component';

describe('QuoteUnderwritingComponent', () => {
  let component: QuoteUnderwritingComponent;
  let fixture: ComponentFixture<QuoteUnderwritingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteUnderwritingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteUnderwritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
