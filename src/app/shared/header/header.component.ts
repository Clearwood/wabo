import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() componentName: string;

  constructor(public userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSignOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userService.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }
}
