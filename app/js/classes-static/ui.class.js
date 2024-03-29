/**
 * @author ©Towns.cz
 * @fileOverview Creates User interface functions
 */
//======================================================================================================================


//todo should it be UI object with static functions?

//------------------------------------------------------------------focusOnMap

function focusOnMap(){
    return(!(window_opened || ['INPUT','TEXTAREA'].indexOf(document.activeElement.tagName)!=-1));
}

//------------------------------------------------------------------window_open

var window_closeJS = false;//todo refactor strange name

window.window_open = function(page){


    //todo sounds ion.sound.play("door_bump");
    r('Opening window '+page);


    if(!is(Pages[page])){
        throw new Error('Page '+page+' not exist.');
    }

    var header=Pages[page].header;
    var content=Pages[page].content;


    if(!is(header))header='';
    if(!is(content))content='';

    content=content.split('{{');


    for(var i=1,l=content.length;i<l;i++){

        //r(content[i]);
        content[i]=content[i].split('}}');


        //r('eval ','content[i][0]='+content[i][0]+';');

        content[i][0]=Locale.get(content[i][0]);
        content[i]=content[i].join('');


    }
    content=content.join('');



    //r(header,content);

    window_open_content(header,content);

    if(is(Pages[page].openJS)) {
        setTimeout(function () {
            Pages[page].openJS();
        },IMMEDIATELY_MS);
    }


    if(is(Pages[page].closeJS)) {
        window_closeJS=Pages[page].closeJS;
    }




};

//------------------------------------------------------------------window write

window.window_write_header = function(header){//todo refactor to same names

    $('.popup-window .header').text(header);

};

//-----------------------------

window.window_write_content = function(content){//todo refactor to same names

    $('.popup-window .content').html(content);
    uiScript();

};

//------------------------------------------------------------------window_open_content

window.window_open_content = function(header,content){

    window_write_header(header);
    window_write_content(content);

    $('.overlay').show();
    $('.popup-window').show();


    $('.popup-window .content').mousedown(function(){

        $('body').enableSelection();
    });
    $('body').enableSelection();

    window_opened=true;

};

//------------------------------------------------------------------window_close

window.window_close = function(){

    //todo sounds ion.sound.play("door_bump");

    $('.overlay').hide();
    $('.popup-window').hide();

    $('body').disableSelection();

    if(is(window_closeJS)){

        window_closeJS();
        window_closeJS=false;
    }

    window_opened=false;
};

//------------------------------------------------------------------message

window.message = function(text,type){

    //todo [PH] types of message - error, notice,...?
    //todo [PH] play sound here

    ion.sound.play("bell_ring");

    $('#message_inner').text(text);
    $('#message').show();
    $('#message').fadeOut(MESSAGE_MS);//todo UX?

};