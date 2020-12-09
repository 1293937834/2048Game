//游戏主逻辑
var board = new Array();//底层的格子数是4*4
var score = 0;
//以上为游戏数据

// 以下为1.4新增代码

// 在文档加载完成后,运行主函数
$(document).ready(function(){
    newgame();
});

function newgame(){

    //初始化棋盘格子
    init();
    //在随机两个格子生成两个数字,分别为2或4
}

function init(){
    //初始化棋盘格,先获取每个小格子的位置
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){

            // 获取每个小格子的id值
            var gridCell = $("#grid-cell-"+i+"-"+j);

            // 通过函数来设定每个小格子的顶部与左边与大棋盘格的顶部与左边的距离
            gridCell.css("top",getPosTop(i,j));//每个小格子顶部与大棋盘格的顶部的距离
            gridCell.css("left",getPosLeft(i,j));//每个小格子左边与大棋盘格的左边的距离

        }
    }
}