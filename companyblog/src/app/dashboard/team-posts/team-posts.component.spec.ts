import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPostsComponent } from './team-posts.component';

describe('TeamPostsComponent', () => {
  let component: TeamPostsComponent;
  let fixture: ComponentFixture<TeamPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
