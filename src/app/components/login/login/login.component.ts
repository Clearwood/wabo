import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Translate} from '../../../shared/pipes/translate';
import {User} from '../../../models/user';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

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

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private snackbar: MatSnackBar) {
  }

  public translate = new Translate();
  public isGerman = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(this.startVector);
    this.isGerman = localStorage.getItem('language') === 'de-DE';
  }

  onLogin() {
    const password = this.loginForm.get('password').value;
    const email = this.loginForm.get('email').value;
    this.authService.login(email, password).subscribe(
      (res: { token: string, user: User }) => {
        this.snackbar.open(
          `${this.translate.transform('login.login_success')} ${res.user.firstName} ${res.user.lastName}`, '',
          {duration: 1000}
        );
        this.router.navigate([[this.route.snapshot.queryParams.returnUrl || '/'], {replaceUrl: true}]);
      },
      () => {
        this.snackbar.open(this.translate.transform('login.login_error'), null, {duration: 3});
      }
    );
  }

  onSignUp() {
    this.router.navigate(['sign-up']);
  }

  onToggleLanguage(event: MatSlideToggleChange) {
    const lang = event.checked ? 'de-DE' : 'en-EN';
    localStorage.setItem('language', lang);
  }
}
