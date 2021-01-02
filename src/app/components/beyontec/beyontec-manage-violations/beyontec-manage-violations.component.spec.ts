import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeyontecManageViolationsComponent } from './beyontec-manage-violations.component';

describe('BeyontecManageViolationsComponent', () => {
  let component: BeyontecManageViolationsComponent;
  let fixture: ComponentFixture<BeyontecManageViolationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeyontecManageViolationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeyontecManageViolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
