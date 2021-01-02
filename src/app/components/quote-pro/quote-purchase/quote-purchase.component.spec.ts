import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePurchaseComponent } from './quote-purchase.component';

describe('QuotePurchaseComponent', () => {
  let component: QuotePurchaseComponent;
  let fixture: ComponentFixture<QuotePurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotePurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
