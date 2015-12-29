/**
 * @author ©Towns.cz
 * @fileOverview Terrain changes on map.
 */
//======================================================================================================================




//----------------Změny kumulované uživatelem na mapě


var map_terrain_changes=Storage.load('map_terrain_changes','[]');


try {
    map_terrain_changes=JSON.parse(map_terrain_changes);
}
catch(err) {
    map_terrain_changes=[];
}


//======================================================================================================================