"use strict"


function Calculator(){

    this._status = "";
    this.numbers=0;
    this._result;
    this.oper="";
}



Calculator.prototype.one= function(){

    this._status += 1
    
}

Calculator.prototype.two= function(){

    this._status += 2
    
}

Calculator.prototype.three= function(){

    this._status += 3
   
}
Calculator.prototype.four= function(){

    this._status += 4
   
}
Calculator.prototype.five= function(){

    this._status += 5
   
}
Calculator.prototype.six= function(){

    this._status += 6
    
}
Calculator.prototype.seven= function(){

    this._status += 7
   
}
Calculator.prototype.eight= function(){

    this._status += 8
    
}
Calculator.prototype.nine= function(){

   this._status += 9
   
}
Calculator.prototype.zero= function(){

    this._status += 0
    
}

Calculator.prototype.status=function(){

    return parseInt(this._status)

}

Calculator.prototype.sum= function(){

    if(this.numbers ===0){

        this.numbers=parseInt(this._status);
        
        this._status="";

        return this.numbers

    }else{
 
        this._status= this.numbers + parseInt(this._status)
        return this._status
    }
    
}

Calculator.prototype.negate=function(){

    this._status= "-" + this._status;
}

Calculator.prototype.result=function(){


    return this._result

}