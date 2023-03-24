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

const draw = () => {

    canvas.width = viewWrapper.clientWidth;
    canvas.height = viewWrapper.clientHeight;

    ctx.fillStyle = "#454545";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(draw);

}


requestAnimationFrame(draw);