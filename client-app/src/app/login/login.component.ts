import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginData, User } from '../app.models';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  loading: boolean = false;
  returnUrl: string = "";
  message: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // Return url (if any) to redirect to on success login
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.message = this.route.snapshot.queryParams['message'];
  }

  public login() {
    if (!this.form.valid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const loginDetails: LoginData = this.form.value;
    this.authenticationService.login(loginDetails)
      .pipe(first())
      .subscribe(
        (data: User) => {
          this.router.navigate([this.returnUrl]);
        },
        (err) => {
          console.error(err);
          this.loading = false;

          if(err.status === 400) {
            this.error = err.error.message;
            this.username?.setErrors({ invalid: true });
            this.password?.setErrors({ invalid: true });
          }
        }
      );

  }

  get username() {
    return this.form.get("username");
  }

  get password() {
    return this.form.get("password");
  }

}
