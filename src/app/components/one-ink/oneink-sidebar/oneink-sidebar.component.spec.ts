import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneinkSidebarComponent } from './oneink-sidebar.component';

describe('OneinkSidebarComponent', () => {
  let component: OneinkSidebarComponent;
  let fixture: ComponentFixture<OneinkSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneinkSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneinkSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
