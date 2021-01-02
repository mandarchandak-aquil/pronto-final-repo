import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard06AccountSettingComponent } from './dashboard06-account-setting.component';

describe('Dashboard06AccountSettingComponent', () => {
  let component: Dashboard06AccountSettingComponent;
  let fixture: ComponentFixture<Dashboard06AccountSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard06AccountSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard06AccountSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
