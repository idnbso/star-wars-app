import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
