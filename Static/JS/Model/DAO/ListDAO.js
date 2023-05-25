class ListDAO{
    /**
     * Función que devolve todas las listas Parseadas a Type: 'Task'
     */
    static searchAll(){

    }

    /**
     * Función que permitira agregar una lista al localStorage
     */
    static save(listName){
        localStorage.setItem(listName, JSON.stringify(TasksDAO.searchAll(listName)))
    }

    /**
     * Función que permit buscar una lista parseada a Type: 'Task' por su nombre
     */
    static searchList(listName){
        let result= TasksDAO.searchAll(listName)
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