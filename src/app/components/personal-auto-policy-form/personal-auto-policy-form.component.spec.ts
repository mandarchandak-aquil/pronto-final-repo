import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAutoPolicyFormComponent } from './personal-auto-policy-form.component';

describe('PersonalAutoPolicyFormComponent', () => {
  let component: PersonalAutoPolicyFormComponent;
  let fixture: ComponentFixture<PersonalAutoPolicyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalAutoPolicyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAutoPolicyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
