import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './app.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`/api/users`);
  }
}