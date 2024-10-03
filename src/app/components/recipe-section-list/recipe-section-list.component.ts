import { Component, OnInit } from '@angular/core';
import { IRecipeSection } from '../../models/recipe-section.model';
import { RecipeSectionService } from '../../services/recipe-section.service';

@Component({
  selector: 'app-recipe-section-list',
  templateUrl: './recipe-section-list.component.html',
  styleUrls: ['./recipe-section-list.component.css'],
})
export class RecipeSectionListComponent implements OnInit {
  recipeSections?: IRecipeSection[];
  currentRecipeSection: IRecipeSection = {
    recipe_id: '',
    recipe_name: '',
    owner_id: '',
    content: '',
    rating: '',
    cuisine_id: '',
    ingredient_list: '',
    comment: '',
    cooking_time: '',
    create_time: '',
    pictures: '',
  };
  current_recipe_id: string = '';
  currentIndex = -1;
  recipeName = '';

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
      recipe_id: '',
      recipe_name: '',
      owner_id: '',
      content: '',
      rating: '',
      cuisine_id: '',
      ingredient_list: '',
      comment: '',
      cooking_time: '',
      create_time: '',
      pictures: '',
    };
    this.currentIndex = -1;
  }

  setActiveRecipeSection(recipeSection: IRecipeSection, index: number): void {
    this.currentRecipeSection = recipeSection;
    this.currentIndex = index;
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
      recipe_id: '',
      recipe_name: '',
      owner_id: '',
      content: '',
      rating: '',
      cuisine_id: '',
      ingredient_list: '',
      comment: '',
      cooking_time: '',
      create_time: '',
      pictures: '',
    };
    this.currentIndex = -1;

    this.recipeSectionService.findByRecipeID(this.current_recipe_id).subscribe({
      next: (data) => {
        this.recipeSections = new Array<IRecipeSection>();
        // @ts-ignore
        this.recipeSections.push(data);
        console.log(this.recipeSections);
      },
      error: (e) => console.error(e),
    });
  }
}
