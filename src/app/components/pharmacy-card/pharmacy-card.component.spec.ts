import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyCardComponent } from './pharmacy-card.component';

describe('PharmacyCardComponent', () => {
  let component: PharmacyCardComponent;
  let fixture: ComponentFixture<PharmacyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
