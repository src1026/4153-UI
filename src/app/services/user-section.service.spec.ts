import { TestBed } from "@angular/core/testing";

import { UserSectionService } from "./user-section.service";

describe("TutorialService", () => {
  let service: UserSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSectionService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
