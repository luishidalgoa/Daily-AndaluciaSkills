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
        if (localStorage.getItem(listName) !== null) {
            const aux = JSON.parse(localStorage.getItem(listName));
            for (const task of aux) {
                const newTask = new Task(task.id, task.Title, "", "")
                result.push(newTask)
            }
        }
        return result
    }

    /**
     * Podría llamarse también "SaveALL()"
     * Convierte una lista de elementos tipo .task en objetos Task()
     * usuario. estas guarden su nueva position designada
     * @param node NoteList con todos las tareas las cuales vamos a marshier a tipo Task
     * @param listName nombre de la lista en la que lo serializaremos
     */
    static saveAll(node,listName) {
        let result = []
        node.forEach((value) => {
            const id = value.id.replace(/^Task_/, '')
            const text = value.textContent.replace(/\n+/g, '\n').trim()
            const note = ""
            const date = ""
            result.push(new Task(id, text, note, date))
        })
        localStorage.setItem(listName, JSON.stringify(result))
    }
}