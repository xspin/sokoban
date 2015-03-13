function init(old, m, n)
{
    var elem = new Array();
    var box = document.getElementById("gameBox");
    //box.style.backgroundImage = 'url("../img/bg4.jpg")';
    //box.style.display = "none";
    for(var i=0; i<m; i++)
    {
        var row = new Array();
        var y = 5+i*36;
        for(var j=0; j<n; j++)
        {
            if(old != undefined)
                old[i][j].img.style.display = "none";
                //alert("ff");
            var x = 5+j*36;
            var img = new Image();
            img.src = getImage("outer");
            img.style.position = "absolute";
            img.style.left = x + 'px';
            img.style.width = '36px';
            img.style.height = '36px';
            img.style.top = y + 'px';
            row.push({img:img, v:"outer"});
            box.appendChild(img);
        }
        elem.push(row);
    }
    return elem;
}

function setStage(stage, s)
{
    var pos_pusher = {i:0, j:0};
    if(s<1) return pos_pusher;
    var map = getMap(s);
    for(var i=0; i<map.length; i++)
    {
        for(var j=0; j<map[i].length; j++)
        {
            var v = mapConvert(map[i][j]);
            stage[i][j].img.src = getImage(v);
            if(v == "pusher")
            {
                pos_pusher.i = i;
                pos_pusher.j = j;
            }
            stage[i][j].v = v;
        }
    }
    return pos_pusher;
}
//alert("create finish");
