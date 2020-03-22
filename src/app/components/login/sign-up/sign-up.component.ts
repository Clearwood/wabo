import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Translate} from '../../../shared/pipes/translate';
import {AuthService} from '../../../core/authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HealthStatus, User} from '../../../models/user';
import {UserService} from '../../../shared/services/user.service';
import {switchMap} from 'rxjs/operators';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;

  public startVector: {[k in keyof User]: any[]} = {
    firstName: ['', Validators.required ],
    healthStatus: [HealthStatus.HEALTHY, Validators.required],
    isRiskGroup: [false, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  };

  public healthEnum = HealthStatus;

  public translate = new Translate();

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private snackbar: MatSnackBar,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group(this.startVector);
  }

  onToggleRiskGroup(event: MatSlideToggleChange) {
    this.signUpForm.patchValue({isRiskGroup: event.checked});
  }

  onSignUp() {
    const submitUser: User = {
      lastName: '_',
      streetName: 'Takustraße',
      city: 'Berlin',
      extraAddressInformation: 'Keller',
      birthday: new Date(),
      houseNumber: '9',
      postCode: 14195,
      phoneNumber: '0',
    };
    Object.assign(submitUser, this.signUpForm.value);
    this.userService.createUser(submitUser).pipe(
      switchMap(user => {
        return this.authService.login(user.email, user.password);
      })).subscribe(
      (res: { token: string, user: User }) => {
        this.snackbar.open(
          `${this.translate.transform('login.login_success')} ${res.user.firstName} ${res.user.lastName}`, '',
          {duration: 1000}
          );
        this.router.navigate([[this.route.snapshot.queryParams.returnUrl || '/'], {replaceUrl: true}]);
      },
    );
  }
}
