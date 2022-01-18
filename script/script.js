$(document).ready(function(){
    
    $("#startbtn").click(function(){
        $("#beforegame").fadeOut(700,function(){ //콜백함수
            countdown.start();
            $("#stage").fadeIn(200);
            initstg();
            $("#score").css("display","block");
        });
    })
    
    $("#startbtn, #replay").mousedown(function(){$(this).addClass("active-btn");})
    $("#startbtn, #replay").mouseup(function(){$(this).removeClass("active-btn");})
    $("#startbtn, #replay").mouseleave(function(){$(this).removeClass("active-btn");})
    
    var totalscore = 0;
    var totalstg = 30; // 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 
    var curstg = 0;
    var term = 6;
    var mafia;
    // var timer;
            
    function rand(min,max){
        var result = Math.floor(Math.random()*(max-min+1)+min);
        return result;
    }
    
    function initstg(){

        $("#btnbox").hide(0);
        curstg++;
        // $("#title").text(curstg + "번째 스테이지");
        var col;
        if(curstg <= totalstg){
            //카운트다운
            // timer = setTimeout(initstg,3000);
            
            //새 판 짜기
            col = Math.ceil(curstg/term) + 2;
            mafia = rand(0, col*col-1);

            // 새로운 스테이지를 시작하면
            // => 일단 그 전 스테이지 때 만들어진 block들을 지운다.
            // => 안그러면 그 아래로 쌓일테니까
            $("#stage").empty();
            for(i=0 ; i<col*col ; i++){
                $("#stage").append("<div class='block'></div>");
                if(i == mafia){
                    // #stage .block:last-of-type
                    // => mafia가 만들어질 당시 block의 가장 마지막번쨰는 mafia 자신이다.
                    $("#stage .block:last-of-type").addClass("mafia");
                }
            }
            var r = rand(0,255);
            var g = rand(0,255);
            var b = rand(0,255);
            
            var mr = r+(rand(-1,1)*(31-curstg));
            var mg = g+(rand(-1,1)*(31-curstg));
            var mb = b+(rand(-1,1)*(31-curstg));
            
            $(".block").css({
                backgroundColor: "rgb("+r+","+g+","+b+")",
            });

            $(".mafia").css({
                backgroundColor: "rgb("+mr+","+mg+","+mb+")"
            });
            
            if(curstg <= 6){
                $(".block").css({
                    margin: "8px",
                    width: "calc(100% / "+col+" - 16px)",
                    height: "calc(100% / "+col+" - 16px)",
                });
            }else if(curstg>6 && curstg<=12){
                $(".block").css({
                    margin: "7px",
                    width: "calc(100% / "+col+" - 14px)",
                    height: "calc(100% / "+col+" - 14px)",
                });
            }else if(curstg>12 && curstg<=18){
                $(".block").css({
                    margin: "6px",
                    width: "calc(100% / "+col+" - 12px)",
                    height: "calc(100% / "+col+" - 12px)",
                });
            }else if(curstg>18 && curstg<=24){
                $(".block").css({
                    margin: "4px",
                    width: "calc(100% / "+col+" - 8px)",
                    height: "calc(100% / "+col+" - 8px)",
                });
            }else if(curstg>24 && curstg<=30){
                $(".block").css({
                    margin: "3px",
                    width: "calc(100% / "+col+" - 6px)",
                    height: "calc(100% / "+col+" - 6px)",
                });
            }

        }else{
            alert("당신은 절대색감을 가지고 계시군요!");
            $("#stage").css("display","none");
            $("#afterclear").fadeIn();
            $("#btnbox").fadeIn();
            // $("#countdown").css("display","none");
            countdown.stop();
        }
    }
    
    $(document).on("click",".block",function(){
        var me = $(this).index();
        if(me == mafia){
            // clearTimeout(timer);
            totalscore++;
            $("#score").text("현재점수 : "+totalscore+"점");
            initstg();
        }
    });
    
    var countdown = $("#countdown").countdown360({
        radius      : 60,
        seconds     : 60,
        fontColor   : '#fff',
        autostart   : false,
        onComplete  : function () { 
            alert("당신의 최종 점수는 "+totalscore+" 점 입니다!");
            $("#stage").fadeOut();
            totalscore = 0;
            curstg = 0;
            $("#btnbox").delay(400).fadeIn();
        }
    });
    
    $("#replay").click(function(){
        
        totalscore = 0;
        curstg = 0;

        $("#afterclear").fadeOut();
        $("#stage").fadeIn();
        $("#score").text("");
        $("#btnbox").css("top","75%");

        initstg();

        $("#countdown").css('display','block');
        countdown.start();
    })


})