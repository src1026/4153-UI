import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProfileSectionDetailsComponent } from "./profile-section-details.component";

describe("ProfileSectionDetailsComponent", () => {
  let component: ProfileSectionDetailsComponent;
  let fixture: ComponentFixture<ProfileSectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileSectionDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
