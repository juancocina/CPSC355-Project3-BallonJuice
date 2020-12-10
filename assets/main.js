let g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
const g_frame_mod = 1; // Update every 'mod' frames.

let newManager;

function setup() // P5 Setup Fcn
{
    var balloon = {
      dark: 0,
      pale: 13,
      veined: 6,
      //exists: "false"
    }
    newManager = new PathManager(16, 40, 40, balloon);
    createCanvas(newManager.width, newManager.height);  // Make a P5 canvas.
    textSize(16);
    fill("black");
    newManager.setUp();
}

function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    ++g_frame_cnt;
    if (0 === g_frame_cnt % g_frame_mod)
    {
        if (!newManager.isPaused){
          newManager.draw();
        }

    }
}
