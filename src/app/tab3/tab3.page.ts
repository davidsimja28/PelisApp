import { Component, Input, OnInit } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public token;
  public identity;
  constructor(
    public storage: LocalStorageService,
    private route: Router,
    public _userService: LoginService
  ) {
    // eslint-disable-next-line no-underscore-dangle
    this.token = this._userService.getToken();
    // eslint-disable-next-line no-underscore-dangle
    this.identity = this._userService.getIdentity();
  }

  salir() {
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
