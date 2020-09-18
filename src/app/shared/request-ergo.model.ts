import { AssessmentType } from './assessment-type-model';

export class RequestErgo {

    $key: string;
    assessmentType:string="";
    fullName:string="";
    organisation:string="";
    workEmail:string="";
    phone:string="";
    address:string="";
    
    reasonForAssetment:string="";
    areaOfPainHeadSelected:boolean=false;
    areaOfPainHeadValue:string="";
    areaOfPainEyesSelected:boolean=false;
    areaOfPaininEyesValue:string="";
    areaOfPainNeckSelected:boolean=false;
    areaOfPainNeckValue:string="";
    areaOfPainUpperBackSelected:boolean=false;
    areaOfPainUpperBackValue:string="";
    areaOfPainLowerBackSelected:boolean=false;
    areaOfPainLowerBackValue:string="";
    areaOfPainShouldersSelected:boolean=false;
    areaOfPainShouldersValue:string="";
    areaOfPainForearmsSelected:boolean=false;
    areaOfPainForearmsValue:string="";
    areaOfPainWristsSelected:boolean=false;
    areaOfPainWritsValue:string="";
    areaOfPainHandsSelected:boolean=false;
    areaOfPainHandsValue:string="";
    areaOfPainKneesSelected:boolean=false;
    areaOfPainKneesValue:string="";
    areaOfPainFeetSelected:boolean=false;
    areaOfPainFeetValue:string="";
    areaOfPainOthersSelected:boolean=false;
    areaOfPainOthersValue:string="";

    prefferedDatesTime:string="";
    images:string[]=[];
    additionalDetails:string=""
    


    constructor() {
       
        
    }


}