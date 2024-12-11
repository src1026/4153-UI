import { Component, OnInit } from "@angular/core";
import { IRecipeSection } from "../../models/recipe-section.model";
import { RecipeSectionService } from "../../services/recipe-section.service";

@Component({
  selector: "app-recipe-section-list",
  templateUrl: "./recipe-section-list.component.html",
  styleUrls: ["./recipe-section-list.component.css"],
})
export class RecipeSectionListComponent implements OnInit {
  recipeSections?: IRecipeSection[] = [];
  currentRecipeSection: IRecipeSection = {
    recipe_id: "",
    recipe_name: "",
    owner_id: "",
    content: "",
    rating: "",
    cuisine_id: "",
    ingredient_list: "",
    comment: "",
    cooking_time: "",
    create_time: "",
    pictures: "",
  };
  // current_recipe_id: string = '';
  current_recipe_name: string = "";
  currentIndex = -1;
  recipeName = "";

  constructor(private recipeSectionService: RecipeSectionService) {}

  ngOnInit(): void {
    this.retrieveRecipeSections();
  }

  retrieveRecipeSections(): void {
    this.recipeSectionService.getAll().subscribe({
      next: (data) => {
        this.recipeSections = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveRecipeSections();
    this.currentRecipeSection = {
      recipe_id: "",
      recipe_name: "",
      owner_id: "",
      content: "",
      rating: "",
      cuisine_id: "",
      ingredient_list: "",
      comment: "",
      cooking_time: "",
      create_time: "",
      pictures: "",
    };
    this.currentIndex = -1;
  }

  setActiveRecipeSection(recipe: IRecipeSection, index: number): void {
    this.currentRecipeSection = recipe;
    console.log("Setting active recipe:", recipe);
  }

  removeAllRecipeSections(): void {
    this.recipeSectionService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }

  searchRecipeName(): void {
    this.currentRecipeSection = {
      recipe_id: "",
      recipe_name: "",
      owner_id: "",
      content: "",
      rating: "",
      cuisine_id: "",
      ingredient_list: "",
      comment: "",
      cooking_time: "",
      create_time: "",
      pictures: "",
    };
    this.currentIndex = -1;

    if (!this.current_recipe_name.trim()) {
      // If the search term is empty, show no recipes
      this.recipeSections = [];
      this.currentRecipeSection = this.getEmptyRecipeSection(); // Reset the selected recipe
      return;
    }

    // Call the backend service to search for recipes by name
    this.recipeSectionService
      .findByRecipeName(this.current_recipe_name)
      .subscribe({
        next: (data) => {
          console.log("API Response (raw):", data); // Debug raw API response

          const searchTerm = this.current_recipe_name.toLowerCase();
          this.recipeSections = data.filter(
            (recipe) =>
              recipe.recipe_name.toLowerCase().includes(searchTerm) ||
              recipe.content.toLowerCase().includes(searchTerm)
          );
          console.log("Filtered recipeSections:", this.recipeSections);

          // If at least one recipe is found, set it as the active recipe
          if (this.recipeSections.length > 0) {
            this.setActiveRecipeSection(this.recipeSections[0], 0);
          } else {
            // If no recipe is found, reset the current recipe section
            this.currentRecipeSection = this.getEmptyRecipeSection();
          }
        },
        error: (e) => console.error("API Error:", e),
      });
  }
  getEmptyRecipeSection(): IRecipeSection {
    return {
      recipe_id: "",
      recipe_name: "",
      owner_id: "",
      content: "",
      rating: "",
      cuisine_id: "",
      ingredient_list: "",
      comment: "",
      cooking_time: "",
      create_time: "",
      pictures: "",
    };
  }
}
