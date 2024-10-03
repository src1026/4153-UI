import { TestBed } from '@angular/core/testing';

import { RecipeSectionService } from './recipe-section.service';

describe('TutorialService', () => {
  let service: RecipeSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
