class TasksDAO{
    /**
     * Filtrará entre todas las tareas de la lista. Seguin cumpla con el texto filtrado
     * @param text texto que filtraremos
     * @param listName nombre de la lista en la que buscaremos la tarea filtrada
     * @returns {*} retornara un array con todos las tareas encontradas
     */
    static filter(text,listName) {
        return this.searchAll(listName).reduce((initial, value) => {
            if (value.Title.toUpperCase().includes(text.toUpperCase())) {
                initial.push(value)
            }
            return initial
        }, []);
    }

    /**
     * Se encargará de cargar lo necesario del localStorage.
     * Cargará: Las tareas.
     * Posteriormente, cargará a cada tarea le cargará todos los eventos propios de las tareas
     * @returns {*[]}: devuelve todas las tareas
     */
    static searchAll(listName) {
        let result=[]
        if (JSON.parse(localStorage.getItem(listName)).tasks) {
            const aux = JSON.parse(localStorage.getItem(listName));
            for (const task of aux.tasks) {
                const newTask = new Task(task.id, task.Title, task.Note, "")
                result.push(newTask)
            }
        }
        return result
    }

    /**
     * Serializa una lista completa en el localStorage. Incluyendo sus tareas y demás campos. La impedancia de datos
     * es de tipo Eager. Ya que serializamos un tipo List y dentro de él una colección de tipo Task
     * @param node nodo de elementos 
     * @param list lista que vamos a serializar
     */
    static saveAll(node,list) {
        let result = []
        node.forEach((value) => {
            const id = value.id.replace(/^Task_/, '')
            const text = value.querySelector('div span').textContent.replace(/\n+/g, '\n').trim()
            const note = value.querySelector('.TaskNote span').textContent.replace(/\n+/g, '\n').trim()
            const date = ""
            result.push(new Task(id, text, note, date))
        })
        list.tasks=result
        result=list;
        localStorage.setItem(list.name, JSON.stringify(result))
    }
}