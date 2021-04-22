import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  
  onLoginSubmit(args: any) {
    console.log("Logging in", args);
  }
}
