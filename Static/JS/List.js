class List {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    /**
     * Filtrara entre todas las tareas de la lista. Segun cumpla con el texto filtrado
     * @param text
     * @returns {*}
     */
    filter(text) {
        return this.tasks.reduce((initial, value) => {
            if (value.Title.toUpperCase().includes(text.toUpperCase())) {
                initial.push(value)
            }
            return initial
        }, []);
    }

    prueba() {
        //Forma clasica de añadir un elemento a un array
        //sin modificar el original
        const animals = ['🐶', '😺', '🐷']
        const newanimals = animals.slice()
        newanimals.splice(1,0,'🐼')
        console.log(newanimals) // ['🐶','🐼', '😺', '🐷']

        //ECMAScript2023
        //topSpliced(startIndex,deleteCount,item1,item2,itemN)
        const newAnimals2= animals.toSpliced(1,0,'🐼')
        console.log(newanimals2)//['🐶','🐼', '😺', '🐷']
    }

    /**
     * Cuando se cree una tarea. este metodo lo marsheara al localStorage
     */
    save() {
        localStorage.setItem(this.name, JSON.stringify(this.tasks))
    }

    /**
     * Este metodo sera ejecutado cuando alteremos el orden de las tareas. de modo que cuando las reorganice el
     * usuario. estas guarden su nueva posicion designada
     * @param aux NoteList con todos las tareas las cuales vamos a marshear a tipo Task
     */
    saveAll(aux) {
        this.tasks = []
        aux.forEach((value) => {
            const id = value.id.replace(/^Task_/, '')
            const text = value.textContent.replace(/\n+/g, '\n').trim()
            const note = ""
            const date = ""
            this.tasks.push(new Task(id, text, note, date))
        })
        localStorage.setItem(this.name, JSON.stringify(this.tasks))
    }

    /**
     * Metodo que se encargara de cargar lo necesario del localStorage.
     * Cargara: Las tareas.
     * Posteriormente cargara a cada tarea le cargara todos los eventos propios de las tareas
     */
    loadLocalStorage() {
        if (localStorage.getItem(this.name) !== null) {
            const aux = JSON.parse(localStorage.getItem(this.name));
            for (const task of aux) {
                const newTask = new Task(task.id, task.Title, "", "")
                this.tasks.push(newTask)
                setTimeout(() => {
                    newTask.initializeEvents()
                }, 1)
            }
            this.loadTask()
        }
    }

    /**
     * Cuando creemos una nueva tarea o carguemos todas las tareas del localStorage.
     * Este metodo sera lanzado para insertar la tarea en el DOM.
     * posteriormente actualizara los objetos que son draggeables dentro de TaskContainer para agregarle
     * eventos
     */
    loadTask() {
        document.querySelector('#TaskContainer').innerHTML = "<div></div>"
        for (const task of this.tasks) {
            document.querySelector('#TaskContainer').innerHTML += task.getHtml()
        }
        updateDraggables()
    }

    /**
     * Es
     * @param title
     * @returns {Task}
     */
    newTask(title) {
        let autoIncrement = 0;
        while (this.tasks.some(task => task.id === autoIncrement)) {
            autoIncrement++;
        }
        const result = new Task(autoIncrement, title, "", "");
        this.tasks.push(result)
        this.save()
        this.loadTask()
        return result;
    }

    barsActive() {
        this.menu_bars.children[0].classList.toggle('bars_active')
        this.menu_bars.children[1].classList.toggle('d-none')
        this.menu_bars.children[2].classList.toggle('bars_active')
    }


    /**
     * Este metodo creara todos los eventos necesarios en el esqueleto html una vez insertado en el cuerpo
     * de una pagina web
     */
    loadEvents() {
        //Buscamos todos los elementos interactivos de la pagina
        this.menu_bars = document.getElementById('bars');
        this.add = document.querySelector('section form button[type="submit"]')
        this.add.addEventListener('click', () => {
            return this.newTask(this.add.parentElement.querySelector('input[type="text"]').value)
        });
        this.menu_bars.addEventListener('click', this.barsActive.bind(this));
    }

    getHtml() {
        return `
        <div id="contains" class="p-0 w-100 h-100 bg-coffe">
            <header class="p-2 bg-white d-flex justify-content-between align-items-center">
                <div id="bars" class="d-flex flex-column justify-content-center" style="width: 30px; height: 40px; margin-left: 10px">
                    <span class="d-block"
                        style="min-width: 100%;min-height: 3px;max-width: 100%;border-radius: 9px; background-color: black;"></span>
                    <span class="d-block"
                        style="min-width: 100%;min-height: 3px;max-width: 100%;border-radius: 9px; background-color: black; margin-top: 6px;"></span>
                    <span class="d-block"
                        style="min-width: 100%;min-height: 3px;max-width: 100%; border-radius: 9px; background-color: black; margin-top: 6px;"></span>
                </div>
                <div class="rounded-circle overflow-hidden bg-secondary img-content h-100" id="like">
                    <img src="../Static/images/User.png" class="img-fluid img-zoom h-100" alt="">
                </div>
                <svg style="height:2.2em;" id="delete" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M31.5 20.25C30.6 20.25 30 20.85 30 21.75V25.5C30 28.05 27.9 30.15 25.35 30.15H10.65C8.1 30 6 27.9 6 25.35V10.65C6 8.1 8.1 6 10.65 6H16.65C16.95 6 17.4 6 17.7 6.15V10.65C17.7 14.85 21.15 18.3 25.35 18.3H31.5C32.1 18.3 32.7 18 32.85 17.4C33.15 16.8 33 16.2 32.55 15.75L22.05 5.25C20.55 3.75 18.75 3 16.65 3H10.65C6.45 3 3 6.45 3 10.65V25.35C3 29.55 6.45 33 10.65 33H25.35C29.55 33 33 29.55 33 25.35V21.6C33 20.85 32.4 20.25 31.5 20.25ZM20.7 8.1L27.9 15.3H25.35C22.8 15.3 20.7 13.2 20.7 10.65V8.1V8.1Z"
                        fill="black" />
                </svg>
            </header>
            <section class="d-flex flex-column p-4 gap-7 ">
                <form action="javascript:void(0);" class="d-flex rounded-4 bg-white">
                    <button type="submit" class="rounded-1">
                        <svg style="height: 2em;" viewBox="0 0 24 24">
                            <g data-name="Layer 2">
                                <g data-name="plus-circle">
                                    <rect width="24" height="24" opacity="0" />
                                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" style="fill:#003aff;" />
                                    <path d="M15 11h-2V9a1 1 0 0 0-2 0v2H9a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2z" style="fill: #003aff" />
                                </g>
                            </g>
                        </svg>
                    </button>
                    <input type="text" placeholder="New task...">
                    <svg style="height: 2em;" class="mt-1" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M23.25 25.6496C23.25 24.7496 22.65 24.1496 21.75 24.1496H6.6C5.4 24.1496 4.5 23.2496 4.5 22.0496V13.9496C4.5 12.7496 5.4 11.8496 6.6 11.8496H21.75C22.65 11.8496 23.25 11.2496 23.25 10.3496C23.25 9.44961 22.65 8.84961 21.75 8.84961H6.6C3.75 8.84961 1.5 11.0996 1.5 13.9496V22.0496C1.5 24.8996 3.75 27.1496 6.6 27.1496H21.75C22.5 27.1496 23.25 26.5496 23.25 25.6496Z"
                            fill="black" />
                        <path
                            d="M29.3992 8.85H28.0492V6H30.2992C31.1992 6 31.7992 5.4 31.7992 4.5C31.7992 3.6 31.1992 3 30.2992 3H22.9492C22.0492 3 21.4492 3.6 21.4492 4.5C21.4492 5.4 22.0492 6 22.9492 6H25.1992V30H22.9492C22.0492 30 21.4492 30.6 21.4492 31.5C21.4492 32.4 22.0492 33 22.9492 33H30.2992C31.1992 33 31.7992 32.4 31.7992 31.5C31.7992 30.6 31.1992 30 30.2992 30H28.0492V27.15H29.3992C32.2492 27.15 34.4992 24.9 34.4992 22.05V13.95C34.4992 11.1 32.2492 8.85 29.3992 8.85ZM31.4992 22.05C31.4992 23.25 30.5992 24.15 29.3992 24.15H28.0492V11.85H29.3992C30.5992 11.85 31.4992 12.75 31.4992 13.95V22.05Z"
                            fill="black" />
                    </svg>
                </form>
                <div id="TaskContainer" class="d-flex flex-column gap-3 swim-lane">
               
                </div>
            </section>
        </div>
        `
    }
}