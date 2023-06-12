class ListDAO{
    /**
     * Esta function devolve un array de tipo 'List()'.
     * @description NOTA: de cara al futuro tender que tener cuidado y revisar que lo que extraigo son array de listas y no de cualquier
     *       objeto
     * @returns [] devuelve un array de Listas
     */
    static searchAll(){
        let result = []
        for (const aux of Object.keys(localStorage)) {
            const data = this.searchList(aux)
            result.push(data)
        }
        return result
    }

    /**
     * creará una nueva lista begun exista o no. Sí existe. automáticamente, serializará todos sus objetos
     * @param list lista nueva o existente donde se guardaran los objetos o se creara
     */
    static save(list){
        if(this.searchList(list.name)!==null){
            localStorage.setItem(list.name, JSON.stringify(new List(list.name,[],list.svg)))
        }else{
            localStorage.setItem(list, JSON.stringify(new List(list.name,[])));
        }
    }

    /**
     * Función que devolve un objeto tipo 'List()' pero previamente lo buscara en el localStorage.
     * de modo que si existe devolve la lista completa, en caso contrario la generará
     * @param listName nombre de la lista que se buscara para posteriormente construirse
     * @returns {List} devolve la Lista, ya sea vacía o con contenido. Seguin exista o no exista previamente
     */
    static searchList(listName){
        let result = null;
        const data = JSON.parse(localStorage.getItem(listName))
        if(data!==null){
            result = new List(listName,TasksDAO.searchAll(listName))
            result.svg=data.svg
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