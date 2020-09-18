export class FirebaseUserModel {
  $key: string;
  image: string;
  name: string;
  provider: string;
  orgName:string;
  email:string;
  phone:string;
  address:string;
  


  constructor(){
    this.image = "";
    this.name = "";
    this.provider = "";
    this.orgName="";
    this.email="";
    this.phone="";
    this.address="";

  }
}
