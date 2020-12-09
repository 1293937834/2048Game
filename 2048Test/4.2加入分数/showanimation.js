//动画效果js 

//2.3更新内容

function showNumberWithAnimation(i,j,randNumber){

    var numberCell = $("#number-cell-"+i+"-"+j);
    
    numberCell.css("background-color",getNumberBackgroundColor(randNumber));
    numberCell.css("color",getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)



    },50);

}

function showMoveAnimation(fromx,fromy,tox,toy){

    var numberCell = $('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200)
}

//4.2新增

function showScore(score){
    $("#score").text(score);
}