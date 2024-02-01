import { TestBed } from '@angular/core/testing';

import { StructureSanteService } from './structure-sante.service';

describe('StructureSanteService', () => {
  let service: StructureSanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StructureSanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
