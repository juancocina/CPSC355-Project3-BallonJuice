class PathManager {
    constructor(cellSize, width, height, balloon) {
        this.cellSize = cellSize;
        this.numRow = height;
        this.numCols = width;
        this.width = this.cellSize * width;
        this.height = this.cellSize * height;
        this.isPaused = false;
        this.balloon = balloon;

        this.balloonArray = [];
        this.balloonArray.push(this.balloon);
        this.counter = 0;
    }

    isFinished() { // check if algorithm is finished.
        return (this.path.isJuice);
    }

    pause() { //pauses program
        this.isPaused = true;
    }

    unpause() { // unpauses program
        this.isPaused = false;
    }

    isCompleted() { //once the balloon juice is found
        return this.path.isJuice == true;
    }

    setUp() { // clears the canvas and redraws
        this.path = new GeneratePaths(this.balloon, this.balloonArray);

        // reset canvas and current rows (we don't reset to the 0th row bc it gets clipped out so start @ 1.
        background(255);

    }

    draw() {
        if (this.isCompleted()) { // Algorithms have run 15 times and the inputString has rotated back to its original string.
            this.pause(); // So pause the program to stop it.
            this.path.done();
        }
        else {
            if (!this.path.isJuice) {
                //console.log(this.counter);
                //console.log(this.balloonArray[this.counter]);
                this.path.run(this.balloonArray[this.counter]);
                this.counter++;
                //console.log(this.balloonArray);
            }
        }
    }
}
