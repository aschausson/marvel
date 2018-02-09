
var votos = []
var totalVotos = 0

var comics = []
var personajes = []

var votosComics = []
var votosPersonajes = []

var data;
var options;
var optionsDonut;

$(document).ready(function () {
    if (localStorage.getItem("votosMarvel") === null) {

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

    $('#botonTarta').click(graficaPastel)
    $('#botonColumna').click(graficaColumna)
    $('#botonDonut').click(graficaDonut)

    $('#atrasResultado').click(irAtras)
    $('#atrasResultado').keypress(function (e) {
        if (e.which == 13) {//enter
            irAtras()
        }
    })
    graficaPastel()
})


// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and draws it.
function drawChart() {
    arrayComics = []
    for (let i = 0; i < comics.length; i++) {
        subarray = [comics[i], votosComics[i]]
        arrayComics.push(subarray)
    }

    arrayPersonajes = []
    for (let i = 0; i < personajes.length; i++) {
        subarray = [compersonajesics[i], votosPersonajes[i]]
        arrayPersonajes.push(subarray)
    }

    $('#pastel').show()
    $('#columna').show()
    $('#donut').show()

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Comic');
        data.addColumn('number', 'Votos');
        data.addRows(arrayComics);
    
        // Set chart options
        var options = {
            'title': 'Reparto de votos: Comics Marvel',
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
            'title': 'Reparto de votos: Comics Marvel',
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



    setDataOptionsPersonaje()



    $('#columna').hide()
    $('#donut').hide()

    $('#pastel').find('#defs').remove()
    $('#donut').find('#defs').remove()
}



function graficaPastel() {
    $('#botonTarta').removeClass('botonesInactivo').addClass('botonesActivo')
    $('#botonColumna').removeClass('botonesActivo').addClass('botonesInactivo')
    $('#botonDonut').removeClass('botonesActivo').addClass('botonesInactivo')

    $('#pastel').show()
    $('#columna').hide()
    $('#donut').hide()
}


function graficaColumna() {
    $('#botonTarta').removeClass('botonesActivo').addClass('botonesInactivo')
    $('#botonColumna').removeClass('botonesInactivo').addClass('botonesActivo')
    $('#botonDonut').removeClass('botonesActivo').addClass('botonesInactivo')

    $('#pastel').hide()
    $('#columna').show()
    $('#donut').hide()
}


function graficaDonut() {
    $('#botonTarta').removeClass('botonesActivo').addClass('botonesInactivo')
    $('#botonColumna').removeClass('botonesActivo').addClass('botonesInactivo')
    $('#botonDonut').removeClass('botonesInactivo').addClass('botonesActivo')

    $('#pastel').hide()
    $('#columna').hide()
    $('#donut').show()
}

function irAtras() {
    window.location.href = 'index.html'
}


function setDataOptionsComic(){
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Comic');
        data.addColumn('number', 'Votos');
        data.addRows(arrayComics);
    
        // Set chart options
        var options = {
            'title': 'Reparto de votos: Comics Marvel',
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
            'title': 'Reparto de votos: Comics Marvel',
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
}

function setDataOptionsPersonaje(){
            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Personaje');
            data.addColumn('number', 'Votos');
            data.addRows(arrayPersonajes);
        
            // Set chart options
            var options = {
                'title': 'Reparto de votos: Personajes Marvel',
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
                'title': 'Reparto de votos: Personajes Marvel',
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