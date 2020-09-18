import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
firebaseUserModel:string;

carouselOptions = {
    margin: 0,
    nav: true,
    loop:true,
  
    autoplay: true,
    smartSpeed:500,
    autoplayTimeout: 6000,
    autoplaySpeed: 600,
    autoplayHoverPause: true,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 1,
        nav: true,
        loop: true
      }
      
    }
  }

  images = [
    {
      text: "Everfresh Flowers",
      image: "../assets/images/home/neck-pain-posturepro.png"
    },
    {
      text: "Festive Deer",
      image: "../assets/images/home/neck-pain-posturepro.png"
    },
    {
      text: "Morning Greens",
      image: "../assets/images/home/neck-pain-posturepro.png"
    }
  
  ];
  constructor( public authService: AuthService,private location: Location) { }

  ngOnInit() {
    this.firebaseUserModel=sessionStorage.getItem("firebaseUserModel");
    console.log("this.firebaseUserModel="+this.firebaseUserModel);
  }
  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }


}
