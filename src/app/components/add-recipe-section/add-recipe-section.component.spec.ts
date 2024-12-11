import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddRecipeSectionComponent } from "./add-recipe-section.component";

describe("AddTutorialComponent", () => {
  let component: AddRecipeSectionComponent;
  let fixture: ComponentFixture<AddRecipeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRecipeSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecipeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
