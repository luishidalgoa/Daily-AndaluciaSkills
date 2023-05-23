class ControllerList{
    constructor(list) {
        this.list=new List(list);
    }

    /**
     * Se encarga de realizar todo el procedimiento para cargar correctamente cualquier lista
     * de tareas . De modo que primero insertara la base HTML para posteriormente cargar todas las tareas
     * asi como inicializar los eventos pertinentes de la lista de tareas
     * @param body
     */
    loadList(body){
        body.innerHTML += this.list.getHtml();
        body.querySelector('#contains');
        this.list.initializeEvents();
        this.list.loadLocalStorage();
    }
}