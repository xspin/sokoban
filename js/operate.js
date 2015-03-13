function keyListen()
{
    if(document.addEventListener)
    {
        document.addEventListener("keydown", keydown, false);
    }
    else if(document.attachEvent)
    {
        document.attachEvent("onkeydown", keydown);
    }
    else
    {
        document.onkeydown = keydown;
    }
}
function keydown(e)
{
    if(!e) e = event;
    var code = e.keyCode || e.which;
    var key;
    switch(code) 
    {
        case 32:
            key = 'SPACE'; break;
        case 37:
            key = 'LEFT'; break;
        case 38:
            key = 'UP'; break;
        case 39:
            key = 'RIGHT'; break;
        case 40:
            key = 'DOWN'; break;
        case 13:
            key = 'ENTER'; break;
        default:
            //Convert ASCII codes to letters
            key = String.fromCharCode(code);
    }
    push(key);
    switch(key)
    {
        case "N":
            jump("next");
            break;
        case "P":
            jump("previous");
            break;
        case "R":
            jump();
            break;
        case "M":
            jump("random");
            break;
    }
    if(win())
    {
        //alert("You Win!!! \n Next");
        var pass = document.getElementById("pass");
        pass.style.display = "inline";
        if(key == "ENTER")
            jump("next");
    }
}
//-------------------------------------
function push(direction)
{
    var dir = {
        LEFT    : [0, -1],
        UP      : [-1, 0],
        RIGHT   : [0, 1],
        DOWN    : [1, 0],
    };
    var d = dir[direction];
    if(d != undefined)
    {
        var t = {i:PUSHER.i+d[0], j:PUSHER.j+d[1]};
        var pusher = STAGE[PUSHER.i][PUSHER.j];
        var next = STAGE[t.i][t.j];
        var nnext = STAGE[t.i + d[0]][t.j + d[1]];
        //alert(next.v);
        var movable = false;
        movable = move(pusher, next, nnext, next.v);
        if(movable)
        {
            PUSHER = t;
            steps++;
            var s = document.getElementById("steps");
            s.innerHTML = "STEPS: " + steps;
        }
    }
}
function boxMove(p, n)
{
    if(n.v == "target")
    {
        n.v = "hit";
        n.img.src = getImage(n.v);
    }
    else if(n.v == "floor")
    {
        n.v = "box";
        n.img.src = getImage(n.v);
    }
    else return false;

    p.v = p.v=="hit"? "target" : "floor";
    p.img.src = getImage(p.v);
    return true;
}
function swap(p, n, nv)
{
    p.v = (p.v=="pit")? "target" : "floor";
    p.img.src = getImage(p.v);
    n.v = nv=="floor"? "pusher" : "pit";
    n.img.src = getImage(n.v);
}
function move(p, n, nn, nv)
{
    if(nv=="target" || nv=="floor")
    {
        swap(p, n, nv);
        return true;
    }
    else if(nv=="box" || nv=="hit")
    {
        if(boxMove(n, nn))
        {
            swap(p, n, n.v);
            return true;
        }
    }
    return false;
}
function win()
{
    if(PUSHER.i == 0)
        return false;
    for(var i=0; i<STAGE.length; i++)
    {
        for(var j=0; j<STAGE[i].length; j++)
        {
            var t = STAGE[i][j].v;
            if(t == "box" || t == "target")
                return false;
        }
    }
    return true;
}
//alert("op finish");
