
/**
 * Representa un voto realizado por un usuario.
 * @param {*} usuario 
 * @param {*} email 
 * @param {*} telefono 
 * @class
 */
function Voto(usuario, email, telefono) {
    this.comic = null
    this.personaje = null
    this.usuario = usuario
    this.email = email
    this.telefono = telefono
}


/**
 * Representa cada comic que el usuario puede seleccionar.
 * @param {*} id 
 * @param {*} thumbnail 
 * @param {*} title 
 * @param {*} description 
 * @class
 */
function Comic(id, thumbnail, title, description) {
    this.id = id
    this.thumbnail = thumbnail
    this.title = title
    if (description == null)
        this.description = 'No existe una descripción.'
    else
        this.description = description
}

/**
 * Representa cada personaje que el usuario puede seleccionar.
 * @param {*} id 
 * @param {*} thumbnail 
 * @param {*} name 
 * @class
 */
function Personaje(id, thumbnail, name) {
    this.id = id
    this.thumbnail = thumbnail
    this.name = name
}

/**
 * Representa las variables globales para la página.
 * @class
 */
function Variable() {
    this.comics = []
    this.personajes = []
    this.votos = []
    this.comicSeleccionado
    this.personajeSeleccionado
}

var variable
var toastr
var pubKey = '632013691159fd26afbb584f3e94f435'

/**
 * Se ejecuta cuando de termina de cargar la página. Esconde elementos que no deben ser aún visibles, inicializa las variables y comienza el proceso de leer de la base de datos.
 */
$(document).ready(function () {
    $('#bloqueo').hide()
    $('#panelAyuda').hide()
    $('#comicGrande').hide()
    $('#personajeGrande').hide()
    $('#contenedorPersonajes').hide()
    $('#pagination-2').hide()

    listenerClickComics()

    variable = new Variable()
    leeComics('', '', '')

    toastr.options = {
        preventDuplicates: true
    }
})

/**
 * Lee los comics de la base de datos de Marvel. Si se seleccionó un filtro, se aplica. Después se pagina.
 * @param {*} filtro 
 */
function leeComics(filtro, year1, year2) {
    if (variable.comics.length == 0) {
        $('#contenedor div').remove()
        var promesas = []
        $('.spinner').fadeIn()
        promesas.push(datosComic(filtro, year1, year2))

        $.when.apply($, promesas).then(function () {
            var args = Array.prototype.slice.call(arguments, 0)
            var res = args[0]

            if (res.code === 200) {
                for (var j = 0; j < res.data.results.length; j++) {
                    var comic = res.data.results[j]
                    var nuevoComic = new Comic(j, comic.thumbnail, comic.title, comic.description)
                    variable.comics.push(nuevoComic)
                    muestraComic(nuevoComic)
                }
            }
            if (res.code != 200) {
                $('.spinner').hide()
                alert('Error en la petición de datos.')
            }
        },
            function () {
                $('.spinner').hide()
                alert('No se ha podido contactar con la base de datos.')
            })
            .then(function () {
                $('.comicPequeCont').click(function () {
                    comicGrande($(this).attr('id'))
                    $('body').css('overflow', 'hidden')
                    $('#comicGrande').scrollTop(0)
                    $('#comicGrande').focus()
                })
                paginate({
                    itemSelector: "#contenedor div"
                    , paginationSelector: "#pagination-1"
                    , itemsPerPage: 10
                    , edges: 1
                    , displayedPages: 1
                });
                $('.spinner').fadeOut()
            })
    }
}

/**
 * Lee los personajes de la base de datos de Marvel. Si se seleccionó un filtro, se aplica. Después se pagina.
 * @param {*} filtro 
 */
function leePersonajes(filtro) {
    if (variable.personajes.length == 0) {
        $('#contenedorPersonajes div').remove()
        var promesas = []
        $('.spinner').fadeIn()
        promesas.push(datosPersonaje(filtro))

        $.when.apply($, promesas).then(function () {
            var args = Array.prototype.slice.call(arguments, 0)
            var res = args[0]

            if (res.code === 200) {
                for (var j = 0; j < res.data.results.length; j++) {
                    var personaje = res.data.results[j]
                    var nuevoPersonaje = new Personaje(j, personaje.thumbnail, personaje.name)
                    variable.personajes.push(nuevoPersonaje)
                    muestraPersonaje(nuevoPersonaje)
                }
            }
            if (res.code != 200) {
                $('.spinner').hide()
                alert('Error en la petición de datos.')
            }
        })
            .then(function () {
                $('.personajePequeCont').click(function () {
                    personajeGrande($(this).attr('id'))
                    $('body').css('overflow', 'hidden')
                    $('#personajeGrande').scrollTop(0)
                    $('#personajeGrande').focus()
                })
                paginate({
                    itemSelector: "#contenedorPersonajes div"
                    , paginationSelector: "#pagination-2"
                    , itemsPerPage: 10
                    , edges: 1
                    , displayedPages: 1
                })
                $('.spinner').fadeOut()
            })
    }
}

/**
 * Añade un comic al contenedor de los comics.
 * @param {*} comic 
 */
function muestraComic(comic) {
    var descripcionCorta = comic.description.substring(0, 60)
    var pathHttp = comic.thumbnail.path
    var pathHttps = pathHttp.replace('http', 'https')
    $('#contenedor').append('<div id="' + comic.id + '" class="comicPequeCont"><img src="' + pathHttps + '/' + 'portrait_medium.' + comic.thumbnail.extension + '"><h2>' + comic.title + '</h2><p>' + descripcionCorta + '...</p></div>')
}

/**
 * Añade un personaje al contenedor de los personajes.
 * @param {*} personaje 
 */
function muestraPersonaje(personaje) {
    var pathHttp = personaje.thumbnail.path
    var pathHttps = pathHttp.replace('http', 'https')
    $('#contenedorPersonajes').append('<div id="' + personaje.id + '" class="personajePequeCont"><img src="' + pathHttps + '/' + 'portrait_medium.' + personaje.thumbnail.extension + '"><h2>' + personaje.name + '</h2></div>')
}

/**
 * Se añaden todos los listener a los botones, inputs, cómics y personajes, y también se permite utilizar las teclas enter y escape.
 */
function listenerClickComics() {
    $(document).keyup(function (e) {
        if (e.keyCode == 27) { //escape
            $('#bloqueo').fadeOut()
            $('#comicGrande').fadeOut()
            $('#personajeGrande').fadeOut()
            $('#panelAyuda').fadeOut()
            $('body').css('overflow', 'scroll')
        }
    })

    $('#ayuda').click(function () {
        $('#bloqueo').fadeIn()
        $('#panelAyuda').fadeIn()
    })
    $('#ayuda').keypress(function (e) {
        if (e.which == 13) {//enter
            $('#bloqueo').fadeIn()
            $('#panelAyuda').fadeIn()
        }
    })

    $('.comicPequeCont').click(function () {
        comicGrande($(this).attr('id'))
        $('body').css('overflow', 'hidden')
        $('#comicGrande').scrollTop(0)
        $('#comicGrande').focus()
    })

    $('.personajePequeCont').click(function () {
        personajeGrande($(this).attr('id'))
        $('body').css('overflow', 'hidden')
        $('#personajeGrande').scrollTop(0)
        $('#personajeGrande').focus()
    })

    $('#cierraAyuda').click(function () {
        $('#bloqueo').fadeOut()
        $('#panelAyuda').fadeOut()
    })
    $('#cierraAyuda').keypress(function (e) {
        if (e.which == 13) {//enter
            $('#bloqueo').fadeOut()
            $('#panelAyuda').fadeOut()
        }
    })

    $('.botonAtras').click(function () {
        $('#bloqueo').fadeOut()
        $('#comicGrande').fadeOut()
        $('#personajeGrande').fadeOut()
        $('body').css('overflow', 'scroll')
    })
    $('.botonAtras').keypress(function (e) {
        if (e.which == 13) {//enter
            $('#bloqueo').fadeOut()
            $('#comicGrande').fadeOut()
            $('#personajeGrande').fadeOut()
            $('body').css('overflow', 'scroll')
        }
    })

    $('#botonPersonajes').click(function () {
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
    $('#botonComics').click(function () {
        $('#botonComics').removeClass('botonesInactivo')
        $('#botonComics').addClass('botonesActivo')
        $('#botonPersonajes').removeClass('botonesActivo')
        $('#botonPersonajes').addClass('botonesInactivo')
        leeComics('', '', '')
        $('#contenedorPersonajes').hide()
        $('#contenedor').show()
        $('#pagination-2').hide()
        $('#pagination-1').show()
        $('#divfiltroPersonajes').hide()
        $('#divfiltroComics').show()
    })

    $('#botonFiltrarPersonaje').click(function () {
        filtraPersonajes()
    })
    $('#botonFiltrarComic').click(function () {
        filtraComics()
    })

    $('#filtroPersonajes').keypress(function (e) {
        if (e.which == 13) {//enter
            filtraPersonajes()
        }
    })
    $('#filtroComics').keypress(function (e) {
        if (e.which == 13) {//enter
            filtraComics()
        }
    })
    $('#filtroYear1').keypress(function (e) {
        if (e.which == 13) {//enter
            filtraComics()
        }
    })
    $('#filtroYear2').keypress(function (e) {
        if (e.which == 13) {//enter
            filtraComics()
        }
    })
}

/**
 * Muestra un modal con la información del cómic seleccionado.
 * @param {*} id 
 */
function comicGrande(id) {
    variable.comicSeleccionado = id
    $('#cgImagen').attr('src', variable.comics[id].thumbnail.path + '.' + variable.comics[id].thumbnail.extension)
    $('#cgTitulo').html(variable.comics[id].title)
    $('#cgDescripcion').html(variable.comics[id].description)
    $('#bloqueo').fadeIn()
    $('#comicGrande').fadeIn()
}

/**
 * Muestra un modal con la información del personaje seleccionado.
 * @param {*} id 
 */
function personajeGrande(id) {
    variable.personajeSeleccionado = id
    $('#pgImagen').attr('src', variable.personajes[id].thumbnail.path + '.' + variable.personajes[id].thumbnail.extension)
    $('#pgName').html(variable.personajes[id].name)
    $('#bloqueo').fadeIn()
    $('#personajeGrande').fadeIn()
}

/**
 * Se recogen de la base de datos de Marvel los datos de cómics. Si se introdujo un filtro, se aplica.
 * @param {*} filtro 
 */
function datosComic(filtro, year1, year2) {
    var formato = 'comic'
    var tipoFormato = 'comic'
    var sinVariantes = 'true'
    var ordenado = 'title'
    var limite = '100'
    var filtroNombre = ''
    var filtroYear = ''
    if (filtro != '')
        filtroNombre = '&titleStartsWith=' + filtro

    if (year1 != '' && year2 != '')
        filtroYear = '&dateRange=' + year1 + '-01-01%2C' + year2 + '-12-31'
    else if (year1 == '' && year2 != '')
        filtroYear = '&dateRange=1900-01-01%2C' + year2 + '-12-31'
    else if (year1 != '' && year2 == '') {
        filtroYear = '&dateRange=' + year1 + '-01-01%2C' + (new Date()).getFullYear() + '-12-31'
    }

    var url = 'https://gateway.marvel.com:443/v1/public/comics?format=' + formato + '&formatType=' + tipoFormato + '&noVariants=' + sinVariantes + filtroNombre + '&orderBy=' + ordenado + filtroYear + '&limit=' + limite + '&apikey=' + pubKey
    return $.get(url);
}

/**
 * Se recogen de la base de datos de Marvel los datos de personajes. Si se introdujo un filtro, se aplica.
 * @param {*} filtro 
 */
function datosPersonaje(filtro) {
    var ordenado = 'name'
    var limite = '100'
    var filtroNombre = ''
    if (filtro != null)
        filtroNombre = 'nameStartsWith=' + filtro + '&'

    var url = 'https://gateway.marvel.com:443/v1/public/characters?' + filtroNombre + 'orderBy=' + ordenado + '&limit=' + limite + '&apikey=' + pubKey
    return $.get(url);
}

/**
 * Se paginan los datos según las opciones que se reciben.
 * @param {*} options 
 */
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
            var fadeInFrom = perPage * (pageNumber - 1)
            var fadeInTo = fadeInFrom + perPage;
            items.hide()
                .slice(fadeInFrom, fadeInTo).show()
            return false
        }
    })
}

/**
 * Se guarda el voto por un cómic y se controla que el mismo usuario no vote a más de un cómic.
 */
function guardarVotoComic() {
    var voto = new Voto($('#nombreUsuarioC').val(), $('#emailUsuarioC').val(), $('#telefonoUsuarioC').val())
    voto.comic = variable.comics[variable.comicSeleccionado].title
    var votado = false
    var pos = -1
    if (localStorage.getItem("votosMarvel") === null) {
        variable.votos.push(voto)
        localStorage.setItem("votosMarvel", JSON.stringify(variable.votos))
        toastr.success('', 'Voto registrado')
    }
    else {
        variable.votos = JSON.parse(localStorage.getItem("votosMarvel"))
        for (let i = 0; i < variable.votos.length; i++) {
            if (variable.votos[i].email == voto.email) {
                if (variable.votos[i].comic != null) {
                    votado = true
                    pos = i
                    toastr.error('', 'Ya ha votado por comic')
                }
            }

        }
        if (!votado) {
            if (pos == -1) {
                variable.votos.push(voto)
            }
            else {
                variable.votos[pos].comic = voto.comic
            }
            localStorage.setItem("votosMarvel", JSON.stringify(variable.votos))
            toastr.success('', 'Voto registrado')
        }

    }
    return false
}

/**
 * Se guarda el voto por un personaje y se controla que el mismo usuario no vote a más de un personaje.
 */
function guardarVotoPersonaje() {
    var voto = new Voto($('#nombreUsuarioP').val(), $('#emailUsuarioP').val(), $('#telefonoUsuarioP').val())
    voto.personaje = variable.personajes[variable.personajeSeleccionado].name
    var votado = false
    var pos = -1
    if (localStorage.getItem("votosMarvel") === null) {
        variable.votos.push(voto)
        localStorage.setItem("votosMarvel", JSON.stringify(variable.votos))
        toastr.success('', 'Voto registrado')
    }
    else {
        variable.votos = JSON.parse(localStorage.getItem("votosMarvel"))
        for (let i = 0; i < variable.votos.length; i++) {
            if (variable.votos[i].email == voto.email) {
                if (variable.votos[i].personaje != null) {
                    votado = true
                    pos = i
                    toastr.error('', 'Ya ha votado por personaje')
                }
            }

        }
        if (!votado) {
            if (pos == -1) {
                variable.votos.push(voto)
            }
            else {
                variable.votos[pos].personaje = voto.personaje
            }
            localStorage.setItem("votosMarvel", JSON.stringify(variable.votos))
            toastr.success('', 'Voto registrado')
        }
    }
    return false
}

/**
 * Se hace una nueva búsqueda de personajes cuyos nombres empiecen por lo que se haya introducido en el input.
 */
function filtraPersonajes() {
    variable.personajes.length = 0
    leePersonajes($('#filtroPersonajes').val())
}

/**
 * Se hace una nueva búsqueda de cómics cuyos títulos empiecen por lo que se haya introducido en el input.
 */
function filtraComics() {
    variable.comics.length = 0
    $('#pagination-1').empty()
    leeComics($('#filtroComics').val(), $('#filtroYear1').val(), $('#filtroYear2').val())
}