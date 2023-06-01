class ControllerTask{
    constructor() {
        const calendarController= new CalendarController('.container',moment())
    }
    initializeEvents() {
        const taskDOM = document.querySelector('#Task_' + this.id)
        this.editable(taskDOM)
        this.checked(taskDOM)

        taskDOM.addEventListener('focus', () => {
            taskDOM.setAttribute('tabindex', '0')
        })
        taskDOM.addEventListener('focusout', () => {
            setTimeout(()=>{
                if(!taskDOM.contains(document.activeElement)){
                    taskDOM.setAttribute('tabindex', '-1')
                }
            },1)
        })
    }

    /**
     * Creará el evento de actualizar el contentEditable del span. de modo que cuando se hace 2 clics sobre el elemento
     * se habilitara la edition. pero cuando pierda el focus esta se desactivara
     */
    editable(taskDOM) {
        taskDOM.querySelectorAll('span').forEach((value)=>{
            value.addEventListener('dblclick', () => { //permite edit el titulo
                value.setAttribute('contenteditable', 'true');
            })
            value.addEventListener('focusout', () => { //Deshabilita el edit cuando pierde el foco
                TasksDAO.saveAll(taskDOM.parentElement.querySelectorAll('.task'),controllerList.list)
                value.setAttribute('contenteditable', 'false');
            })
        })
    }

    /**
     * Evento:
     * Cuando se haga check en el input checkbox del DOM de la task. Se activará el menu nav de opciones
     */
    checked() {
        const btnDelete = document.querySelector('section nav #delete')
        const TaskContainer = document.querySelector('#TaskContainer')
        TaskContainer.querySelector('#Task_' + this.id).addEventListener('change', () => {
            if (document.querySelector('#TaskContainer').querySelectorAll('.task input[type="checkbox"]:checked').length <= 0) {
                document.querySelector('#delete').classList.remove('active')
            } else {
                document.querySelector('#delete').classList.add('active')
            }
        })
    }
}