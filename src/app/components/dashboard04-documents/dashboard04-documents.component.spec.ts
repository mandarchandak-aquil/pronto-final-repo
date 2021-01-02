import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard04DocumentsComponent } from './dashboard04-documents.component';

describe('Dashboard04DocumentsComponent', () => {
  let component: Dashboard04DocumentsComponent;
  let fixture: ComponentFixture<Dashboard04DocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard04DocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard04DocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
