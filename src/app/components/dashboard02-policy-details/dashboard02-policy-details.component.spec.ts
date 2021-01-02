import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard02PolicyDetailsComponent } from './dashboard02-policy-details.component';

describe('Dashboard02PolicyDetailsComponent', () => {
  let component: Dashboard02PolicyDetailsComponent;
  let fixture: ComponentFixture<Dashboard02PolicyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard02PolicyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard02PolicyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
