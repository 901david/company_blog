import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMarkdownComponent } from './modal-markdown.component';

xdescribe('ModalMarkdownComponent', () => {
  let component: ModalMarkdownComponent;
  let fixture: ComponentFixture<ModalMarkdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMarkdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
