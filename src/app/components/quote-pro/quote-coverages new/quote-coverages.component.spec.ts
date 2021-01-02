import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCoveragesComponent } from './quote-coverages.component';

describe('QuoteCoveragesComponent', () => {
  let component: QuoteCoveragesComponent;
  let fixture: ComponentFixture<QuoteCoveragesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteCoveragesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCoveragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
