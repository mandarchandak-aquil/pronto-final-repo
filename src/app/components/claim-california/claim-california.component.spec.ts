import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCaliforniaComponent } from './claim-california.component';

describe('ClaimCaliforniaComponent', () => {
  let component: ClaimCaliforniaComponent;
  let fixture: ComponentFixture<ClaimCaliforniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimCaliforniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimCaliforniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
