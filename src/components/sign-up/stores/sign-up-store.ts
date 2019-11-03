import {observable, action} from 'mobx';
import { Dispatch } from 'redux';

export class SignUpStore {
  dispatch: Dispatch;

  @observable email: string = '';
  @observable name: string = '';
  @observable password: string = '';
  @observable repeatPassword: string = '';

  @observable isEmailValid: boolean = true;
  @observable isNameValid: boolean = true;
  @observable isPasswordValid: boolean = true;
  @observable isRepeatPasswordValid: boolean = true;

  @observable isEmailTouched: boolean = false;
  @observable isNameTouched: boolean = false;
  @observable isPasswordTouched: boolean = false;
  @observable isRepeatPasswordTouched: boolean = false;

  @observable isEmailPending: boolean = false;
  @observable isNamePending: boolean = false;
  @observable isPasswordPending: boolean = false;
  @observable isRepeatPasswordPending: boolean = false;

  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch;
  }

  @action
  setEmail(email: string) {
    this.email = email;
  }

  @action
  setName(name: string) {
    this.name = name;
  }
  
  @action
  setPassword(password: string) {
    this.password = password;
  }

  @action
  setRepeatPassword(repeatPassword: string) {
    this.repeatPassword = repeatPassword;
  }

  @action
  submit() {

  }

  @action
  reset() {
    this.email = '';
    this.name = '';
    this.password = '';
    this.repeatPassword = '';
  
    this.isEmailValid = true;
    this.isNameValid = true;
    this.isPasswordValid = true;
    this.isRepeatPasswordValid = true;
  
    this.isEmailTouched = false;
    this.isNameTouched = false;
    this.isPasswordTouched = false;
    this.isRepeatPasswordTouched = false;
  }
}