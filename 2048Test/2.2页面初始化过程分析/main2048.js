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

        //将每个数组的值都初始化,都设置为0
        for(var j = 0; j < 4; j++){
            board[i][j] = 0;
        }
    }

    //当数组里的值发生变化时,通知前端,并让前端内容发生变化
    updateBoardView();
}

function updateBoardView(){

    $(".number-cell").remove();

    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){

            //将每一个number-cell都添加进grid-container中
            
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');

            //定义变量theNumberCell,用来接收已选择的当前的number-cell,便于操作
            var theNumberCell = $("#number-cell-"+i+"-"+j);
            

            if(board[i][j] == 0){
                //当数组值为0时,设置其在grid-cell中居中且不可见
                theNumberCell.css("width","0px");
                theNumberCell.css("height","0px");
                theNumberCell.css("top",getPosTop(i,j)+50);
                theNumberCell.css("left",getPosLeft(i,j)+50);
            }
            else{
                //当数组值不为0时,设置其在grid-cell显示且覆盖grid-cell
                theNumberCell.css("width","100px");
                theNumberCell.css("height","100px");
                theNumberCell.css("top",getPosTop(i,j));
                theNumberCell.css("left",getPosLeft(i,j));

                //当数组不为0且值不一样时,此时theNumberCell中的背景色和字体颜色均发生变化
                theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color",getNumberColor(board[i][j]));

                //显示出board[i][j]的值
                theNumberCell.text(board[i][j]);

            }

        }
    }
}


//2.2新增内容
function generateOneNumber(){
    //先判断棋盘格子里面是否还有空间能生成数字

    //定义函数nospace,将board变量放入,如果没有空间的话,返回一个false,并无法再生成随机数
    if(nospace(board)){
        return false;
    }
    在其他情况下,均为true,代表能生成随机数
    

    //随机一个位置,位置在[0,0]~[3,3]之间
    //Math的random函数将会生成一个0~1的随机数,将其*4,将生成0~4的随机数
    //Math.floor函数将值向下取整:即randx<=randx, 与ceil相反
    //因为randx是坐标,所以必须将值类型转换为整形int
    var randx = parseInt (Math.floor(Math.random() * 4));
    var randy = parseInt (Math.floor(Math.random() * 4));


    //此时生成的randx和randy还需要判断棋盘格原先的randx和randy已被占用
    while(true){
        if(board[randx][randy] == 0){
            break; //如果判断board坐标的值确实未被占用,则跳出循环,代表该坐标可以使用
        }
        //若生成的坐标已经被占用,则重新再次生成坐标,并继续判断该坐标是否被占用
        randx = parseInt (Math.floor(Math.random() * 4));
        randy = parseInt (Math.floor(Math.random() * 4));
    }



    //随机一个数字,数字为2或者4

    var randNumber = Math.random() <0.5 ? 2: 4;
    
    

    //最后在随机位置上显示随机数
    //让board坐标轴的值等于randNumer
    board[randx][randy] = randNumber;

    //通过动画的形式显示出随机位置中的随机数
    showNumberWithAnimation(randx,randy,randNumber);

    //return true后,后面的代码将不会再执行,应放在末尾处
    return true;

}

