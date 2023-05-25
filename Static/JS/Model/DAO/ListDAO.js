class ListDAO{
    /**
     * Esta function devolve un array de tipo 'List()'.
     */
    static searchAll(){
        
    }

    /**
     * Guardara o creara una nueva lista begun exista o no. Sí existe. automáticamente, serializará todos sus objetos
     * @param listName nombre de la lista nueva o existente donde se guardaran los objetos o se creara
     */
    static save(listName){
        localStorage.setItem(listName, JSON.stringify(TasksDAO.searchAll(listName)))
    }

    /**
     * Función que devolve un objeto tipo 'List()' pero previamente lo buscara en el localStorage.
     * de modo que si existe devolve la lista completa, en caso contrario la generará
     * @param listName nombre de la lista que se buscara para posteriormente construirse
     * @returns {List} devolve la Lista, ya sea vacía o con contenido. Seguin exista o no exista previamente
     */
    static searchList(listName){
        let result = new List(listName,[]);
        if(localStorage.getItem(listName)!==null){
            result = new List(listName,TasksDAO.searchAll(listName))
        }else{
            console.log(listName)
            this.save(listName)
        }
        return result;
    }

    /**
     * Función que permit actualizar el nombre de una lista por su nombre
     */
    static updateList(){

    }

    /**
     * Function que permit borrar una lista por su nombre
     */
    static deleteList(){

    }
}