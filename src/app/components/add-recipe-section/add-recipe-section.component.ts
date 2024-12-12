import { Component } from "@angular/core";
import { IRecipeSection } from "../../models/recipe-section.model";
import { RecipeSectionService } from "../../services/recipe-section.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-add-recipe-section",
  templateUrl: "./add-recipe-section.component.html",
  styleUrls: ["./add-recipe-section.component.css"],
})
export class AddRecipeSectionComponent {
  recipeSection: IRecipeSection = {
    recipe_id: -1,
    recipe_name: "",
    user_id: -1,
    content: "",
    rating: -1.1,
    cuisine_id: 0,
    ingredient_id: "",
    comment: "temp",
    cooking_time: 0,
    create_time: "temp",
    pictures: "",
  };
  submitted = false;

  cuisines = [
    { id: 1, name: "American" },
    { id: 2, name: "Argetinian" },
    { id: 3, name: "Australian" },
    { id: 4, name: "Brazilian" },
    { id: 5, name: "Chinese" },
    { id: 6, name: "Filipino" },
    { id: 7, name: "German" },
    { id: 8, name: "Greek" },
    { id: 9, name: "Hawaiian" },
    { id: 10, name: "Indian" },
    { id: 11, name: "Indonesian" },
    { id: 12, name: "Italian" },
    { id: 13, name: "Japanese" },
    { id: 14, name: "Korean" },
    { id: 15, name: "Lebanese" },
    { id: 16, name: "Malaysian" },
    { id: 17, name: "Mexican" },
    { id: 18, name: "Moroccan" },
    { id: 19, name: "Peruvian" },
    { id: 20, name: "Spanish" },
    { id: 21, name: "Taiwanese" },
    { id: 22, name: "Thai" },
    { id: 23, name: "Tibetian" },
    { id: 24, name: "Turkish" },
    { id: 25, name: "Vietnamese" },
  ];

  constructor(
    private http: HttpClient,
    private recipeSectionService: RecipeSectionService
  ) {}

  saveRecipeSection(): void {
    const requestData = {
      recipe_id: this.recipeSection.recipe_id,
      recipe_name: this.recipeSection.recipe_name,
      user_id: this.recipeSection.user_id,
      content: this.recipeSection.content,
      rating: this.recipeSection.rating,
      cuisine_id: Number(this.recipeSection.cuisine_id),
      ingredient_id: this.recipeSection.ingredient_id,
      comment: this.recipeSection.comment,
      cooking_time: this.recipeSection.cooking_time,
      create_time: this.recipeSection.create_time,
      pictures: this.recipeSection.pictures,
    };
    console.log(requestData);

    // First POST request to 'http://localhost:8000/recipes_sections'
    this.http
      .post("http://localhost:8000/recipes_sections", requestData)
      .subscribe(
        (response: any) => {
          console.log("Response from recipes_sections:", response);
        },
        (error: any) => {
          console.error("Error from recipes_sections:", error);
          if (error.error && error.error.detail) {
            console.error(
              "Detailed error from recipes_sections:",
              error.error.detail
            );
          }
        }
      );

    // Second API call using the recipeSectionService.create()
    const data = { ...this.recipeSection };
    this.recipeSectionService.create(data).subscribe({
      next: (res) => {
        console.log("Response from recipeSectionService.create:", res);
        this.submitted = true;
      },
      error: (e) => {
        console.error("Error from recipeSectionService.create:", e);
      },
    });
  }

  newRecipeSection(): void {
    this.submitted = false;
    this.recipeSection = {
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
}
