import { Component } from "@angular/core";
import { IRecipeSection } from "../../models/recipe-section.model";
import { RecipeSectionService } from "../../services/recipe-section.service";

@Component({
  selector: "app-add-recipe-section",
  templateUrl: "./add-recipe-section.component.html",
  styleUrls: ["./add-recipe-section.component.css"],
})
export class AddRecipeSectionComponent {
  recipeSection: IRecipeSection = {
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
  submitted = false;

  constructor(private recipeSectionService: RecipeSectionService) {}

  saveRecipeSection(): void {
    const data = { ...this.recipeSection };

    this.recipeSectionService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  newRecipeSection(): void {
    this.submitted = false;
    this.recipeSection = {
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
