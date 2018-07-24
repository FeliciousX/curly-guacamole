import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = true;
  selectedUser: User;

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers(1);
  }

  getUsers(page: number): void {
    this.loading = true;
    this.userService.getUsers(page)
    .subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }

  paginate(pageEvent): void {
    // pageIndex starts from 0, API starts from 1
    const index = pageEvent.pageIndex + 1;
    this.getUsers(index);
  }

  openDialog(user: User): void {
    this.selectedUser = user;
    const dialogRef = this.dialog.open(UserDetailComponent, {
      width: '80%',
      data: user
    });

    dialogRef.afterClosed().subscribe(() => this.selectedUser = null);
  }
}
