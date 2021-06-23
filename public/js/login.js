$(document).ready(function(){
    let socket = io('http://localhost:3000');
    
    socket.emit('getSalas');

    socket.on('salas', (data) => {
        $.each(data, (id, val) => {
            $('#rooms').append($('<option>', {
                value: data[id].nombre_sala,
                text: data[id].nombre_sala,
                id: data[id].id
            }));
        });
    });
})