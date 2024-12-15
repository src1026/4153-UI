import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddRecipeSectionComponent } from "./components/add-recipe-section/add-recipe-section.component";
import { RecipeSectionDetailsComponent } from "./components/recipe-section-details/recipe-section-details.component";
import { RecipeSectionListComponent } from "./components/recipe-section-list/recipe-section-list.component";
import { ProfileSectionDetailsComponent } from "./components/profile-section-details/profile-section-details.component";
import { LoginSectionComponent } from "./components/login-section/login-section.component";

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeSectionComponent,
    RecipeSectionDetailsComponent,
    RecipeSectionListComponent,
    ProfileSectionDetailsComponent,
    LoginSectionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
