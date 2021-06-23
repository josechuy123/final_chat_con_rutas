let connection = require("../../db/mysql");

module.exports = {

    index: (req, res) => {
        res.render('login');
    },

    auth: (req, res) => {
        let usuario  = req.body.usuario;
        let pw       = req.body.pw;
        let room     = req.body.rooms;

        //console.log(req);

        if(usuario && pw){
            connection.query('SELECT * FROM usuarios WHERE usuario = ? AND pw = ?', [usuario, pw], 
            (error, results, fields) => {
                // console.log(results[0].id);
                if(results.length > 0){
                    req.session.loggedin = true;
                    req.session.usuario = usuario;
                    req.session.usuarioId = results[0].id;
                    req.session.roomName = room;
                    // console.log(results)
                    
                    res.redirect('/home');
                }else{
                    res.send('Usuario y/o contraseña incorrectos <br><br> si no tienes una cuenta puedes <a href="/registro">registrarte aquí</a>');
                }
                res.end();
            });
        }else{
            res.send('Favor de ingresar usuario y contraseña');
            res.end();
        }
    },

    home: (req, res) => {
        if(req.session.loggedin){
            res.render('chat');
            // console.log(req.session)
        }else{
            res.send('Iniciar sesion de nuevo, gracias');
        }
    },
    
    registrar: (req, res) => {
        let email = req.body.email;
        let usuario = req.body.usuario;
        let pw = req.body.pw;
        
        if(usuario && pw && email){
            connection.query('SELECT * FROM usuarios WHERE usuario = ? OR email = ?', [usuario, email], 
            (error, results, fields) => {
                if(results.length != 0){
                    let usuariosDB = results.map( data => {
                        return data.usuario;
                    });

                    let emailsDB = results.map(data => {
                        return data.email;
                    });

                    let usuarioRepetido = '';
                    let emailRepetido = '';

                    for(let i = 0; i < results.length; i++){ //0
                        if(usuariosDB[i] == usuario && emailsDB[i] == email){ 
                            res.send(`
                                Ya existe un usuario con email <strong>${email}</strong> y con usuario <strong>${usuario}</strong>
                                <br><br> 
                                <a href='/registro'>Volver a registro</a>
                                <br><br>
                                <a href='/'>Volver a inicar sesion</a>
                            `);
                        }else{
                            if(emailsDB[i] == email){
                                console.log('email -> ' +emailsDB[i]);
                                emailRepetido = emailsDB[i];
                                break;
                            }else{
                                console.log('user -> ' +usuariosDB[i]);
                                usuarioRepetido = usuariosDB[i];
                                break;
                            }
                        }
                    }

                    if(usuarioRepetido != ''){
                        res.send(`
                            Ya existe un usuario con el usuario <strong>${usuario}</strong>
                            <br><br>  
                            <a href='/registro'>Volver a registro</a>
                            <br><br> 
                            <a href='/'>Volver a inicar sesion</a>
                        `);
                    }

                    if(emailRepetido != ''){
                        res.send(`
                            Ya existe un usuario con el email <strong>${email}</strong>
                            <br><br> 
                            <a href='/registro'>Volver a registro</a>
                            <br><br> 
                            <a href='/'>Volver a inicar sesion</a>
                        `);
                    }

                }else{
                    connection.query('INSERT INTO usuarios (usuario, pw, email) VALUES (?,?,?)',[usuario, pw, email],
                    (err, rows, fiel) => {
                        if(err){
                            res.send(
                                `Error al registrar 
                                <br><br> 
                                <a href='/registro'>Volver a registro</a>
                                <br><br>
                                <a href='/'>Volver a inicar sesion</a>
                                `);
                        }else{
                            res.send(
                                `Usuario registrado
                                <a href='/'>Inicar sesion</a>
                            `);
                        } 
                    });
                }
                // res.end();
            });

        }else{
            res.send('Favor de ingresar usuario y contraseña');
            res.end();
        }
    }

}