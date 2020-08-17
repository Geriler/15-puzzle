let game_container = document.getElementById('game-container');
let game = new Game(4);
game.start();
draw(game.getButtons());

function draw(buttons) {
    let field = '';
    for (var x = 0; x < buttons.length; x++) {
        field += '<div class="row">';
        for (var y = 0; y < buttons[x].length; y++) {
            field += '<div class="button" onclick="moved(' + x + ', ' + y + ')">';
            if (buttons[x][y] !== undefined) {
                field += buttons[x][y];
            }
            field += '</div>';
        }
        field += '</div>';
    }
    game_container.innerHTML = field;
}

function moved(x, y) {
    let buttons = game.moved(x, y);
    if (game.isSolve()) {
        let solve = '<div class="solve">Congratulations! You have solved this puzzle!</div>';
        game_container.innerHTML = solve;
    } else {
        draw(buttons);
    }
}
