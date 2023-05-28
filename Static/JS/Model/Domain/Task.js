class Task {
    constructor(id, title, note, date) {
        this.id = id;
        this.Title = title;
        this.Note = note;
        this.Date = date;
    }

    initializeEvents() {
        const taskDOM = document.querySelector('#Task_' + this.id)
        this.editable(taskDOM)
        this.checked(taskDOM)

        taskDOM.addEventListener('focus', () => {
            taskDOM.setAttribute('tabindex', '0')
        })
        taskDOM.addEventListener('focusout', () => {
            taskDOM.setAttribute('tabindex', '-1')
        })
    }

    /**
     * Creará el evento de actualizar el contentEditable del span. de modo que cuando se hace 2 clics sobre el elemento
     * se habilitara la edition. pero cuando pierda el focus esta se desactivara
     */
    editable(taskDOM) {
        taskDOM.querySelector('span').addEventListener('dblclick', () => { //permite edit el titulo
            document.querySelector('#Task_' + this.id).querySelector('span').setAttribute('contenteditable', 'true');
        })

        taskDOM.querySelector('span').addEventListener('focusout', () => { //Deshabilita el edit cuando pierde el foco
            TasksDAO.saveAll(taskDOM.parentElement.querySelectorAll('.task'),controllerList.list)
            document.querySelector('#Task_' + this.id).querySelector('span').setAttribute('contenteditable', 'false');
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
                btnDelete.classList.remove('navActive')
            } else {
                btnDelete.classList.add('navActive')
            }
        })
    }

    /**
     * Construiremos la publication en torno a los valores definidos en el constructor
     * @returns {string}
     */
    getHtml() {
        return `
            <div id="Task_` + this.id + `" tabindex="-1" draggable="true" class="task d-flex bg-white flex-nowrap p-2 overflow-auto flex-wrap" style="align-items: center;">
                    <div class="checkbox-wrapper-12">
                      <div class="cbx">
                        <input class="d-none" id="cbx-12" type="checkbox">
                        <label for="cbx-12"></label>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                          <path d="M2 8.36364L6.23077 12L13 2"></path>
                        </svg>
                      </div>
                    </div>
                    <span contenteditable="false" class="p-1">` + this.Title + `</span>
                    <svg id="calendar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke-width="2.5" stroke="#CACBD2" fill="none" class="duration-300 transform transition-all"><rect x="9.59" y="9.59" width="44.82" height="44.82" rx="2.5"></rect><path d="M9.59 20.59h44.82M19.7 9.59v-5M43.66 9.59v-5M16.14 27.92h6.15v6.15h-6.15zM28.78 27.92h6.15v6.15h-6.15zM41.26 27.92h6.15v6.15h-6.15zM16.36 39.68h6.15v6.15h-6.15zM29.01 39.68h6.15v6.15h-6.15zM41.49 39.68h6.15v6.15h-6.15z"></path></svg>
            </div>
        `
    }
}