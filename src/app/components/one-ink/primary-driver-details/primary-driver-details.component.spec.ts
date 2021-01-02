import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryDriverDetailsComponent } from './primary-driver-details.component';

describe('PrimaryDriverDetailsComponent', () => {
  let component: PrimaryDriverDetailsComponent;
  let fixture: ComponentFixture<PrimaryDriverDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryDriverDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryDriverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
