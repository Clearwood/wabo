import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Translate} from '../../shared/pipes/translate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public startVector = {
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  };

  public translate = new Translate();

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(this.startVector);
  }

  onLogin() {
    const password = this.loginForm.get('password').value;
    const email = this.loginForm.get('email').value;
    this.authService.login(email, password).subscribe(
      user => {

        this.snackbar.open(`${this.translate.transform('login.login_success')} ${user.firstName} ${user.lastName}`);
        this.router.navigate([[this.route.snapshot.queryParams.returnUrl || '/'], {replaceUrl: true}]);
      },
      () => {
        this.snackbar.open(this.translate.transform('login.login_error'), null, {duration: 3});
      }
    );
  }
}
