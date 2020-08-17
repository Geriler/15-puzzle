class Game {
    static size;
    static buttons;
    static solve;

    constructor(size) {
        this.size = size;
        this.buttons = Array.from(Array(this.size), () => new Array(this.size));
        this.solve = Array.from(Array(this.size), () => new Array(this.size));
    }

    start() {
        this.create(this.buttons);
        this.create(this.solve);
        do {
            this.shuffle(this.buttons);
        } while (!this.checkSolved);
    }

    create(arr) {
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                if (this.size * this.size !== (y * this.size + x) + 1) {
                    arr[y][x] = (y * this.size + x) + 1
                }
            }
        }
    }

    shuffle(arr) {
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                var x1 = Math.floor(Math.random() * (this.size));
                var y1 = Math.floor(Math.random() * (this.size));

                var temp = arr[x][y];
                arr[x][y] = arr[x1][y1];
                arr[x1][y1] = temp;
            }
        }
    }

    getButtons() {
        return this.buttons;
    }

    moved(x, y) {
        if (y >= 0 && y < this.size && x >= 0 && x < this.size && this.canMoved(x, y)) {
            let emptyCoords = this.getCoordsEmptyElement();
            let coords = {'x': x, 'y': y};
            this.buttons[emptyCoords.x][emptyCoords.y] = this.buttons[coords.x][coords.y];
            this.buttons[coords.x][coords.y] = undefined;
        }
        return this.getButtons();
    }

    canMoved(x, y) {
        let coords = this.getCoordsEmptyElement();
        if ((x === coords.x && ((y + 1) === coords.y || (y - 1) === coords.y))
            || y === coords.y && ((x + 1) === coords.x || (x - 1) === coords.x)) {
            return true;
        }
        return false;
    }

    getCoordsEmptyElement() {
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                if (this.buttons[x][y] === undefined) {
                    return {'x': x, 'y': y};
                }
            }
        }
    }

    isSolve() {
        return (JSON.stringify(this.buttons) === JSON.stringify(this.solve));
    }

    checkSolved() {
        let array = [];
        let coef = 0;
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                if (this.buttons[x][y] !== undefined) {
                    let count = this.buttons[x][y] - 1;
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] !== undefined) {
                            if (this.buttons[x][y] > array[i].num) {
                                count--;
                            }
                        }
                    }
                    array[(x * this.size + y)] = {'num': this.buttons[x][y], 'count': count};
                }
            }
        }
        for (var i = 0; i < array.length; i++) {
            if (array[i] !== undefined) {
                coef += array[i].count;
            }
        }
        coef += this.getCoordsEmptyElement().x + 1;
        return !(coef % 2);
    }
}
