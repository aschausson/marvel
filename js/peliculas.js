//var crypto = require('crypto');


function Voto(pelicula, usuario, email, telefono) {
    this.pelicula = pelicula
    this.usuario = usuario
    this.email = email
    this.telefono = telefono
}



function Comic(thumbnail, title, description) {
    this.thumbnail = thumbnail
    this.title = title
    this.description = description
}

var comics = []


var peliculas = []
var votos = []
var peliculaSeleccionada

$(document).ready(function () {
    /* $('#bloqueo').hide()
     $('#panelAyuda').hide()
     $('#peliculaGrande').hide()
 
     leePeliculas()
 */

leeComics()
muestraComics()

})


function leeComics(){
    var promesas = []
    promesas.push(datosComic())

    $.when.apply($, promesas).done(function () {
        var args = Array.prototype.slice.call(arguments, 0)

        for (let i = 0; i < args.length; i++) {
            var res = args[i][0]

            if (res.code === 200) {
                for (var i = 0; i < res.data.results.length; i++) {
                    var comic = res.data.results[i]
                    var nuevoComic = new Comic(comic.thumbnail, comic.title, comic.description)
                    comics.push(nuevoComic)
                }
            }
        }
    })
}


function muestraComics(){
    for (let i = 0; i < comics.length; i++) {
        $('#prueba').append('<div><img src="'+comics[i].thumbnail.path+'/'+'portrait_medium.'+comics[i].thumbnail.extension+'"><h1>'+comics[i].title+'</h1><p>'+comics[i].description+'</p></div>')
    }
}

/*

function Pelicula(titulo, genero, anio, director, reparto, sinopsis) {
    this.titulo = titulo
    this.genero = genero
    this.anio = anio
    this.director = director
    this.reparto = reparto
    this.sinopsis = sinopsis
}


function creaPeliculasJson(titulo, genero, anio, director, reparto, sinopsis) {
    var pelicula = new Pelicula(titulo, genero, anio, director, reparto, sinopsis)
    peliculas.push(pelicula)
}


function leePeliculas() {
    $.getJSON('https://aschausson.github.io/movierate/data/pelis.json', function (data) {
        for (var key in data) {
            creaPeliculasJson(data[key].titulo, data[key].genero, data[key].anio, data[key].director, data[key].reparto, data[key].sinopsis)
        }
    })
        .done(function () {
            insertaPeliculas()
            listenerClickPeliculas()
            //  paginar()
            $(function () {
                $('#prueba').pagination({
                    items: 10,
                    itemsOnPage: 5,
                    cssStyle: 'light-theme'
                });
            });
        })
}


function listenerClickPeliculas() {
    $(document).keyup(function (e) {
        if (e.keyCode == 27) { //escape
            $('#bloqueo').hide()
            $('#peliculaGrande').hide()
            $('#panelAyuda').hide()
            $('body').css('overflow', 'scroll')
        }
    })

    $('#ayuda').click(function () {
        $('#bloqueo').show()
        $('#panelAyuda').show()
    })
    $('#ayuda').keypress(function (e) {
        if (e.which == 13) {//enter
            $('#bloqueo').show()
            $('#panelAyuda').show()
        }
    })

    $('.peliPequeCont').click(function () {
        peliculaGrande($(this).attr('id'))
        $('body').css('overflow', 'hidden')
        $('#peliculaGrande').scrollTop(0)
        $('#peliculaGrande').focus()
    })
    $('.peliPequeCont').keypress(function (e) {
        if (e.which == 13) {//enter
            peliculaGrande($(this).attr('id'))
            $('body').css('overflow', 'hidden')
            $('#peliculaGrande').scrollTop(0)
            $('#peliculaGrande').focus()
        }
    })

    $('#cierraAyuda').click(function () {
        $('#bloqueo').hide()
        $('#panelAyuda').hide()
    })
    $('#cierraAyuda').keypress(function (e) {
        if (e.which == 13) {//enter
            $('#bloqueo').hide()
            $('#panelAyuda').hide()
        }
    })

    $('#pgAtras').click(function () {
        $('#bloqueo').hide()
        $('#peliculaGrande').hide()
        $('body').css('overflow', 'scroll')
    })
    $('#pgAtras').keypress(function (e) {
        if (e.which == 13) {//enter
            $('#bloqueo').hide()
            $('#peliculaGrande').hide()
            $('body').css('overflow', 'scroll')
        }
    })

}


function insertaPeliculas() {
    for (var i = 0; i < peliculas.length; i++) {
        var sinopsisCorta = peliculas[i].sinopsis.substring(0, 180)
        $('#contenedor').append('<div tabindex="0" id="' + i + '" class="peliPequeCont"><img aria-hidden="true" alt="' + peliculas[i].titulo + '" src="./data/img/' + (i + 1) + 'small.jpg"><h1>' + peliculas[i].titulo + '</h1><h4>Género: ' + peliculas[i].genero + '</h4><h4>Sinopsis:</h4><p>' + sinopsisCorta + '...</p></div>')
    }
}


function leeRetretes() {
    $.getJSON('https://aschausson.github.io/toiletpicker/data/medidas.json', function (data) {
        for (var key in data) {
            var x = 3
        }
    })
        .done(function () {
            x = 3
        })
}


function peliculaGrande(id) {
    peliculaSeleccionada = id
    $('#pgImagen').attr('src', './data/img/' + (parseInt(id) + 1) + 'large.jpg')
    var tit = peliculas[id].titulo
    $('#pgTitulo').html(tit)
    $('#pgGenero').html('Género: ' + peliculas[id].genero)
    $('#pgDirector').html('Director: ' + peliculas[id].director)
    $('#pgReparto').html('Reparto: ' + peliculas[id].reparto)
    $('#pgSinopsis').html(peliculas[id].sinopsis)
    $('#bloqueo').show()
    $('#peliculaGrande').show()
}


function guardarVoto() {
    var voto = new Voto(peliculas[peliculaSeleccionada].titulo, $('#nombreUsuario').val(), $('#emailUsuario').val(), $('#telefonoUsuario').val())
    if (localStorage.getItem("votosPelis") === null) {
        votos.push(voto)
        localStorage.setItem("votosPelis", JSON.stringify(votos))
    }
    else {
        votos = JSON.parse(localStorage.getItem("votosPelis"))
        votos.push(voto)
        localStorage.setItem("votosPelis", JSON.stringify(votos))
    }
    document.formulario.submit();
    //return false
}
*/


/*
function paginar() {
    $('.pprueba').pagination({
        items: 100, 
        itemsOnPage: 5,
        cssStyle: 'light-theme'
    })
}
*/


var pubKey = '632013691159fd26afbb584f3e94f435'
var privKey = '5de1ae1ec51cc8e11ffb850f802c508919550e6c'

function datosComic() {
    var formato = 'comic'
    var tipoFormato = 'comic'
    var sinVariantes = 'true'
    var ordenado = 'title'
    var limite = '20'
    var url = 'https://gateway.marvel.com:443/v1/public/comics?format=' + formato + '&formatType=' + tipoFormato + '&noVariants=' + sinVariantes + '&orderBy=' + ordenado + '&limit=' + limite + '&apikey=' + pubKey
   
    /*
    var ts = new Date().getTime();
    var hash = crypto.createHash('md5').update(ts + pubKey + privKey).digest('hex');
    url += "&ts="+ts+"&hash="+hash;
    */
    return $.get(url);

}


function datosPersonaje() {


}