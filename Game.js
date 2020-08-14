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
        this.shuffle(this.buttons);
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

                var temp = arr[y][x];
                arr[y][x] = arr[y1][x1];
                arr[y1][x1] = temp;
            }
        }
    }
}

module.exports = Game;
