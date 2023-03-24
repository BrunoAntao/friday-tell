//Get div
const viewWrapper = document.querySelector('#view');
//Create canvas
const canvas = document.createElement('canvas');
//Change canvas size
canvas.style.width = "100%";
canvas.style.height = "100%";
//Add canvas to div
viewWrapper.append(canvas);
//Get context
const ctx = canvas.getContext('2d');

//Define State
let State = {

    //Define player
    player: {
        x: 0,
        y: 0,
        size: 32,
        speed: 4,
    },

    keys: {},

    blocks: []

}

//Detect keys
document.addEventListener('keydown', (e) => {

    State.keys[e.key] = true;

})

document.addEventListener('keyup', (e) => {

    State.keys[e.key] = false;

})

//Store last time a block spawned
let lastSpawn = 0;

const draw = (time) => {

    //If 1000ms (1sec) passes we had a block in a random position to State.block
    if (lastSpawn + 1000 < time) {

        const block = {
            y: 0,
            size: 16,
            speed: 1
        }

        block.x = Math.random() * (canvas.width - block.size)

        State.blocks.push(block);

        lastSpawn = time;

    }

    canvas.width = viewWrapper.clientWidth;
    canvas.height = viewWrapper.clientHeight;

    if (State.keys['ArrowLeft']) {

        State.player.x -= State.player.speed;

        if (State.player.x < 0) {
            State.player.x = 0;
        }

    }
    if (State.keys['ArrowRight']) {

        State.player.x += State.player.speed;

        if (State.player.x > canvas.width - State.player.size) {
            State.player.x = canvas.width - State.player.size;
        }

    }

    ctx.fillStyle = "#454545";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Draw blocks
    for (const block of State.blocks) {

        block.y += block.speed;

        ctx.fillStyle = "#f5f505";
        ctx.fillRect(block.x, block.y, block.size, block.size);

    }

    State.player.y = canvas.height - State.player.size;

    ctx.fillStyle = "#000";
    ctx.fillRect(State.player.x, State.player.y, State.player.size, State.player.size);


    requestAnimationFrame(draw);

}


requestAnimationFrame(draw);