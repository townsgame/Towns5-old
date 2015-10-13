
//----------------Změny kumulované uživatelem na objektech (budovy, pribehy,...)


var map_object_changes=localStorage.getItem('map_object_changes');

if(!map_object_changes || map_object_changes=='')map_object_changes='[]';

try {
    map_object_changes=JSON.parse(map_object_changes);
}
catch(err) {
    map_object_changes=[];
}


map_object_changes_buffer=[];//krokové změny

//======================================================================================================================

function create(object,nosave){
    if(typeof nosave =='undefined')nosave=false;

    var x=Math.round(object.x);
    var y=Math.round(object.y);

    x=x-Math.round(map_x)+Math.floor(map_size/2);
    y=y-Math.round(map_y)+Math.floor(map_size/2);


    if([1/*,5*/,11].indexOf(map_bg_data[y][x])!==-1){
        return(false);
    }



    var distance,distances=[];


    for (var i = 0,l=map_object_changes.length; i < l; i++){

        if((distance=xy2dist(map_object_changes[i].x-object.x,map_object_changes[i].y-object.y))<0.7*map_model_size){


            distances.push({i: i,distance: distance});
            //map_object_changes.slice(i,1);
            //i--;l--;


        }


    }


    if(distances.length>0){

        distances.sort(function (a, b) {

            if (a.distance > b.distance) {
                return (1);
            } else if (a.distance < b.distance) {
                return (-1);
            } else {
                return (0);
            }

        });

        if(1){

            delete map_object_changes[distances[0].i];
            map_object_changes[distances[0].i]=object;
        }else{


            map_object_changes[distances[0].i].res=model2model(map_object_changes[distances[0].i].res,object.res);


        }

    }else{

        map_object_changes.push(object);
    }


    //---------------------------------------Save objects to local storage
    if(!nosave){
        r('saving objects');
        localStorage.setItem('map_object_changes',JSON.stringify(map_object_changes));

    }else{
        //r('NO saving objects');
    }
    //---------------------------------------


}

//----------------------------------------------------------------------------------------------------------------------

function createMulti(objects){
    for (var i = 0,l=objects.length; i < l; i++)
        create(objects[i],(i==l-1?false:true));

}
