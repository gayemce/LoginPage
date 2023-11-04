import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isShowPassword: boolean = false;
  isPasswordFocus: boolean = false;

  constructor(private toastr: ToastrService) {

  }

  signIn(form: NgForm) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};:'\\|,.<>\/?])(?=.*[0-9]).+$/;
    const str = form.controls["password"].value;
    const strLength = str.length;
    const isValid = regex.test(str);

    if (form.valid && isValid) {
      console.log(form);
      console.log(form.value);
    } else {
      this.toastr.error("Lütfen zorunlu alanları doldurun!");

      const userNameOrEmailEl: any = document.getElementById("userNameOrEmail");
      console.log(form);
      if (!userNameOrEmailEl.validity.valid) {
        userNameOrEmailEl.classList.add("is-invalid");
        userNameOrEmailEl.classList.remove("is-valid");

        const errorMessage = userNameOrEmailEl.validationMessage;
        const divEl: any = document.querySelector(`#${userNameOrEmailEl.id} + .invalid-feedback`);
        divEl.innerHTML = errorMessage;
      }

      this.isPasswordFocus = true;

    }
  }

  showOrHidePassword(password: HTMLInputElement) {
    if (this.isShowPassword) {
      this.isShowPassword = false;
      password.type = "password";
    } else {
      this.isShowPassword = true;
      password.type = "text";
    }
  }

  checkRegexPatternForPassword(passwordEl: HTMLInputElement) {
    const text = passwordEl.value;

    //6karakter kısmı kontrolü
    const minSixCharacterEl = document.getElementById("minSixCharacter");
    minSixCharacterEl?.classList.add(text.length < 6 ? "pw-error" : "pw-success");
    minSixCharacterEl?.classList.remove(text.length >= 6 ? "pw-error" : "pw-success");

    //Büyük Harf Kontrolü
    const upperCaseRegex = /[A-Z]/;
    const upperCaseResult = upperCaseRegex.test(text);
    const upperLetterEl = document.getElementById("upperLetter");
    upperLetterEl?.classList.add(upperCaseResult ? 'pw-success' : 'pw-error');
    upperLetterEl?.classList.remove(!upperCaseResult ? 'pw-success' : 'pw-error');

    //Küçük Harf Kontrolü
    const lowerCaseRegex = /[a-z]/;
    const lowerCaseResult = lowerCaseRegex.test(text);
    const lowerLetterEl = document.getElementById("lowerLetter");
    lowerLetterEl?.classList.add(lowerCaseResult ? 'pw-success' : 'pw-error');
    lowerLetterEl?.classList.remove(!lowerCaseResult ? 'pw-success' : 'pw-error');

    //Özel Karakter Kontrolü
    const specialLetterCaseRegex = /[!@#$%^&*()_+\-=\[\]{};:'\\|,.<>\/?]+/;
    const specialLetterCaseResult = specialLetterCaseRegex.test(text);
    const specialLetterLetterEl = document.getElementById("specialLetter");
    specialLetterLetterEl?.classList.add(specialLetterCaseResult ? 'pw-success' : 'pw-error');
    specialLetterLetterEl?.classList.remove(!specialLetterCaseResult ? 'pw-success' : 'pw-error');

    //numeratic Kontrol
    const numeraticCaseRegex = /[0-9]/;
    const numeraticCaseResult = numeraticCaseRegex.test(text);
    const numeraticLetterEl = document.getElementById("numeratic");
    numeraticLetterEl?.classList.add(numeraticCaseResult ? 'pw-success' : 'pw-error');
    numeraticLetterEl?.classList.remove(!numeraticCaseResult ? 'pw-success' : 'pw-error');

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};:'\\|,.<>\/?])(?=.*[0-9]).+$/;
    const isValid = regex.test(text);

    if (isValid) {
      this.isPasswordFocus = false;
      passwordEl.classList.add("is-valid");
      passwordEl.classList.remove("is-invalid");
    } else {
      this.isPasswordFocus = true;
      passwordEl.classList.remove("is-valid");
      passwordEl.classList.add("is-invalid");
    }
  }
}
