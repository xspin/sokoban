function createArray(m, n)
{
    var array = new Array(m);
    for(var i=0; i<m; i++)
    {
        array[i] = new Array(n);
    }
    return array;
}
//var BGD = createArray(14, 18);
var STAGE;// = createArray(14, 18);
var PUSHER;
var steps = 0;
//var stage = 1;
function start(stageNum)
{
    STAGE = init(STAGE, 14, 18);
    PUSHER = setStage(STAGE, stageNum);
    var s = document.getElementById("steps");
    s.innerHTML = "STEPS: 0";
    document.getElementById("stage").value = stageNum;
}
function jump(ch)
{
    var s = document.getElementById("stage").value;
    if(ch == "previous")
    {
        s--;
    }
    else if(ch == "next")
    {
        s++;
        document.getElementById("pass").style.display="none";
    }
    else if(ch == "random")
    {
        s = Math.floor(Math.random()*103+1);
    }
    else if(!isNaN(ch))
    {
        s = s==0 ? ch : 0;
    }
    if(s<0 || s>103 || isNaN(s))
    {
        alert("Input Error!!!");
        s=0;
    }
    start(s);
    steps=0;
    if (document.all) 
    { 
        alert("不支持IE浏览器！ T_T");
    }
}
keyListen();
start(0);
