$(document).ready(function() {
   game.init();
});


var board = {
    gameBord : [],
    init : function()
    {
        this.ClearBord();
        this.AddTurnText();
        this.createbord();
        this.renderBord();
    },
    AddTurnText : function()
    {
        $("#bord-container").append("<div class='turn-text'>its your turn X</div>")
    },
    ClearBord : function()
    {
        $("#bord-container").empty();
        this.gameBord = [];
    },
    createbord  : function()
    {
        for(var i=0; i< 3; i++)
        {
            this.gameBord.push(["","",""]);
        }
    },
    renderBord : function()
    {
        $("#bord-container").append("<table class='bord'></table>")
        for(var i=0; i<=this.gameBord.length-1; i++)
        {
            $(".bord").append("<tr class='bord-row" +  i + "'></tr>");

            for(var j=0; j<=this.gameBord.length-1; j++)
            {
                $(".bord-row" + i).append("<td class='bord-td'" + "data-row='" + i + "'data-col='" + j +  "'>" + "" + "</td>")
            }

        }
    },
    AddSymbol : function(td, symbol)
    {
        td.text(symbol);
        this.gameBord[td.data("row")] [td.data("col")] = symbol;
    },
    CheckSpaceEmpty :  function(td)
    {
        return this.gameBord[td.data("row")] [td.data("col")] == ""
    },
    CheckBordFull : function()
    {
         
         for(var i=0; i<=this.gameBord.length-1; i++)
         {
             for(var j=0; j<=this.gameBord.length-1; j++)
            {
                if(this.gameBord[i][j] == "" )
                {
                    return false;   
                }
            }
         }

         return true;
    }


}


var game = {
    currUser : "X",
    gameOver : false,
    init :  function()
    {
        this.currUser = "X";
        $("#gameover-container").empty();
        this.gameOver =false;
        board.init();
        this.taketurn();
    },
    taketurn : function()
    {
        $(".bord-td").on("click", function(){
            if(game.validateMove($(this)) && !game.gameOver)
            {
                board.AddSymbol($(this), game.currUser);
             
                if(game.win(game.currUser))
                {
                    $('.turn-text').text(game.currUser + " Wins");   
                     game.gameOver =true;
                     game.Over();
                } 
                else if(game.tie())
                {
                   $('.turn-text').text("its a tie");
                   game.gameOver =true;
                   game.Over();
                }
                else
                {
                    game.currUser = game.currUser == "X" ? "O" : "X";
                    $('.turn-text').text("its your turn "  + game.currUser);   
                }

                
            }
        });
    },
    
    validateMove : function(td)
    {
        //console.log(td.data("row") + " " + td.data("col"));
        //console.log(board.CheckSpaceEmpty(td)); 
        return board.CheckSpaceEmpty(td);
    },
    win : function(symbol)
    {
        
        var gameBord = board.gameBord;
         for(var i=0; i<=gameBord.length-1; i++)
         {
                
                if( (gameBord[i][0] == symbol && gameBord[i][1] == symbol && gameBord[i][2] == symbol)  || (gameBord[0][i] == symbol  && gameBord[1][i] == symbol &&  gameBord[2][i] == symbol))
                {
                    return true;
                }
         }

         if((gameBord[0][0] == symbol && gameBord[1][1] == symbol && gameBord[2][2] == symbol)  || (gameBord[2][0] == symbol  && gameBord[1][1] == symbol &&  gameBord[0][2] == symbol))
         {
             return true;
         } 

        return false;
    },
    tie : function()
    {
       return board.CheckBordFull();
    },
    Over : function()
    {
        $("#gameover-container").append("<button class='btn-gameOver'>Play Again</button>");
        $(".btn-gameOver").on("click", function() {
             game.init();   
        });
    }
    
};
