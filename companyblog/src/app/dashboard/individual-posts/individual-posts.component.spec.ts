import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPostsComponent } from './individual-posts.component';

describe('IndividualPostsComponent', () => {
  let component: IndividualPostsComponent;
  let fixture: ComponentFixture<IndividualPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
