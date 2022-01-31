import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookstypeComponent } from './bookstype.component';

describe('BookstypeComponent', () => {
  let component: BookstypeComponent;
  let fixture: ComponentFixture<BookstypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookstypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookstypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
