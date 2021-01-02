import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimTexasComponent } from './claim-texas.component';

describe('ClaimTexasComponent', () => {
  let component: ClaimTexasComponent;
  let fixture: ComponentFixture<ClaimTexasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimTexasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimTexasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
