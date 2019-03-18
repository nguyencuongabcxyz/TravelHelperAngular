import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserauthComponent } from './userauth.component';

describe('UserauthComponent', () => {
  let component: UserauthComponent;
  let fixture: ComponentFixture<UserauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
