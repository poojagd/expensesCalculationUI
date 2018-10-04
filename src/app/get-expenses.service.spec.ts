import { TestBed, inject } from '@angular/core/testing';

import { GetExpensesService } from './get-expenses.service';

describe('GetExpensesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetExpensesService]
    });
  });

  it('should be created', inject([GetExpensesService], (service: GetExpensesService) => {
    expect(service).toBeTruthy();
  }));
});
