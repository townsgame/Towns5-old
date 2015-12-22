
//todo header

pages.storyread={"header": 'Příběh'};


//======================================================================================================================

pages.storyread.openJS = function(){


    var i = id2i(map_object_changes,map_selected_ids[0]);//todo maybe refactor array map_selected_ids[0] to map_selected_id
    r(map_selected_ids,i);


    var content=map_object_changes[i].content.data;

    content = markdown.toHTML(content);



    content+=[
        '<hr>' +
        '<a class="js-popup-window-open" content="storywrite" href="#">Upravit</a>' +
        '<br>' +
        '<a onclick="deleteStory('+map_selected_ids[0]+')" href="#">Smazat</a>'
    ].join('');

    window_write_header(map_object_changes[i].name);
    window_write_content(content);



};

//======================================================================================================================

pages.storyread.closeJS = function(){

    map_selected_ids=[];
    loadMap();

};

//======================================================================================================================



function deleteStory(id){

    if(confirm('Opracdu smazat???')){//todo create better confirm //todo use locale

        dismantle(id);
        loadMapAsync();
        window_close();

    }

}




