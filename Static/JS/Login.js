class Login {
    /**
     * Constructor de la clase Login. Este constructor importara el Nodo del body del html
     * this.load: este es un atributo de la clase en el cual insertaremos una vez seteado
     * @param body
     */
    constructor(body) {
        this.body = body;
        this.load();
        this.load;
    }

    /**
     * Este metodo va a insertar unicamente en el html el elemento HTML de Login
     */
    load() {
        this.body.innerHTML = this.getHtml();
    }

    /**
     * Metodo que controlara la pantalla de carga, de modo que eliminara lo que sea necesario.
     * @param {List} other Importa un objeto de tipo List el cual extraeremos el html para poder mostrarlo cuando acabe
     * la animacion
     */
    show(other) {
        if (other instanceof List) {
            setTimeout(() => {
                this.load = this.body.querySelector('#load') //seteamos el atributo load al elemento del Html con id #load
                this.load.classList.toggle('transition-end');
                setTimeout(() => {
                    this.load.remove();
                    this.load = null
                    this.body.innerHTML += other.getHtml();
                    const containsElement = this.body.querySelector('#contains');
                    containsElement.classList.add('transition-start');
                    list.loadEvents();
                    list.loadLocalStorage()
                }, 1000);
            }, 3500);//3500
        }
    }
    /**
     * Contiene el nodo HTML de la pantalla de carga. Esta diseñado para ser insertado dentro de otro nodo con
     * InnerHtml = {...}
     * @returns {string}
     */
    getHtml() {
        return `
            <div id="load" class="row justify-content-center col-8 position-absolute">
            <span class="fs-1"><center>Daily</center></span>
                <img src="../Static/images/logo.png" class="" alt="">
                <div id="LoadingText">
                    <span class="fs-3">Loading<p>.</p><p>.</p><p>.</p></span>
                </div>
                <div class="loading"></div>
            </div>
        `;
    }

}