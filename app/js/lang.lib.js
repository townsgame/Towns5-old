/**
 * Created by Pavel on 11.09.2015.
 */


var locale={};

var lang='cs';


function l(a,b,c,e,f){


    var value=locale[lang];
    for(var i= 0,l=arguments.length;i<l;i++){

        if(typeof value[arguments[i]]!='undefined')
            value=value[arguments[i]];

    }

    return(value);

}