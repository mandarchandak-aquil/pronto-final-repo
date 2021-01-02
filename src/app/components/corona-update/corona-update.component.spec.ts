import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaUpdateComponent } from './corona-update.component';

describe('CoronaUpdateComponent', () => {
  let component: CoronaUpdateComponent;
  let fixture: ComponentFixture<CoronaUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronaUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
