/**
 * Crea un tipo de loteria con seis propiedades que representan los valores de una primitiva:v1,v2,v3,v4,v5,v6. Define además un método que te cuente los aciertos que recibe como parametros seis valores de la combinación ganadora y devuelve el numero de aciertos.
 */

'use strict'
	var miApuesta;
	var i;
	var aciertos;

    function loteria(n1,n2,n3,n4,n5,n6){

        function Apuesta(val1,val2,val3,val4,val5,val6){
            this.v1=val1;
            this.v2=val2;
            this.v3=val3;
            this.v4=val4;
            this.v5=val5;
            this.v6=val6;

            this.contarAciertos = function(vl1,vl2,vl3,vl4,vl5,vl6){
                var contador=0;
                var valores=[vl1,vl2,vl3,vl4,vl5,vl6];
                
                for(i=0; i<valores.length; i++){
                    if (this.v1==valores[i] || this.v2==valores[i] || this.v3==valores[i] || this.v4==valores[i] || this.v5==valores[i] || this.v6==valores[i]){
                            contador++
                    }

                }
                
                return contador;
            }
        }
        if(typeof n1,n2,n3,n4,n5,n6 !=="number"){
            throw Error("input is not a number");
        };
            miApuesta=new Apuesta (6, 9, 46, 25, 38, 18);

            aciertos=miApuesta.contarAciertos(n1,n2,n3,n4,n5,n6);
                
            console.log ("Has acertado "+aciertos+ " números");
    }