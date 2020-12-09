//游戏底层架构

//以下为1.4新增代码

// 位置函数,获取小格子顶部与大棋盘格子顶部的距离
function getPosTop(i,j){
    return 20+i*120;
}

// 位置函数,获取小格子左边与大棋盘格子左边的距离
function getPosLeft(i,j){
    return 20+j*120;
}


//以下为2.1新增代码


//当board[i][j]值为number中的一个时,根据number来修改theNumberCell的背景颜色
function getNumberBackgroundColor(number){

    switch(number){
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;  
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break; 
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }

    return "black";

}

//定义一个函数,当数组board的值为number时,根据number修改theNumberCell的字体颜色
function getNumberColor(number){
    if(number <= 4){
        return "#776e65";
    }
    return "white";
}


//2.2新增内容
//定义一个nospace函数,遍历4*4的棋盘格,判断棋盘格内是否还有空间,如果棋盘格中board[i][j]有值为0,返回一个false,表示还有空间,可以生成随机数
function nospace(board){
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
}