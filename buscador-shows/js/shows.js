const d = document;
const searchInput = d.getElementById("searchInput");
const searchBtn = d.getElementById("searchBtn");
const showsContainer = d.getElementById("shows")
//no queremos definir el template, sino su contenido
const template = d.getElementById("template").content
//creamos un fragmento de codigo, para usar cuando insertemos los shows(template) en el dom
const codeFragment = d.createDocumentFragment()

searchBtn.addEventListener("click", async e => {
    
    try {
        
        //cargar loader
        showsContainer.innerHTML = `
        <img class="loader" src="assets/loader.svg" alt="Cargando..">
        `

        //hacer peticion
        let respuesta = await fetch(`https://api.tvmaze.com/search/shows?q=${searchInput.value}`);
        let json = await respuesta.json();

        //mandar error al catch
        if (!respuesta.ok) throw { status: respuesta.status, statusText: respuesta.statusText }

        //programacion por si no existen resultados para la busqueda
        if (json.length === 0) {
            showsContainer.innerHTML = `
            <h2>No existen resultados para la busqueda ${searchInput.value}</h2>
            `
        }
        
        //mostrar resultados busqueda
        json.forEach(el => {

            template.querySelector("h3").textContent = el.show.name;
            template.querySelector("div").innerHTML = el.show.summary ? el.show.summary : "Descripcion no disponible por el momento";
            template.querySelector("img").src = el.show.image ? el.show.image.medium : "http://static.tvmaze.com/images/no-img/no-img-portrait-text.png";

            //extras(link de mas informacion)
                        template.querySelector("a").href = el.show.url ? el.show.url : "#";
                        template.querySelector("a").target = el.show.url ? "_blank" : "_self";
                        template.querySelector("a").textContent = el.show.url ? "Mas informacion" : "";

            //lo que hacemos es clonar el nodo(codigo html del template) con importNode, este recibe dos parametros el nodo a clonar(template) y un boolean(true), que indica si los hijos de este nodo se deben clonar tambien
            let clone = d.importNode(template, true);
            //agregamos el clon al codeFragment, para luego insertarlo en el dom
            codeFragment.appendChild(clone);

        })
        
        //eliminamos el loader del dom
        showsContainer.innerHTML = "";
        //agregamos el codeFragment al dom(el contiene los shows)
        showsContainer.appendChild(codeFragment)

    } catch (error) {
        
        //usamos un operador de cortocircuito, si no hay cotenido en statusText usamos el otro mensaje
        let message = error.statusText || "Ocurrio un error"
        showsContainer.innerHTML = `<p>Error ${error.status} : ${message}</p>`

    }

})


    


