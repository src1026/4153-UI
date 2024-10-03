import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipeSection } from '../../models/recipe-section.model';
import { RecipeSectionService } from '../../services/recipe-section.service';

@Component({
  selector: 'app-recipe-section-details',
  templateUrl: './recipe-section-details.component.html',
  styleUrls: ['./recipe-section-details.component.css'],
})
export class RecipeSectionDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentRecipeSection: IRecipeSection = {
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

  message = '';

  constructor(
    private recipeSectionService: RecipeSectionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getRecipeSection(this.route.snapshot.params['id']);
    }
  }

  getRecipeSection(id: string): void {
    this.recipeSectionService.get(id).subscribe({
      next: (data) => {
        this.currentRecipeSection = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updatePublished(status: boolean): void {
    const data = { ...this.currentRecipeSection, published: status };

    this.message = '';

    this.recipeSectionService
      .update(this.currentRecipeSection.recipe_id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'The status was updated successfully!';
        },
        error: (e) => console.error(e),
      });
  }

  updateRecipeSection(): void {
    this.message = '';

    this.recipeSectionService
      .update(this.currentRecipeSection.recipe_id, this.currentRecipeSection)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This recipe section was updated successfully!';
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
          this.router.navigate(['/recipe-sections']);
        },
        error: (e) => console.error(e),
      });
  }
}
