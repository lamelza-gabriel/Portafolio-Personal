const d = document;
const descripcionTecnologia = d.getElementById("descripcion-tecnologia")


const iconosTecnologia = d.querySelectorAll(".icon-tecnologias")

//AGREGAR Y ELIMINAR CLASE DE ACTIVE A ICONOS

iconosTecnologia.forEach(icono => {

    icono.addEventListener("click", (e) => {

        //el forEach de elemento lo que hace es eliminar la clase de activo de todos los demas, para que solo uno de los iconos lo posea, y el usuario sepa que esta viendo

        iconosTecnologia.forEach((elemento) => {
            elemento.classList.remove("active")
            elemento.classList.add("inactive")
        })

        if (icono.classList.contains("inactive")) {
            icono.classList.remove("inactive")
            icono.classList.add("active")
        } else {
            icono.classList.add("inactive")
            icono.classList.remove("active")
        }

    })

    //agregar la clase de activo y cambiar el texto

    icono.addEventListener("click", () => {
        
        //Esto deberia de hacerse con un switch, pero lo escribi mal, luego lo debo reintentar
        
        if (icono.classList.contains("html")) {
            descripcionTecnologia.textContent = "HTML5 es un estándar que sirve como referencia del software que conecta con la elaboración de páginas web en sus diferentes versiones, define una estructura básica y un código (denominado HTML) para la definición de contenido de una página web, como texto, imágenes, vídeos, juegos, entre otros…"
        } else if (icono.classList.contains("css")) {
            descripcionTecnologia.textContent = "CSS, en español «Hojas de estilo en cascada», es un lenguaje de diseño gráfico para definir y crear la presentación de un documento estructurado escrito en un lenguaje de marcado, como por ejemplo HTML5"
        } else if (icono.classList.contains("sass")) {
            descripcionTecnologia.textContent = "Un preprocesador CSS es una herramienta que nos permite generar, de manera automática, hojas de estilo, añadiéndoles características que no tiene CSS, y que son propias de los lenguajes de programación, como pueden ser variables, funciones, selectores anidados, herencia, etcétera."
        } else if (icono.classList.contains("javascript")) {
            descripcionTecnologia.textContent = "JavaScript es el único lenguaje de programación que funciona en los navegadores de forma nativa (lenguaje interpretado sin necesidad de compilación). Por tanto se utiliza como complemento de HTML y CSS para crear páginas webs."
        } else if (icono.classList.contains("react")) {
            descripcionTecnologia.textContent = "React es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre. En el proyecto hay más de mil desarrolladores libres"
        } else if (icono.classList.contains("git")) {
            descripcionTecnologia.textContent = "Git es un software de control de versiones diseñado por Linus Torvalds, pensando en la eficiencia, la confiabilidad y compatibilidad del mantenimiento de versiones de aplicaciones cuando estas tienen un gran número de archivos de código fuente"
        }

    })

})

//VALIDACION DEL FORMULARIO

const form = d.getElementById("form")
const nombre = d.getElementById("name")
const email = d.getElementById("email")
const textarea = d.getElementById("textarea")

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

let campos = {
    nombre: false,
    email: false,
    coments: false
}

form.addEventListener("submit", (e) => {

    e.preventDefault()
    
    if (nombre.value.length < 4) {

        //creamos el elemento, luego lo insertamos y le damos un texto, para luego eliminarlo despues de x milisegundos

        let msj = d.createElement("p")
        msj.classList.add("mensaje")
        msj.textContent = "El nombre debe tener mas de 5 caracteres"
        nombre.insertAdjacentElement("afterend", msj)

        setTimeout(function () {
            form.removeChild(msj)
        },3000)

    }

    if (textarea.value.length < 15) {

        let msj = d.createElement("p")
        msj.classList.add("mensaje")
        msj.textContent = "Los comentarios deben tener mas de 15 caracteres"
        textarea.insertAdjacentElement("afterend", msj)

        setTimeout(function () {
            form.removeChild(msj)
        },3000)

    }
    
    if (expresiones.correo.test(email.value)) {
        campos.email = true
    } else {

        let msj = d.createElement("p")
        msj.classList.add("mensaje")
        msj.textContent = "Este email no es valido"
        email.insertAdjacentElement("afterend", msj)

        setTimeout(function () {
            form.removeChild(msj)
        },3000)

    }
    
    if (nombre.value.length > 4 && textarea.value.length > 15 && expresiones.correo.test(email.value)) {
        form.submit()
    } 


    //enviar info formulario a mi correo

    fetch("https://formsubmit.co/ajax/lamelzagabriel327@gmail.com", {

        method: "POST",
        body: new FormData(e.target)
    })
        .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
        alert("formulario enviado exitosamente")
        form.reset()
        .catch(error => {
            console.log(error)
            alert("el formulario no pudo ser enviado, pongase en contacto mediante alguno de los demas metodos de contacto")
        })

})

//ABRIR PROYECTOS

const firstProyect = d.getElementById("first-proyect")

firstProyect.addEventListener("click", (e) => {
    window.open("/restaurante/cafe.html")
})

const secondProyect = d.getElementById





