import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeyontecSidebarComponent } from './beyontec-sidebar.component';

describe('BeyontecSidebarComponent', () => {
  let component: BeyontecSidebarComponent;
  let fixture: ComponentFixture<BeyontecSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeyontecSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeyontecSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
