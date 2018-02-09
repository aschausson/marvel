
var votos = []

var comics = []
var personajes = []

var votosComics = []
var votosPersonajes = []

var data;
var options;
var optionsDonut;

/**
 * Cuando el documento está cargado, recoge los votos,los guarda en arrays, asigna listeners a los botones y muestra la gráfica de tipo pastel.
 */
$(document).ready(function () {
    $('#divPersonajes').hide()

    $('#selectModo').change(function () {
        $("select option:selected").each(function () {
            if ($(this).val() == "comics") {
                $('#divComics').show()
                $('#divPersonajes').hide()
            }
            if ($(this).val() == "personajes") {
                $('#divPersonajes').show()
                $('#divComics').hide()
            }
        })
    })

    if (localStorage.getItem("votosMarvel") === null) {
        alert('No existen votos guardados.')
    }
    else {
        votos = JSON.parse(localStorage.getItem("votosMarvel"))
    }

    for (let j = 0; j < votos.length; j++) {
        existeComic = false
        if (votos[j].comic != null) {
            for (let k = 0; k < comics.length; k++) {
                if (comics[k] == votos[j].comic) {
                    votosComics[k] = votosComics[k] + 1
                    existe = true
                }
            }
            if (!existeComic) {
                comics.push(votos[j].comic)
                votosComics.push(1)
            }
        }

        existePersonaje = false
        if (votos[j].personaje != null) {
            for (let k = 0; k < personajes.length; k++) {
                if (personajes[k] == votos[j].personaje) {
                    votosPersonajes[k] = votosPersonajes[k] + 1
                    existe = true
                }
            }
            if (!existePersonaje) {
                personajes.push(votos[j].personaje)
                votosPersonajes.push(1)
            }
        }
    }

    $('#botonTarta').click(function () { graficaPastel('') })
    $('#botonColumna').click(function () { graficaColumna('') })
    $('#botonDonut').click(function () { graficaDonut('') })

    $('#botonTartaP').click(function () { graficaPastel('P') })
    $('#botonColumnaP').click(function () { graficaColumna('P') })
    $('#botonDonutP').click(function () { graficaDonut('P') })

    $('#atrasResultado, #atrasResultadoP').click(irAtras)
    $('#atrasResultado, #atrasResultadoP').keypress(function (e) {
        if (e.which == 13) {//enter
            irAtras()
        }
    })
    graficaPastel('')
})

// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

/**
 * Callback that creates and populates a data table, instantiates the pie chart, passes in the data and draws it.
 */
function drawChart() {
    arrayComics = []
    for (let i = 0; i < comics.length; i++) {
        subarray = [comics[i], votosComics[i]]
        arrayComics.push(subarray)
    }

    arrayPersonajes = []
    for (let i = 0; i < personajes.length; i++) {
        subarray = [personajes[i], votosPersonajes[i]]
        arrayPersonajes.push(subarray)
    }

    $('#pastel').show()
    $('#columna').show()
    $('#donut').show()

    setDataOptionsComic()
    setDataOptionsPersonaje()

    $('#columna').hide()
    $('#donut').hide()

    $('#pastel').find('#defs').remove()
    $('#donut').find('#defs').remove()
}


/**
 * Muestra la gráfica de tipo pastel y esconde las demás. Dependiendo del sufix, lo hace para cómics o personajes.
 * @param {*} sufix 
 */
function graficaPastel(sufix) {
    $('#botonTarta' + sufix).removeClass('botonesInactivo').addClass('botonesActivo')
    $('#botonColumna' + sufix).removeClass('botonesActivo').addClass('botonesInactivo')
    $('#botonDonut' + sufix).removeClass('botonesActivo').addClass('botonesInactivo')

    $('#pastel' + sufix).show()
    $('#columna' + sufix).hide()
    $('#donut' + sufix).hide()
}

/**
 * Muestra la gráfica de tipo columnas y esconde las demás. Dependiendo del sufix, lo hace para cómics o personajes.
 * @param {*} sufix 
 */
function graficaColumna(sufix) {
    $('#botonTarta' + sufix).removeClass('botonesActivo').addClass('botonesInactivo')
    $('#botonColumna' + sufix).removeClass('botonesInactivo').addClass('botonesActivo')
    $('#botonDonut' + sufix).removeClass('botonesActivo').addClass('botonesInactivo')

    $('#pastel' + sufix).hide()
    $('#columna' + sufix).show()
    $('#donut' + sufix).hide()
}

/**
 * Muestra la gráfica de tipo donut y esconde las demás. Dependiendo del sufix, lo hace para cómics o personajes.
 * @param {*} sufix 
 */
function graficaDonut(sufix) {
    $('#botonTarta' + sufix).removeClass('botonesActivo').addClass('botonesInactivo')
    $('#botonColumna' + sufix).removeClass('botonesActivo').addClass('botonesInactivo')
    $('#botonDonut' + sufix).removeClass('botonesInactivo').addClass('botonesActivo')

    $('#pastel' + sufix).hide()
    $('#columna' + sufix).hide()
    $('#donut' + sufix).show()
}

/**
 * Vuelve a la página principal.
 */
function irAtras() {
    window.location.href = 'index.html'
}

/**
 * Recopila los datos y las opciones para las gráficas de los cómics, las crea y las dibuja.
 */
function setDataOptionsComic() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Comic');
    data.addColumn('number', 'Votos');
    data.addRows(arrayComics);

    // Set chart options
    var options = {
        'title': 'Comics Marvel',
        'width': $('.divGrafica').width() - 10,
        'height': $('.divGrafica').height() - 30,
        backgroundColor: '#f1f1f1',
        is3D: true,
        vAxis: { textPosition: 'in' },
        chartArea: {
            left: 0,
            width: $('.divGrafica').width() - 10
        },
        legend: {
            maxLines: 1,
            textStyle: {
                fontSize: 15
            }
        },
        titleTextStyle: {
            fontSize: 20
        }
    }

    var optionsDonut = {
        'title': 'Comics Marvel',
        'width': $('.divGrafica').width() - 10,
        'height': $('.divGrafica').height() - 30,
        backgroundColor: '#f1f1f1',
        is3D: false,
        pieHole: 0.3,
        chartArea: {
            left: 0,
            width: $('.divGrafica').width() - 10
        },
        legend: {
            maxLines: 1,
            textStyle: {
                fontSize: 15
            }
        },
        titleTextStyle: {
            fontSize: 20
        }
    }

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('pastel'));
    chart.draw(data, options);

    var chart = new google.visualization.BarChart(document.getElementById('columna'));
    chart.draw(data, options);

    var chart = new google.visualization.PieChart(document.getElementById('donut'));
    chart.draw(data, optionsDonut);
}

/**
 * Recopila los datos y las opciones para las gráficas de los personajes, las crea y las dibuja.
 */
function setDataOptionsPersonaje() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Personaje');
    data.addColumn('number', 'Votos');
    data.addRows(arrayPersonajes);

    // Set chart options
    var options = {
        'title': 'Personajes Marvel',
        'width': $('.divGrafica').width() - 10,
        'height': $('.divGrafica').height() - 30,
        backgroundColor: '#f1f1f1',
        is3D: true,
        vAxis: { textPosition: 'in' },
        chartArea: {
            left: 0,
            width: $('.divGrafica').width() - 10
        },
        legend: {
            maxLines: 1,
            textStyle: {
                fontSize: 15
            }
        },
        titleTextStyle: {
            fontSize: 20
        }
    }

    var optionsDonut = {
        'title': 'Personajes Marvel',
        'width': $('.divGrafica').width() - 10,
        'height': $('.divGrafica').height() - 30,
        backgroundColor: '#f1f1f1',
        is3D: false,
        pieHole: 0.3,
        chartArea: {
            left: 0,
            width: $('.divGrafica').width() - 10
        },
        legend: {
            maxLines: 1,
            textStyle: {
                fontSize: 15
            }
        },
        titleTextStyle: {
            fontSize: 20
        }
    }

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('pastelP'));
    chart.draw(data, options);

    var chart = new google.visualization.BarChart(document.getElementById('columnaP'));
    chart.draw(data, options);

    var chart = new google.visualization.PieChart(document.getElementById('donutP'));
    chart.draw(data, optionsDonut);
}