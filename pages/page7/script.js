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

    blocks: [],

    score: 0,

    stage: 0,

}

const clearState = () => {

    State = {

        player: {
            x: 0,
            y: 0,
            size: 32,
            speed: 4,
        },

        keys: {},

        blocks: [],

        score: 0,

        stage: 0,

    }

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
            //Increase speed based on stage
            speed: State.stage / 10 + 1
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

    //Set stage value based on score
    State.stage = Math.floor(State.score / 10);

    //Draw blocks
    for (const block of State.blocks) {

        block.y += block.speed;

        let removed = false;

        //Check if block collides with player
        if (
            block.x < State.player.x + State.player.size &&
            block.x + block.size > State.player.x &&
            block.y < State.player.y + State.player.size &&
            block.size + block.y > State.player.y
        ) {

            removed = true;
            State.blocks.splice(State.blocks.indexOf(block), 1);
            State.score++;

        }

        //Add lose condition
        if (
            block.y > canvas.height
        ) {

            clearState();

        }

        if (!removed) {

            ctx.fillStyle = "#f5f505";
            ctx.fillRect(block.x, block.y, block.size, block.size);

        }

    }

    State.player.y = canvas.height - State.player.size;

    ctx.fillStyle = "#000";
    ctx.fillRect(State.player.x, State.player.y, State.player.size, State.player.size);

    ctx.fillStyle = "#fff";
    ctx.font = "30px Arial";

    const scoreLabel = `Score: ${State.score}`;
    ctx.fillText(scoreLabel, 0,
        ctx.measureText(scoreLabel).fontBoundingBoxAscent);

    const stageLabel = `Stage: ${State.stage}`;
    ctx.fillText(stageLabel, 0,
        ctx.measureText(stageLabel).fontBoundingBoxAscent * 2);

    requestAnimationFrame(draw);

}


requestAnimationFrame(draw);