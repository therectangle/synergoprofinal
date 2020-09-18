import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor( public authService: AuthService,private location: Location) { }
  viewMode = 'tab1';
  pviewMode= 'ptab1';

  carouselOptions = {
    margin: 0,
    nav: true,
    loop:true,
  
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:false,
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
        loop: false
      },
      1500: {
        items: 1,
        nav: true,
        loop: false
      }
    }
  }

  images1 = [
    {
      text: "Everfresh Flowers",
      image: "assets/images/product/backsupport.jpg"
    },
    {
      text: "Festive Deer",
      image: "assets/images/product/backsupport.jpg"
    },
    {
      text: "Morning Greens",
      image: "assets/images/product/backsupport.jpg"
    }
  
  ];
  images2 = [
    {
      text: "Everfresh Flowers",
      image: "assets/images/product/ergo_chair.jpg"
    },
    {
      text: "Festive Deer",
      image: "assets/images/product/ergo_chair.jpg"
    },
    {
      text: "Morning Greens",
      image: "assets/images/product/ergo_chair.jpg"
    }
  
  ];
  images3 = [
    {
      text: "Everfresh Flowers",
      image: "assets/images/product/ergo_desk.jpg"
    },
    {
      text: "Festive Deer",
      image: "assets/images/product/ergo_desk.jpg"
    },
    {
      text: "Morning Greens",
      image: "assets/images/product/ergo_desk.jpg"
    }
  
  ];
  images4 = [
    {
      text: "Everfresh Flowers",
      image: "assets/images/product/footrest.jpg"
    },
    {
      text: "Festive Deer",
      image: "assets/images/product/footrest.jpg"
    },
    {
      text: "Morning Greens",
      image: "assets/images/product/footrest.jpg"
    }
  
  ];
  images5 = [
    {
      text: "Everfresh Flowers",
      image: "assets/images/product/laptop_stand.jpg"
    },
    {
      text: "Festive Deer",
      image: "assets/images/product/laptop_stand.jpg"
    },
    {
      text: "Morning Greens",
      image: "assets/images/product/laptop_stand.jpg"
    }
  
  ];
  images6 = [
    {
      text: "Everfresh Flowers",
      image: "assets/images/product/semi_vertical_mouse.jpg"
    },
    {
      text: "Festive Deer",
      image: "assets/images/product/semi_vertical_mouse.jpg"
    },
    {
      text: "Morning Greens",
      image: "assets/images/product/semi_vertical_mouse.jpg"
    }
  
  ];

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


}
