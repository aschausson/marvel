//var crypto = require('crypto');


function Voto(usuario, email, telefono) {
    this.comic = null
    this.personaje = null
    this.usuario = usuario
    this.email = email
    this.telefono = telefono
}



function Comic(id, thumbnail, title, description) {
    this.id = id
    this.thumbnail = thumbnail
    this.title = title
    if (description == null)
        this.description = 'No existe una descripción.'
    else
        this.description = description
}


function Personaje(id, thumbnail, name) {
    this.id = id
    this.thumbnail = thumbnail
    this.name = name
}

var comics = []
var personajes = []

var toastr

var votos = []
var comicSeleccionado
var personajeSeleccionado

$(document).ready(function () {

    $('#bloqueo').hide()
    $('#panelAyuda').hide()
    $('#comicGrande').hide()
    $('#personajeGrande').hide()
    $('#contenedorPersonajes').hide()
    $('#pagination-2').hide()

    leeComics()
    //muestraComics()

    toastr.options = {
        preventDuplicates: true
    }
})


function leeComics(filtro) {
    if (comics.length == 0) {
        $('#contenedor div').remove()
        var promesas = []
        $('.spinner').show()
        promesas.push(datosComic(filtro))

        $.when.apply($, promesas).done(function () {
            var args = Array.prototype.slice.call(arguments, 0)
            var res = args[0]

            if (res.code === 200) {
                for (var j = 0; j < res.data.results.length; j++) {
                    var comic = res.data.results[j]
                    var nuevoComic = new Comic(j, comic.thumbnail, comic.title, comic.description)
                    comics.push(nuevoComic)
                    muestraComic(nuevoComic)
                }
            }
        })
            .done(function () {
                listenerClickComics()
                paginate({
                    itemSelector: "#contenedor div"
                    , paginationSelector: "#pagination-1"
                    , itemsPerPage: 10
                    , edges: 3
                    , displayedPages: 5
                });
                $('.spinner').hide()
            })
    }
}


function leePersonajes(filtro){
    if (personajes.length == 0) {
        $('#contenedorPersonajes div').remove()
        var promesas = []
        $('.spinner').show()
        promesas.push(datosPersonaje(filtro))

        $.when.apply($, promesas).done(function () {
            var args = Array.prototype.slice.call(arguments, 0)
            var res = args[0]

            if (res.code === 200) {
                for (var j = 0; j < res.data.results.length; j++) {
                    var personaje = res.data.results[j]
                    var nuevoPersonaje = new Personaje(j, personaje.thumbnail, personaje.name)
                    personajes.push(nuevoPersonaje)
                    muestraPersonaje(nuevoPersonaje)
                }
            }
        })
            .done(function () {
                listenerClickComics()
                paginate({
                    itemSelector: "#contenedorPersonajes div"
                    , paginationSelector: "#pagination-2"
                    , itemsPerPage: 10
                    , edges: 1
                    , displayedPages: 3
                });
                $('.spinner').hide()
            })
    }
}

/*
function muestraComics() {
    for (let i = 0; i < comics.length; i++) {
        var descripcionCorta = comics[i].description.substring(0, 20)
        $('#contenedor').append('<div><img src="' + comics[i].thumbnail.path + '/' + 'portrait_small.' + comics[i].thumbnail.extension + '"><h3>' + comics[i].title + '</h3><p>' + descripcionCorta + '...</p></div>')
    }
}
*/

function muestraComic(comic) {
    var descripcionCorta = comic.description.substring(0, 60)
    $('#contenedor').append('<div id="' + comic.id + '" class="comicPequeCont"><img src="' + comic.thumbnail.path + '/' + 'portrait_medium.' + comic.thumbnail.extension + '"><h2>' + comic.title + '</h2><p>' + descripcionCorta + '...</p></div>')
}

function muestraPersonaje(personaje) {
    $('#contenedorPersonajes').append('<div id="' + personaje.id + '" class="personajePequeCont"><img src="' + personaje.thumbnail.path + '/' + 'portrait_medium.' + personaje.thumbnail.extension + '"><h2>' + personaje.name + '</h2></div>')
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
    //document.formulario.submit();
    return false
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
function listenerClickComics() {
    $(document).keyup(function (e) {
        if (e.keyCode == 27) { //escape
            $('#bloqueo').hide()
            $('#comicGrande').hide()
            $('#personajeGrande').hide()
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

    $('.comicPequeCont').click(function () {
        comicGrande($(this).attr('id'))
        $('body').css('overflow', 'hidden')
        $('#comicGrande').scrollTop(0)
        $('#comicGrande').focus()
    })
    $('.comicPequeCont').keypress(function (e) {
        if (e.which == 13) {//enter
            comicGrande($(this).attr('id'))
            $('body').css('overflow', 'hidden')
            $('#personajeGrande').scrollTop(0)
            $('#personajeGrande').focus()
        }
    })

    $('.personajePequeCont').click(function () {
        personajeGrande($(this).attr('id'))
        $('body').css('overflow', 'hidden')
        $('#personajeGrande').scrollTop(0)
        $('#personajeGrande').focus()
    })
    $('.personajePequeCont').keypress(function (e) {
        if (e.which == 13) {//enter
            personajeGrande($(this).attr('id'))
            $('body').css('overflow', 'hidden')
            $('#personajeGrande').scrollTop(0)
            $('#personajeGrande').focus()
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

    $('.botonAtras').click(function () {
        $('#bloqueo').hide()
        $('#comicGrande').hide()
        $('#personajeGrande').hide()
        $('body').css('overflow', 'scroll')
    })
    $('.botonAtras').keypress(function (e) {
        if (e.which == 13) {//enter
            $('#bloqueo').hide()
            $('#comicGrande').hide()
            $('#personajeGrande').hide()
            $('body').css('overflow', 'scroll')
        }
    })

    $('#botonPersonajes').click(function(){
        $('#botonPersonajes').removeClass('botonesInactivo')
        $('#botonPersonajes').addClass('botonesActivo')
        $('#botonComics').removeClass('botonesActivo')
        $('#botonComics').addClass('botonesInactivo')
        leePersonajes()
        $('#contenedor').hide()
        $('#contenedorPersonajes').show()
        $('#pagination-1').hide()
        $('#pagination-2').show()
        $('#divfiltroPersonajes').show()
        $('#divfiltroComics').hide()
    })
    $('#botonComics').click(function(){
        $('#botonComics').removeClass('botonesInactivo')
        $('#botonComics').addClass('botonesActivo')
        $('#botonPersonajes').removeClass('botonesActivo')
        $('#botonPersonajes').addClass('botonesInactivo')
        leeComics()
        $('#contenedorPersonajes').hide()
        $('#contenedor').show()
        $('#pagination-2').hide()
        $('#pagination-1').show()
        $('#divfiltroPersonajes').hide()
        $('#divfiltroComics').show()
    })

    $('#botonFiltrarPersonaje').click(function(){
        filtraPersonajes()
    })
    $('#botonFiltrarComic').click(function(){
        filtraComics()
    })
}



function comicGrande(id) {
    comicSeleccionado = id
    $('#cgImagen').attr('src', comics[id].thumbnail.path + '.' + comics[id].thumbnail.extension)
    $('#cgTitulo').html(comics[id].title)
    $('#cgDescripcion').html(comics[id].description)
    $('#bloqueo').show()
    $('#comicGrande').show()
}


function personajeGrande(id) {
    personajeSeleccionado = id
    $('#pgImagen').attr('src', personajes[id].thumbnail.path + '.' + personajes[id].thumbnail.extension)
    $('#pgName').html(personajes[id].name)
    $('#bloqueo').show()
    $('#personajeGrande').show()
}


var pubKey = '632013691159fd26afbb584f3e94f435'
var privKey = '5de1ae1ec51cc8e11ffb850f802c508919550e6c'

function datosComic(filtro) {
    var formato = 'comic'
    var tipoFormato = 'comic'
    var sinVariantes = 'true'
    var ordenado = 'title'
    var limite = '100'
    var filtroNombre = ''
    if (filtro != null)
        filtroNombre = '&titleStartsWith='+filtro

    var url = 'https://gateway.marvel.com:443/v1/public/comics?format=' + formato + '&formatType=' + tipoFormato + '&noVariants=' + sinVariantes + filtroNombre + '&orderBy=' + ordenado + '&limit=' + limite + '&apikey=' + pubKey

    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + privKey + pubKey)
    url += "&ts=" + ts + "&hash=" + hash;

    return $.get(url);

}


function datosPersonaje(filtro) {
    var ordenado = 'name'
    var limite = '100'
    var filtroNombre = ''
    if (filtro != null)
        filtroNombre = 'nameStartsWith='+filtro+'&'

    var url = 'https://gateway.marvel.com:443/v1/public/characters?'+filtroNombre+'orderBy='+ordenado+'&limit='+limite+'&apikey=' + pubKey

    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + privKey + pubKey)
    url += "&ts=" + ts + "&hash=" + hash;

    return $.get(url);
}


function paginate(options) {
    var items = $(options.itemSelector)
    var numItems = items.length
    var perPage = options.itemsPerPage
    var displayedPages = options.displayedPages
    items.slice(perPage).hide()
    $(options.paginationSelector).pagination({
        items: numItems,
        itemsOnPage: perPage,
        displayedPages: displayedPages,
        cssStyle: "compact-theme",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1)
            var showTo = showFrom + perPage;
            items.hide()
                .slice(showFrom, showTo).show()
            return false
        }
    })
}


function guardarVotoComic() {
    var voto = new Voto($('#nombreUsuarioC').val(), $('#emailUsuarioC').val(), $('#telefonoUsuarioC').val())
    voto.comic = comics[comicSeleccionado].title
    var votado = false
    var pos = -1
    if (localStorage.getItem("votosMarvel") === null) {
        votos.push(voto)
        localStorage.setItem("votosMarvel", JSON.stringify(votos))
        toastr.success('', 'Voto registrado')
    }
    else {
        votos = JSON.parse(localStorage.getItem("votosMarvel"))
        for (let i = 0; i < votos.length; i++) {
            if (votos[i].email == voto.email){
                if (votos[i].comic != null){
                    votado = true
                    pos = i
                    toastr.error('', 'Ya ha votado por comic') 
                }
            }
            
        }
        if (!votado){
            if (pos == -1){
                votos.push(voto) 
            }
            else{
                votos[pos].comic = voto.comic
            }
            localStorage.setItem("votosMarvel", JSON.stringify(votos))
            toastr.success('', 'Voto registrado')
        }
        
    }
    //document.formulario.submit();
    return false
}


function guardarVotoPersonaje() {
    var voto = new Voto($('#nombreUsuarioP').val(), $('#emailUsuarioP').val(), $('#telefonoUsuarioP').val())
    voto.personaje = personajes[personajeSeleccionado].title
    var votado = false
    var pos = -1
    if (localStorage.getItem("votosMarvel") === null) {
        votos.push(voto)
        localStorage.setItem("votosMarvel", JSON.stringify(votos))
        //voto registrado
    }
    else {
        votos = JSON.parse(localStorage.getItem("votosMarvel"))
        for (let i = 0; i < votos.length; i++) {
            if (votos[i].email == voto.email){
                if (votos[i].personaje != null){
                    votado = true
                    pos = i
                    toastr.error('', 'Ya ha votado por personaje') 
                }
            }
            
        }
        if (!votado){
            if (pos == -1){
                votos.push(voto) 
            }
            else{
                votos[pos].personaje = voto.personaje
            }
            localStorage.setItem("votosMarvel", JSON.stringify(votos))
            toastr.success('', 'Voto registrado')
        }
    }
    //document.formulario.submit();
    return false
}


function filtraPersonajes(){
    personajes.length = 0
    leePersonajes($('#filtroPersonajes').val())
}

function filtraComics(){
    comics.length = 0
    leeComics($('#filtroComics').val())
}