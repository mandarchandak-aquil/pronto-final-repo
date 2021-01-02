import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard02PolicyProofComponent } from './dashboard02-policy-proof.component';

describe('Dashboard02PolicyProofComponent', () => {
  let component: Dashboard02PolicyProofComponent;
  let fixture: ComponentFixture<Dashboard02PolicyProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard02PolicyProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard02PolicyProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
