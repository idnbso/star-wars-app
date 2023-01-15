import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCharactersComponent } from './search-characters.component';

describe('SearchCharactersComponent', () => {
  let component: SearchCharactersComponent;
  let fixture: ComponentFixture<SearchCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCharactersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
