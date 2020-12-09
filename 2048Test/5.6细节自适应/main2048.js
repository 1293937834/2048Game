//游戏主逻辑
var board = new Array();//底层的格子数是4*4
var score = 0;
//4.3更新内容
var hasConflicted = new Array();//该变量是用来判断每个小格子间是否有发生过碰撞,默认为false,碰撞过为true
//以上为游戏数据


//5.5更新
// 以下为1.4新增代码

// 在文档加载完成后,运行主函数
$(document).ready(function(){
    //5.5更新
    prepareForMobile();//移动端的初始化
    newgame();
});


// 5.5更新
function prepareForMobile(){
    //5.6更新
    if(documentWidth > 500){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius', 0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius', 0.02*cellSideLength);
}

function newgame(){

    //初始化棋盘格子
    init();
     
    //2.2新增
    //在随机两个格子生成两个数字,分别为2或4
    generateOneNumber();
    generateOneNumber();
 

    

   
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


    //以下为2.1新增内容

    //创建一个二维数组
    for(var i = 0; i < 4; i++){

        board[i] = new Array();
        //4.3更新内容
        hasConflicted[i] = new Array();//二维数组

        //将每个数组的值都初始化,都设置为0
        for(var j = 0; j < 4; j++){
            board[i][j] = 0;
            //4.3更新内容
            hasConflicted[i][j] = false;
        }
    }

    //当数组里的值发生变化时,通知前端,并让前端内容发生变化

    updateBoardView();
    //4.2新增
    score = 0;
    showScore(score);
    
    
}

function updateBoardView(){

    $(".number-cell").remove();

    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){

            //将每一个number-cell都添加进grid-container中
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            
            //定义变量theNumberCell,用来接收已选择的当前的number-cell,便于操作
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            
            // 5.5更新
            if(board[i][j] == 0){
                //当数组值为0时,设置其在grid-cell中居中且不可见
                // theNumberCell.css("border","1px","black","solid");
                theNumberCell.css("width","0px");
                theNumberCell.css("height","0px");
                theNumberCell.css("top",getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css("left",getPosLeft(i,j)+cellSideLength/2);
            }
            //5.5更新
            else{
                //当数组值不为0时,设置其在grid-cell显示且覆盖grid-cell
                theNumberCell.css("width",cellSideLength);
                theNumberCell.css("height",cellSideLength);
                theNumberCell.css("top",getPosTop(i,j));
                theNumberCell.css("left",getPosLeft(i,j));

                //当数组不为0且值不一样时,此时theNumberCell中的背景色和字体颜色均发生变化
                theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color",getNumberColor(board[i][j]));

                //显示出board[i][j]的值
                theNumberCell.text(board[i][j]);

            }
            //4.3更新内容
            hasConflicted[i][j] = false;//每次格子的颜色和值变化后,都要将该变量重新变为false.
        }
    }
    // 5.5更新
    $(".number-cell").css("line-height",cellSideLength+"px");
    $(".number-cell").css("font-size",0.6*cellSideLength+"px");
}


//2.2新增内容
function generateOneNumber(){
    //先判断棋盘格子里面是否还有空间能生成数字

    //定义函数nospace,将board变量放入,如果没有空间的话,返回一个false,并无法再生成随机数
    if(nospace(board)){
        return false;
    }
    else{
        
        
    
    
        //在其他情况下,均为true,代表能生成随机数
        

        //随机一个位置,位置在[0,0]~[3,3]之间
        //Math的random函数将会生成一个0~1的随机数,将其*4,将生成(0,4)的随机数
        //Math.floor函数将值向下取整:即randx<=randx, 与ceil相反
        //因为randx是坐标,所以必须将值类型转换为整形int
            var randx = parseInt (Math.floor(Math.random() * 4));
            var randy = parseInt (Math.floor(Math.random() * 4));


        
            //4.4更新内容
            var times = 0; //times代表随机坐标生成的次数
            //此时生成的randx和randy还需要判断棋盘格原先的randx和randy是否已存在数值
            while(times < 50){
                if(board[randx][randy] == 0){
                    
                    break; //如果判断board坐标的值未被占用,则跳出循环,代表该坐标可以使用
                }
                //若生成的坐标已经被占用,则重新再次生成坐标,并继续判断该坐标是否被占用
                randx = parseInt (Math.floor(Math.random() * 4));
                randy = parseInt (Math.floor(Math.random() * 4));

                times++;
            }
            //如果经过50次的随机坐标生成,都没有找到该空格子,则手动生成随机数
            if(times == 50){
                for(var i = 0; i < 4; i++){
                    for(var j = 0; j < 4; j++){
                        if(board[i][j] == 0){
                            randx = i;
                            randy = j;
                        }
                    }
                }
            }



        //随机一个数字,数字为2或者4

        var randNumber = Math.random() < 0.5 ? 2 : 4;//三元运算符在各个语言中基本都有，使用格式基本都是：条件表达式？表达式1：表达式2。
        
        

        //最后在随机位置上显示随机数
        //让board坐标轴的值等于randNumer
        board[randx][randy] = randNumber;

        //通过动画的形式显示出随机位置中的随机数
        showNumberWithAnimation(randx,randy,randNumber);

        
    }
    

}

//3.2新增内容
$(document).keydown(function(event){
    switch(event.keyCode){
        case 37: //按下left键
            if(moveLeft()){ //判断当前的棋盘小格子是否能向左移动
                setTimeout("generateOneNumber()",300);//如果可以移动,就生成一个新的随机数
                setTimeout("isgameover()",330) ;//判断游戏是否结束
            }
            break;
        case 38: //up
            if(moveUp()){ //判断当前的棋盘小格子是否能向上移动
                setTimeout("generateOneNumber()",300);//如果可以移动,就生成一个新的随机数
                setTimeout("isgameover()",330) ;//判断游戏是否结束
            }
            break
        case 40: //down
            if(moveDown()){ //判断当前的棋盘小格子是否能向下移动
                setTimeout("generateOneNumber()",300);//如果可以移动,就生成一个新的随机数
                setTimeout("isgameover()",330) ;//判断游戏是否结束
            }
            break;
        case 39: //right
            if(moveRight()){ //判断当前的棋盘小格子是否能向右移动
                setTimeout("generateOneNumber()",300);//如果可以移动,就生成一个新的随机数
                setTimeout("isgameover()",330) ;//判断游戏是否结束
            }
            break;
          
    }
})

//3.4新增内容
function isgameover(){

    //4.1更新内容
    if(nospace(board) && noMove(board)){

        gameOver();

    }

        

}

//4.1更新内容
function gameOver(){

    alert("游戏结束!");
}


//3.3新增内容:

function moveLeft(){
    //判断格子是否能向左移动
    if(!canmoveLeft(board)){
        return false;
    }

        
    for(var i = 0; i < 4; i++){
        for( var j = 1; j < 4; j++){
            if(board[i][j] != 0){ //判断该格子上的值是否存在,存在则可能可以向左移动
                for(var k = 0; k < j; k++){ //k为小于j列的k列,用来判断该格子j列前的所有列上的值是否为空,如果为空则可能可移动


                    //当落脚点位置的值为0,且在落脚点位置到待判断格子之间无障碍物(坐标上的值均为0)
                    //noBlockHorizontal 用来判断落脚点至待判断格子之间的坐标值均为0,其中i是行,k是小于j的列,k列~j列之间用来判断是否存在障碍
    
                    if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){

                        //移动动画
                        showMoveAnimation(i,j,i,k);
                        
                        //移动
                        board[i][k] = board[i][j]; //此处曾错误写为 board[i][k] == board[i][j]导致当格子移动后消失
                        board[i][j] = 0;
                        //满足条件,向左移动该格子,并跳出此次循环,不执行下列条件
                        continue;

                    }
                    //如果i行k列的值与i行j列的值相等,且k-j列间无障碍,则可移动合并该格子
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                        //满足条件,则可向左移动格子,并叠加两个格子的值

                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];

                        board[i][j] = 0;
                        //4.2新增
                        //分数叠加
                        score += board[i][k];
                        // debugger;
                        // console.log(score);
                        showScore(score);
                        // 4.3更新
                        hasConflicted[i][k] = true;//当[i][k]处已发生一次碰撞,则设值为true,表示该处不能再发生碰撞
                        continue;
                        
                    }

                }
                
            }

        }
    }

    setTimeout("updateBoardView()",200);
    return true;

}
//3.5更新内容
function moveRight(){

    // 如果可以移动,返回一个true 然后!true = false,则不进入 if语句,代表可以移动
    // 如果不可以移动,则返回一个false,然后!false = true, 则进入判断, 返回一个false,不执行下列的语句,代表不能移动
    if(!canMoveRight(board)){ //该语句是判断格子是否能向右移动,如果能,则返回false,不进入,如果不能移动,则返回一个true,进入判断后返回false,不执行下列语句
        return false;
    }
    for(var i = 0; i < 4; i++){
        for(var j = 2; j >= 0; j--){
            if(board[i][j] != 0){
                for(var k = 3; k > j; k--){
                    if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board) ){

                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];

                        
                        board[i][j] = 0;

                        //4.2新增
                        //分数叠加
                        score += board[i][k];
                        showScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    


    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(var j = 0; j < 4; j++){
        for(var i = 1; i < 4; i++){
            if(board[i][j] != 0){
                for(var k = 0; k < i; k++){
                    if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        
                        board[i][j] = 0;

                        //4.2新增
                        //分数叠加
                        score += board[k][j];
                        showScore(score);
                        hasConflicted[k][j] = true;
                        continue;

                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }

    for(var j = 0; j < 4; j++){
        for(var i = 2; i >= 0; i--){
            if(board[i][j] != 0){
                for(var k = 3; k > i; k--){
                    if(board[k][j] == 0 && noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //4.2新增
                        //分数叠加
                        score += board[k][j];
                        showScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }


    setTimeout("updateBoardView()",200);
    return true;

}

