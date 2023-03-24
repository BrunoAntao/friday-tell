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

}

const draw = () => {

    canvas.width = viewWrapper.clientWidth;
    canvas.height = viewWrapper.clientHeight;

    ctx.fillStyle = "#454545";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    State.player.y = canvas.height - State.player.size;

    ctx.fillStyle = "#000";
    ctx.fillRect(State.player.x, State.player.y, State.player.size, State.player.size);


    requestAnimationFrame(draw);

}


requestAnimationFrame(draw);