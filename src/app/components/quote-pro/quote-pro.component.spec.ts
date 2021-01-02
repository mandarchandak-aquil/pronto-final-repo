import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteProComponent } from './quote-pro.component';

describe('QuoteProComponent', () => {
  let component: QuoteProComponent;
  let fixture: ComponentFixture<QuoteProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
