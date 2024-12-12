import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IRecipeSection } from "../../models/recipe-section.model";
import { RecipeSectionService } from "../../services/recipe-section.service";

@Component({
  selector: "app-recipe-section-details",
  templateUrl: "./recipe-section-details.component.html",
  styleUrls: ["./recipe-section-details.component.css"],
})
export class RecipeSectionDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentRecipeSection: IRecipeSection = {
    recipe_id: -1,
    recipe_name: "",
    user_id: -1,
    content: "",
    rating: -1.1,
    cuisine_id: 0,
    ingredient_id: "",
    comment: "",
    cooking_time: 0,
    create_time: "",
    pictures: "",
  };
  current_recipe_name: string = "";
  message = "";

  constructor(
    private recipeSectionService: RecipeSectionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  searchRecipeName(): void {
    if (!this.current_recipe_name.trim()) {
      // If no search term is entered, reset the recipe section
      this.currentRecipeSection = this.getEmptyRecipeSection();
      return;
    }

    // If a search term is entered, call the service to fetch matching recipes
    this.recipeSectionService
      .findByRecipeName(this.current_recipe_name)
      .subscribe({
        next: (data) => {
          console.log("API Response (raw):", data);
          const searchTerm = this.current_recipe_name.toLowerCase();
          const matchedRecipe = data.find(
            (recipe) =>
              recipe.recipe_name.toLowerCase().includes(searchTerm) ||
              recipe.content.toLowerCase().includes(searchTerm)
          );

          if (matchedRecipe) {
            this.currentRecipeSection = matchedRecipe;
          } else {
            this.currentRecipeSection = this.getEmptyRecipeSection();
          }
        },
        error: (e) => console.error("API Error:", e),
      });
  }

  // Helper function to reset the currentRecipeSection to an empty state
  getEmptyRecipeSection(): IRecipeSection {
    return {
      recipe_id: -1,
      recipe_name: "",
      user_id: -1,
      content: "",
      rating: -1.1,
      cuisine_id: 0,
      ingredient_id: "",
      comment: "",
      cooking_time: 0,
      create_time: "",
      pictures: "",
    };
  }

  setActiveRecipeSection(recipe: IRecipeSection, index: number): void {
    this.currentRecipeSection = recipe;
  }

  ngOnInit(): void {
    console.log("View Mode:", this.viewMode);
    console.log("Current Recipe Section:", this.currentRecipeSection);

    if (!this.viewMode) {
      this.message = "";
      this.getRecipeSection(this.route.snapshot.params["name"]);
    }
  }

  getRecipeSection(name: string): void {
    this.recipeSectionService.get(name).subscribe({
      next: (data) => {
        this.currentRecipeSection = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updatePublished(status: boolean): void {
    const data = { ...this.currentRecipeSection, published: status };

    this.message = "";

    this.recipeSectionService
      .update(this.currentRecipeSection.recipe_id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : "The status was updated successfully!";
        },
        error: (e) => console.error(e),
      });
  }

  updateRecipeSection(): void {
    this.message = "";

    this.recipeSectionService
      .update(this.currentRecipeSection.recipe_id, this.currentRecipeSection)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : "This recipe section was updated successfully!";
        },
        error: (e) => console.error(e),
      });
  }

  deleteRecipeSection(): void {
    this.recipeSectionService
      .delete(this.currentRecipeSection.recipe_id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(["/recipe-sections"]);
        },
        error: (e) => console.error(e),
      });
  }
}
