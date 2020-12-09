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