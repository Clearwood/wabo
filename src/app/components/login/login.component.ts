import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public startVector = {
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  };

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(this.startVector);
  }

  onLogin() {
    const password = this.loginForm.get('password').value;
    const email = this.loginForm.get('email').value;
    this.authService.login(email, password).subscribe(() => {
      this.router.navigate([[this.route.snapshot.queryParams.returnUrl || '/'], {replaceUrl: true}]);
    });
  }

}
