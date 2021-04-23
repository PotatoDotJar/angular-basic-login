import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { RegisterModel, User } from '../app.models';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
      password2: ["", Validators.required]
    }, { validators: this.passwordValidator });
  }

  public register() {
    if (!this.form?.valid) {
      return;
    }

    this.loading = true;

    const newUser: RegisterModel = this.form.value;
    this.userService.register(newUser)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([`/login`], { queryParams: { message: "Your account has been registered." } });
        },
        (error) => {
          console.error(error);
          this.loading = false;
        }
      );

  }

  get firstName() {
    return this.form?.get("firstName");
  }

  get lastName() {
    return this.form?.get("lastName");
  }

  get username() {
    return this.form?.get("username");
  }

  get password() {
    return this.form?.get("password");
  }

  get password2() {
    return this.form?.get("password2");
  }

  passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get("password");
    const password2 = control.get("password2");

    if (password?.errors && !password.errors.passwordMismatch) {
      return null;
    }

    if (password2?.errors && !password2.errors.passwordMismatch) {
      return null;
    }

    if (password?.value !== password2?.value) {
      const error = { passwordMismatch: true };
      password?.setErrors(error);
      password2?.setErrors(error);
      return error;
    }

    password?.setErrors(null);
    password2?.setErrors(null);

    return null;
  }
}
