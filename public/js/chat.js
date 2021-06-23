$(document).ready(function(){
    let socket = io('http://localhost:3000');
    let room = 0;

    socket.emit('getSalas');

    socket.on('salas', (data) => {
        $.each(data, (id, val) => {
            $('#roomsCambio').append($('<option>', {
                value: data[id].nombre_sala,
                text: data[id].nombre_sala,
                id: data[id].id
            }));
        });
    });

    socket.on('logged_in', (data) => {
        $('#usernameTag').append(data.usuario);
        //console.log(data);
    })

    $('#enviarMensaje').click(() => {
        if($('#mensaje').val().length <= 0){
            alert('Escriba un mensaje');
        }else{
            let mensaje = $('#mensaje').val();
            // console.log(mensaje);
            socket.emit('mjsNuevo', mensaje);
        }
    });

    socket.on('mensaje', ({usuario, mensaje, roomId}) => {
        let nuevoMensaje = ''
        room = roomId; 
        if(usuario == 'BotChat'){
            nuevoMensaje = `<li><small><b>${usuario}</b> ${mensaje}</small></li>`
        }else{
            nuevoMensaje = `<li> <strong>${usuario}:</strong> ${mensaje} </li>`;

        }

        $('#messages').append(nuevoMensaje);
        // window.scrollTo(0, document.body.scrollHeight);
        $('#mensaje').val("");
    });

    $('#roomsCambio').change(() => {
        let roomId = room;
        roomName = $(this).find('option:selected').text();
        $('#messages').empty();
        
        socket.emit('cambioSala', {
            idSala: roomId,
            nombreSala: roomName
        })

        console.log('Cambio Select ID: ' + roomId + ' con nombre: ' + roomName);
    });

    $('.logout').click(() => {
        socket.emit('salir')
    });
})