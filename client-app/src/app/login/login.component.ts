import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginData } from '../app.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input()
  error: string | null = null;

  @Output()
  onSubmit = new EventEmitter<LoginData>();

  form: FormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.form.valueChanges.subscribe((login: LoginData) => {
      console.log("Login form changed", login.username, login.password);
    });
  }

  // When the submit button is pressed
  public submitLogin() {
    if(this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }

}
