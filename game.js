const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');

// Raccoon assets on CC license, you can find graphics here:
// https://null-painter-error.itch.io/cute-raccoon-2d-game-sprite-and-animations


const img_idle = new Image();
img_idle.src = 'assets/idle.png';


let number_dec = Math.floor(Math.random()*255)+1;

const cursor = {
    x: 0,
    y: 0
}


class Character{
    
    constructor({img, pos}){
        this.img = img;
        this.pos = pos;
        this.frame = 0;
        this.maxframes = 10;
        this.state = 'idle';
    }

    draw(){
        ctx.drawImage(this.img, this.frame*165, 0, 165, 200, this.pos.x, this.pos.y, 165, 200);
        
        if(this.frame < this.maxframes) this.frame++;
        else this.frame = 0;
    }
}

const racoon = new Character({
    img: img_idle,
    pos: {
        x: 450,
        y: 485
    }
})


canvas.addEventListener('click', function(e) {

    // let game_rect = canvas.getBoundingClientRect();
    // cursor.x = e.clientX - game_rect.left;
    // cursor.y = e.clientY - game_rect.top;

    cursor.x = e.offsetX;
    cursor.y = e.offsetY;

    if (cursor.x >= 1030 && cursor.x <= 1150 && cursor.y >= 730 && cursor.y <= 780){
        number_dec = Math.floor(Math.random()*255)+1;
        showUI();
    }
});

canvas.addEventListener('mousemove', function(e) {

    cursor.x = e.offsetX;
    cursor.y = e.offsetY;

    if (cursor.x >= 1030 && cursor.x <= 1150 && cursor.y >= 730 && cursor.y <= 780){
        canvas.style.cursor = 'pointer';
    }else canvas.style.cursor = 'default';
});


function showUI(){
    
    ctx.font = "42px Arial";
    ctx.fillStyle = "#FFD38D";
    ctx.fillText("Liczba dziesiętna do przedstawienia binarnego: " + number_dec, 30, 770);

    ctx.fillStyle = "brown";
    ctx.fillRect(1030, 730, 120, 50);
    ctx.font = "28px Arial";
    ctx.fillStyle = "#FFD38D";
    ctx.fillText("LOSUJ", 1045, 765);
}


function animate(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    showUI();

    racoon.draw();
    






    requestAnimationFrame(animate);
}

animate();
