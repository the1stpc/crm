/* tslint:disable:quotemark */
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { AuthService } from "../shared/layouts/services/auth.service";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MaterialService } from "../shared/classes/material.service";

@Component({
  selector: "app-register-page",
  templateUrl: './register-page.component.html',
  styleUrls: ["./register-page.component.scss"]
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;
  aSub: Subscription;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    this.aSub = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        });
      },
      error => {
        MaterialService.toast(error.error.message);
        console.log(error);
        this.form.enable();
      }
    );
  }
}
