import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard03ClaimCenterComponent } from './dashboard03-claim-center.component';

describe('Dashboard03ClaimCenterComponent', () => {
  let component: Dashboard03ClaimCenterComponent;
  let fixture: ComponentFixture<Dashboard03ClaimCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard03ClaimCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard03ClaimCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
