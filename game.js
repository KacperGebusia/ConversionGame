const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');

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

    console.log(cursor);
});


