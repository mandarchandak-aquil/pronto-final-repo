import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard01NotificationsComponent } from './dashboard01-notifications.component';

describe('Dashboard01NotificationsComponent', () => {
  let component: Dashboard01NotificationsComponent;
  let fixture: ComponentFixture<Dashboard01NotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard01NotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard01NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
