import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login-section.component.html",
  styleUrls: ["./login-section.component.css"],
})
export class LoginSectionComponent implements OnInit {
  username: string = "";
  password: string = "";
  user: any = null;
  isLoading: boolean = false;
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkUserProfile();
  }

  checkUserProfile(): void {
    const token = localStorage.getItem("token");
    if (token) {
      this.isLoading = true;
      this.authService.getUserProfile(token).subscribe({
        next: (data: any) => {
          console.log(data);
          this.user = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error fetching user profile:", err);
          this.logout();
          this.isLoading = false;
        },
      });
    }
  }

  login(): void {
    this.isLoading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (data: any) => {
        localStorage.setItem("token", data.access_token);
        this.checkUserProfile();
      },
      error: (err) => {
        console.error("Login failed:", err);
        this.errorMessage = "Invalid username or password.";
        this.isLoading = false;
      },
    });
  }

  logout(): void {
    localStorage.removeItem("token");
    this.user = null;
    this.router.navigate(["/login"]);
  }

  goToSignup(): void {
    this.router.navigate(["/signup"]);
  }
}
