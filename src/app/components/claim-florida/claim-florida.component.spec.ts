import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimFloridaComponent } from './claim-florida.component';

describe('ClaimFloridaComponent', () => {
  let component: ClaimFloridaComponent;
  let fixture: ComponentFixture<ClaimFloridaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimFloridaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimFloridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
