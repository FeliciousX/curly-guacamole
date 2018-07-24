import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers(1);
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  getUsers(page: number): void {
    this.users = [];
    this.userService.getUsers(page)
      .subscribe(users => this.users = users);
  }

  paginate(pageEvent): void {
    // pageIndex starts from 0, API starts from 1
    const index = pageEvent.pageIndex + 1;
    this.getUsers(index);
  }
}
