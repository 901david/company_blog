import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainScreenViewComponent } from './main-screen-view.component';

describe('MainScreenViewComponent', () => {
  let component: MainScreenViewComponent;
  let fixture: ComponentFixture<MainScreenViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainScreenViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainScreenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
