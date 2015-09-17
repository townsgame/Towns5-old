// [PH] -> [Matusko]  Přepsal jsem PHP skript na JS

var objectmenu_template;


$(function() {

    objectmenu_template = $('#objectmenu-inner').html();


});


//======================================================================================================================objectMenuTerrainChange

$('#selecting-distance-ctl').hide();

function terrainChangeStart(terrain,level){

    terrain_change=terrain;
    level_change=level;
    terrainChanging=true;
    //todo motiv terenu
    $('#selecting-distance-ctl').show();
    $('#selecting-distance').show();
}

function terrainChangeStop(){
    terrainChanging=false;
    $('#selecting-distance-ctl').hide();
    $('#selecting-distance').hide();
}



//----------------------------------------------------


var terrain_change=false;


function objectMenuTerrainChange(){

    var objectmenu='';

        for(var terrain=1;terrain<14;terrain++){

            //object_data.func[key]
            // todo funkce

            //r(l('terrain','t'+terrain));

            var icon='media/image/terrain/t'+(terrain)+'.png';

            /*content='<h2>'+l('terrain','t'+terrain)+'</h2>' +
                '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi et ex fuga mollitia nisi obcaecati possimus sint, tenetur vitae? A aspernatur officiis quas quis ratione. Atque fugit optio suscipit?</p> ' +
                '<button>Postaviť drist!</button>';*/
            var content='';
            var action='terrainChangeStart('+(terrain)+',false);';


            objectmenu+=objectmenu_template.split('%icon').join(icon).split('%content').join(htmlEncode(content)).split('%action').join(htmlEncode(action));

            //$(objectmenu[i]).children('div').attr('content',content);
            //$(objectmenu[i]).children('.js-popup-action-open').css('background','url(\''+icon+'\')');



        }


        for(i=0;i<5;i++)
            objectmenu+='<br>';


        $('#objectmenu-inner').html(objectmenu);

        $('#objectmenu').animate({left:0}, 200);

        uiScript();


}

//======================================================================================================================objectMenuLevelChange

var level_change=false;


function objectMenuLevelChange(){

    var objectmenu='';

    for(var level=-1;level<=1;level+=0.5){

        //object_data.func[key]
        // todo funkce

        //r(l('terrain','t'+terrain));

        var icon='media/image/terrain/f_create_terrain.png';

        /*content='<h2>'+l('terrain','t'+terrain)+'</h2>' +
         '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi et ex fuga mollitia nisi obcaecati possimus sint, tenetur vitae? A aspernatur officiis quas quis ratione. Atque fugit optio suscipit?</p> ' +
         '<button>Postaviť drist!</button>';*/
        var content='';
        var action='terrainChangeStart(false,'+(level)+');';


        objectmenu+=objectmenu_template.split('%icon').join(icon).split('%content').join(htmlEncode(content)).split('%action').join(htmlEncode(action));

        //$(objectmenu[i]).children('div').attr('content',content);
        //$(objectmenu[i]).children('.js-popup-action-open').css('background','url(\''+icon+'\')');



    }


    for(i=0;i<5;i++)
        objectmenu+='<br>';


    $('#objectmenu-inner').html(objectmenu);

    $('#objectmenu').animate({left:0}, 200);

    uiScript();


}


//======================================================================================================================objectMenuTerrainChange



$(function(){

    objectMenuTerrainChange();

});