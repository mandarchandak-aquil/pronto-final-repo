import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPayLoginComponent } from './quick-pay-login.component';

describe('QuickPayLoginComponent', () => {
  let component: QuickPayLoginComponent;
  let fixture: ComponentFixture<QuickPayLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPayLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPayLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
