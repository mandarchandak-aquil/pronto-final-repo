import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwrittingComponent } from './underwritting.component';

describe('UnderwrittingComponent', () => {
  let component: UnderwrittingComponent;
  let fixture: ComponentFixture<UnderwrittingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderwrittingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderwrittingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
