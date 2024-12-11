import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RecipeSectionListComponent } from "./recipe-section-list.component";

describe("TutorialsListComponent", () => {
  let component: RecipeSectionListComponent;
  let fixture: ComponentFixture<RecipeSectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeSectionListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeSectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
