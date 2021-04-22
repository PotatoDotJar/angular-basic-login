import { Component, OnInit } from '@angular/core';
import { User } from '../app.models';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User | null;

  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = authenticationService.currentUserValue;
  }

  ngOnInit(): void {
  }

}
