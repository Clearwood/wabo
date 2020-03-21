import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public user: User;
    public addressForm: FormGroup;

    private addressProperties = {
        city: ['', Validators.required],
        zipCode: ['', Validators.required],
        street: ['', Validators.required],
        houseNumber: ['', Validators.required],
    };

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.addressForm = this.formBuilder.group(this.addressProperties);
        this.userService.getUserById('1').subscribe(user => {
            this.user = user;
            this.addressForm.patchValue(user);
        });
    }

}
