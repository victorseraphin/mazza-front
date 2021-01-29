import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-menutop',
  templateUrl: './menutop.component.html',
  styleUrls: ['./menutop.component.css']
})
export class MenutopComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  user: User[] = [];

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      //this.roles = this.user.roles;     
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
