import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeyontecBreadcrumComponent } from './beyontec-breadcrum.component';

describe('BeyontecBreadcrumComponent', () => {
  let component: BeyontecBreadcrumComponent;
  let fixture: ComponentFixture<BeyontecBreadcrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeyontecBreadcrumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeyontecBreadcrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
