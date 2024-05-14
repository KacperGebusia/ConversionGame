const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');


let number_dec = Math.floor(Math.random()*255)+1;

const cursor = {
    x: 0,
    y: 0
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


function showUI(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "42px Arial";
    ctx.fillStyle = "#FFD38D";
    ctx.fillText("Liczba dziesiętna do przedstawienia binarnego: " + number_dec, 30, 770);

    ctx.fillStyle = "brown";
    ctx.fillRect(1030, 730, 120, 50);
    ctx.font = "28px Arial";
    ctx.fillStyle = "#FFD38D";
    ctx.fillText("LOSUJ", 1045, 765);
}

showUI();