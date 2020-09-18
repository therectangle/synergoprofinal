import { AbstractControl } from '@angular/forms';

export class CustomValidators {
    static emailDomain(domainName: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const email: string = control.value;
            const domain = email.substring(email.lastIndexOf('@') + 1);
            if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
                return null;
            } else {
                return { 'emailDomain': true };
            }
        };
    }

    static maskEmailAddress(strEmail:string, maskChar:string):string
        {
        
         var parts = strEmail.split("@");
        
        //mask first part
        var strId = "";
        if(parts[0].length < 4)
            strId = this.maskString(parts[0], 0, parts[0].length, '*');
        else
            strId = this.maskString(parts[0], 1, parts[0].length-1, '*');
        
        //now append the domain part to the masked id part
        return strId + "@" + parts[1];
    }

    static maskString(strText:string,start:number,end:number,maskChar:string) 
        {
        
        if(strText == null || strText==(""))
            return "";
        
        if(start < 0)
            start = 0;
        
        if( end > strText.length )
            end = strText.length;
        
        var maskLength = end - start;
        
        if(maskLength == 0)
            return strText;
        
        var sbMaskString = "";
        
        for(var i = 0; i < maskLength; i++){
            sbMaskString=sbMaskString+(maskChar);
        }
        
        return strText.substring(0, start) 
                + sbMaskString.toString() 
                + strText.substring(start + maskLength);
    }
}