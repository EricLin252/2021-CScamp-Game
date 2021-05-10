function center_to_topleft(center, size){
    return {x: center.x - size.w/2, y: center.y - size.h/2};
}

function topleft_to_center(topleft, size){
    return {x: topleft.x + size.w/2, y: topleft.y + size.h/2};
}

function get_landscape(center){
    var x = Math.round(center.x);
    var y = Math.round(center.y);
    var count = 0;
    for(var i = 0; i < landscape[y].length; i++){
        count += landscape[y][i][1];
        if(count >= x) return landscape[y][i][0];
    }
}