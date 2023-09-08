$(document).ready(function() {
    
    $.fn.morpion = function(options = {}) {
        
        options = $.extend({}, { replayButton: '#replay' }, options);

      
        const self = this;

        
        const rows = $(this).find('.row');

       
        const cells = $(this).find('.cell');

       
        const winnerDisplay = $(this).find('.win-display');

    //    const winplusplus1 =document.getElementById("#playerOne");
        
    //    const winplusplus2 =document.getElementById("#playerTwo");
        const replay = $(options.replayButton);

       
        let currentPlayer = 1;

        
        $(rows).each(function(y, row) {
           
            $(row)
                .find('.cell')
                .each(function(x, cell) {
                   
                    $(cell).data('y', y);
                    $(cell).data('x', x);
                });
        });

       
        $(replay).click(function() {
            $(cells).each(function(_, cell) {
               
                $(cell).removeData('player');
                $(cell).text('');
            });

            
            $(self).removeClass('won');
        });

        
        function checkLine(x, y, dx, dy) {
            let current = null;

            for (let i = 0; i < 3; i++) {
                
                const cell = cells[y * 3 + x];

                if (current === null) {
                
                    current = $(cell).data('player');
                }

                if ($(cell).data('player') !== current) {
                    return null;
                }

               
                x += dx;
                y += dy;
            }

            
            return current;
        }

      
        function checkWin(cell) {
            
            const x = $(cell).data('x');
            const y = $(cell).data('y');

            
            const result =
                checkLine(x, 0, 0, 1) ||
                checkLine(0, y, 1, 0) ||
                checkLine(0, 0, 1, 1) ||
                checkLine(2, 0, -1, 1);

          
            if (result) {
                
                $(winnerDisplay).text(`Joueur ${result} Winner`);
                $(self).addClass('won');
            }
            if (result==1){
                const num= 0;
                winplusplus1.innerHTML= num++;
            }
            if (result==2){
                const num2= 0;
                winplusplus2.innerHTML= num2++;
            }
            return result;
        }

        function checkFull() {
            for (let i = 0; i < $(cells).length; i++) {
               
                if (!$(cells[i]).data('player')) return false;
            }

            return true;
        }

        // function isWinner(){
        //     var winnerColumn = checkWin();
        //     var winnerRow = checkLine();
            
        //     var winner = false;
        //     if(winnerColumn){
        //         winner = winnerColumn;
        //         }else if(winnerRow){
        //             winner = winnerRow;
        //             }
        //      if(winner == "1")scoreP1++;
        //      if(winner == "2")scoreP2++;         
        //      return winner
        // }

        
        $(cells).click(function() {
            
            if ($(this).data('player')) return;

           
            $(this).text(currentPlayer === 1 ? 'X' : 'O');
            $(this).data('player', currentPlayer);

           
            currentPlayer = currentPlayer === 1 ? 2 : 1;

           
            if (!checkWin(this) && checkFull()) {
                
                $(winnerDisplay).text('Match nul');
                $(self).addClass('won');
            }
        });
    };

    $('#grid').morpion({ replayButton: '#replay' });
});