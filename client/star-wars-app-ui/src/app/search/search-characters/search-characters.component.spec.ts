import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { SearchService } from '../search.service';

import { SearchCharactersComponent } from './search-characters.component';

describe('SearchCharactersComponent', () => {
  let component: SearchCharactersComponent;
  let fixture: ComponentFixture<SearchCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,

        // PrimeNG
        SharedModule,
        FormsModule,
        AutoCompleteModule,
        CardModule,
        TableModule,
      ],
      providers: [SearchService],
      declarations: [SearchCharactersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SearchCharactersComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.p-card-title')?.textContent).toContain(
      'Search Star Wars Films Characters'
    );
  });
});
