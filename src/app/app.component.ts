import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Validation';
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  registerForm: FormGroup;
  submitted = false;

  listCountry: any = [];
  listCity: any = [];

  country: any;
  city: string;

  onChangeCountry(): void {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `https://api.mocki.io/v1/50b6e912/cities/${this.country}`;
      this.http
        .get(apiURL)
        .toPromise()
        .then(res => {
          this.listCity = res;
          resolve("Success");
        });
    });
  }

  ngOnInit() {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `https://api.mocki.io/v1/50b6e912/countries`;
      this.http
        .get(apiURL)
        .toPromise()
        .then(res => {
          this.listCountry = res;
          resolve("Success");
        });
    });

    this.registerForm = this.formBuilder.group({
      firstName: [
        "",
        [Validators.required],
        [Validators.minLength(3)],
        [Validators.maxLength(50)]
      ],
      gender: ["", [Validators.required]],
      country: ["", [Validators.required]],
      city: ["", [Validators.required]],
      age: ["", [Validators.required]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value));
  }
}
