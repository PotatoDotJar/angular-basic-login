import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../app.models';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User | null;
  users: Array<User> = [];

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.currentUser = authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

}
