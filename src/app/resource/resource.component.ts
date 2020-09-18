import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
     viewMode = 'tab1';
     videoPopupDisplay:Boolean=false;

  constructor( public authService: AuthService,private location: Location) { }

  ngOnInit() {
  }
  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }

  videohide()
  {
    this.videoPopupDisplay=false;
  }
  videoShow(){
    //alert("hiii");
    this.videoPopupDisplay=true;
  }

}
