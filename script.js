document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('multiStepForm');
    const pages = document.querySelectorAll('.form-page');
    const nextButtons = document.querySelectorAll('.next');
    const prevButtons = document.querySelectorAll('.prev');

    let currentPage = 0;

    // Mostrar la primera página
    pages[currentPage].style.display = 'block';

    // Función para mostrar la página actual
    function showPage(index) {
        pages.forEach((page, i) => {
            page.style.display = i === index ? 'block' : 'none';
        });
    }

    // Función para manejar el siguiente botón
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentPage < pages.length - 1) {
                currentPage++;
                showPage(currentPage);
            }
            if (currentPage === 1) {
                displayFamiliares();
            } else if (currentPage === 2) {
                displayCondiciones();
            } else if (currentPage === 3) {
                displayInternamientos();
            } else if (currentPage === 4) {
                displayResumen();
            }
        });
    });

    // Función para manejar el botón anterior
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentPage > 0) {
                currentPage--;
                showPage(currentPage);
            }
        });
    });

    // Estructura para almacenar datos
    const data = {
        persona: {},
        familiares: [],
        condiciones: [],
        internamientos: []
    };

    // Agregar familiar
    document.getElementById('addFamiliar').addEventListener('click', function() {
        const nombre = document.getElementById('nombre_familiar').value;
        const parentesco = document.getElementById('parentesco').value;
        const edad = document.getElementById('edad').value;

        if (nombre && parentesco && edad) {
            data.familiares.push({ nombre, parentesco, edad });
            document.getElementById('nombre_familiar').value = '';
            document.getElementById('parentesco').value = '';
            document.getElementById('edad').value = '';
            displayFamiliares();
        }
    });

    // Agregar condición de salud
    document.getElementById('addCondicion').addEventListener('click', function() {
        const enfermedad = document.getElementById('enfermedad').value;
        const tiempo = document.getElementById('tiempo_enfermedad').value;

        if (enfermedad && tiempo) {
            data.condiciones.push({ enfermedad, tiempo });
            document.getElementById('enfermedad').value = '';
            document.getElementById('tiempo_enfermedad').value = '';
            displayCondiciones();
        }
    });

    // Agregar internamiento
    document.getElementById('addInternamiento').addEventListener('click', function() {
        const fecha = document.getElementById('fecha_internamiento').value;
        const centroMedico = document.getElementById('centro_medico').value;
        const diagnostico = document.getElementById('diagnostico').value;

        if (fecha && centroMedico && diagnostico) {
            data.internamientos.push({ fecha, centroMedico, diagnostico });
            document.getElementById('fecha_internamiento').value = '';
            document.getElementById('centro_medico').value = '';
            document.getElementById('diagnostico').value = '';
            displayInternamientos();
        }
    });

    // Funciones para mostrar los datos en cada página
    function displayFamiliares() {
        const familiaresDiv = document.getElementById('familiares');
        familiaresDiv.innerHTML = '';
        data.familiares.forEach(familiar => {
            familiaresDiv.innerHTML += `<p>${familiar.nombre} - ${familiar.parentesco} - ${familiar.edad} años</p>`;
        });
    }
    
        function displayCondiciones() {
            const condicionesDiv = document.getElementById('condiciones');
            condicionesDiv.innerHTML = '';
            data.condiciones.forEach(condicion => {
                condicionesDiv.innerHTML += `<p>${condicion.enfermedad} - ${condicion.tiempo}</p>`;
            });
        }
    
        function displayInternamientos() {
            const internamientosDiv = document.getElementById('internamientos');
            internamientosDiv.innerHTML = '';
            data.internamientos.forEach(internamiento => {
                internamientosDiv.innerHTML += `<p>${internamiento.fecha} - ${internamiento.centroMedico} - ${internamiento.diagnostico}</p>`;
            });
        }
    
        function displayResumen() {
            // Captura los datos personales
            data.persona.nombre = document.getElementById('nombre').value;
            data.persona.apellido = document.getElementById('apellido').value;
            data.persona.fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
            data.persona.genero = document.getElementById('genero').value;
            data.persona.direccion = document.getElementById('direccion').value;
            data.persona.telefono = document.getElementById('telefono').value;
    
            const resultado = document.getElementById('resultado');
            resultado.innerHTML = JSON.stringify(data, null, 2); // Presenta los datos en formato JSON
        }
    
        // Manejar el envío del formulario
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío del formulario
    
            // Aquí podrías enviar los datos a un servidor usando fetch o AJAX
            console.log("Datos enviados:", data);
            alert("Datos enviados con éxito. Revisa la consola para ver los datos.");
        });
    });