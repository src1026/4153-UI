import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IUserSection } from "../../models/user-section.model";
import { UserSectionService } from "../../services/user-section.service";

@Component({
  selector: "app-profile-section-details",
  templateUrl: "./profile-section-details.component.html",
  styleUrls: ["./profile-section-details.component.css"],
})
export class ProfileSectionDetailsComponent implements OnInit {
  userId: number | null = null;
  userInfo: IUserSection | null = null;
  isLoading: boolean = true;

  constructor(
    private profileSectionService: UserSectionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userIdParam = this.route.snapshot.paramMap.get("user_id");
    if (userIdParam) {
      this.userId = parseInt(userIdParam, 10);
      console.log("Parsed userId:", this.userId);
      console.log(isNaN(this.userId));
      if (!isNaN(this.userId)) {
        console.log("fetching user info");
        this.fetchUserInfo(this.userId);
        console.log(this.userInfo);
      } else {
        console.error("Invalid user_id format.");
        this.isLoading = false;
      }
    } else {
      console.error("No user_id provided in the route.");
      this.isLoading = false;
    }
  }

  fetchUserInfo(userId: number): void {
    this.profileSectionService.getUserById(userId).subscribe({
      next: (data: IUserSection[]) => {
        console.log("API Response:", data);
        const user = data.find((user) => Number(user.user_id) === userId);
        console.log("Found User:", user);
        if (user) {
          this.userInfo = user;
          this.isLoading = false;
        } else {
          console.error("User not found.");
        }
      },
      error: (err) => {
        console.error("Error fetching user data:", err);
        this.isLoading = false;
      },
    });
  }
}
