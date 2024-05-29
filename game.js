const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');

// Raccoon assets on CC license, you can find graphics here:
// https://null-painter-error.itch.io/cute-raccoon-2d-game-sprite-and-animations

const img_back = new Image();
img_back.src = 'assets/background.png';

const img_idle = new Image();
img_idle.src = 'assets/idle.png';

const img_walk_r = new Image();
img_walk_r.src = 'assets/walk_r.png';

const img_walk_l = new Image();
img_walk_l.src = 'assets/walk_l.png';

const img_on = new Image();
img_on.src = 'assets/on.png';

const img_off = new Image();
img_off.src = 'assets/off.png';


let number_dec = Math.floor(Math.random()*255)+1;

const cursor = {
    x: 0,
    y: 0
}

const key = {
    a: {pressed: false},
    d: {pressed: false},
    w: {pressed: false}
}

let current_key = '';


class Character{
    
    constructor({img, pos}){
        this.img = img;
        this.pos = pos;
        this.frame = 0;
        this.maxframes = 10;
        this.state = 'idle';
        this.velocity = 0;
        this.weight = 1;
        this.switched = false;
    }

    isStanding(){
        return this.pos.y >= 485;
    }

    jump(){
        if(key.w.pressed && this.isStanding()) this.velocity = -19;

        this.pos.y += this.velocity;

        if(!this.isStanding()){
            this.velocity += this.weight;
            this.switchButton();
        }
        else{
            this.velocity = 0;
            this.state = 'idle';
            this.switched = false;
        }

    }

    switchButton(){
        for(let i = 0; i < 8; i++){
            let start = i * 150;
            let end = i * 150 + 150;

            if(this.pos.x + 80 >= start && this.pos.x + 80 <= end && this.pos.y <= 300 && !this.switched){
                if(buttons[i].value == 0){
                    buttons[i].value = 1;
                    buttons[i].img = img_on;
                }
                else{
                    buttons[i].value = 0;
                    buttons[i].img = img_off;
                }
                this.switched = true;
            }
            
        }

    }

    draw(){
        ctx.drawImage(this.img, this.frame*165, 0, 165, 200, this.pos.x, this.pos.y, 165, 200);

        if(key.d.pressed && current_key == 'd') {
            this.pos.x += 8;
            if(this.pos.x >= 1035) this.pos.x = 1035;
            racoon.state = 'walk_r';
        }
        if(key.a.pressed && current_key == 'a') {
            this.pos.x -= 8;
            if(this.pos.x <= 0) this.pos.x = 0;
            racoon.state = 'walk_l';
        }
        if(key.w.pressed && current_key == 'w') {
            racoon.state = 'jump';
        }

        if(this.state == 'idle') this.img = img_idle;
        if(this.state == 'walk_r') this.img = img_walk_r;
        if(this.state == 'walk_l') this.img = img_walk_l;
        
        if(this.frame < this.maxframes) this.frame++;
        else this.frame = 0;

        this.jump();
    }
}

class Button{

    constructor({img, pos, nr}){
        this.img = img;
        this.pos = pos;
        this.nr = nr;
        this.value = 0;
    }

    draw(){
        ctx.drawImage(this.img, this.nr*150, 110);
    }

}


const racoon = new Character({
    img: img_idle,
    pos: {
        x: 450,
        y: 485
    }
})

let buttons = [];

for(let i = 0; i < 8; i++){
    buttons.push(
        new Button({
            img: img_off,
            pos: { x: 150, y: 0 },
            nr: i
        })
    )
}


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

window.addEventListener('keydown', function(e) {

    if(e.key == 'a' || e.key == 'ArrowLeft'){
        key.a.pressed = true;
        current_key = 'a';
    }

    if(e.key == 'd' || e.key == 'ArrowRight'){
        key.d.pressed = true;
        current_key = 'd';
    }

    if(e.key == 'w' || e.key == 'ArrowUp' || e.key == ' '){
        key.w.pressed = true;
        current_key = 'w';
    }

});

window.addEventListener('keyup', function(e) {

    if(e.key == 'a' || e.key == 'ArrowLeft'){
        key.a.pressed = false;
        racoon.state = 'idle';
    }

    if(e.key == 'd' || e.key == 'ArrowRight'){
        key.d.pressed = false;
        racoon.state = 'idle';
    }

    if(e.key == 'w' || e.key == 'ArrowUp' || e.key == ' '){
        key.w.pressed = false;
        racoon.state = 'idle';
    }

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

    ctx.drawImage(img_back, 0, 0);

    showUI();

    for(let i = 0; i < 8; i++){
        buttons[i].draw();
    }

    racoon.draw();
    






    requestAnimationFrame(animate);
}

animate();
