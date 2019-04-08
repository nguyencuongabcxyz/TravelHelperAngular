import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserauthService {

    constructor(private fb: FormBuilder, private http: HttpClient) { }
    readonly BaseURI = 'https://travelhelperwebsite.azurewebsites.net/api';

    register(body) {
        return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
    }
    login(formData) {
        return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
    }
}
