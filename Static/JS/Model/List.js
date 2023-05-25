class List {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    /**
     * Filtrará entre todas las tareas de la lista. Seguin cumpla con el texto filtrado
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

    deleteTasks() {


    }
    
    /**
     * Cuando se cree una tarea. este methods lo marsheara al localStorage
     */
    save() {
        localStorage.setItem(this.name, JSON.stringify(this.tasks))
    }

    /**
     * Podría llamarse también "SaveALL()"
     * Converter una lista de elementos tipo .task en objetos Task()
     * usuario. estas guarden su nueva position designada
     * @param aux NoteList con todos las tareas las cuales vamos a marshier a tipo Task
     */
    NodeList_toTask(aux) {
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
     * Se encargará de cargar lo necesario del localStorage.
     * Cargará: Las tareas.
     * Posteriormente, cargará a cada tarea le cargará todos los eventos propios de las tareas
     */
    loadLocalStorage() {
        if (localStorage.getItem(this.name) !== null) {
            const aux = JSON.parse(localStorage.getItem(this.name));
            for (const task of aux) {
                const newTask = new Task(task.id, task.Title, "", "")
                this.tasks.push(newTask)
            }
            this.updateTasksContainer()
        }
    }

    /**
     * Cuando creemos una nueva tarea o carguemos todas las tareas del localStorage.
     * Este methods será lanzado para insertar la tarea en el DOM.
     * posteriormente, actualizará los objetos que son draggable dentro de TaskContainer para agregarle
     * eventos
     */
    updateTasksContainer() {
        document.querySelector('#TaskContainer').innerHTML = "<div></div>"
        for (const task of this.tasks) {
            document.querySelector('#TaskContainer').innerHTML += task.getHtml()
            setTimeout(() => {
                task.initializeEvents()
            }, 1)
        }
        updateDraggables()

    }

    /**
     * Es
     * @param title
     * @returns {Task}
     */
    newTask(title) {
        const result = new Task(this.newID(), title, "", "");
        this.tasks.push(result)
        this.save()
        this.updateTasksContainer()
        return result;
    }

    /**
     * Genera un nuevo id auto incremental. Mientras exista un id, el puntero interno avanzara en +1
     * @returns {number} el valor del puntero el cual no lo posee ninguna otra tarea
     */
    newID(){
        let autoIncrement = 0;
        while (this.tasks.some(task => task.id == autoIncrement)) { //prefiero usar == en lugar === para que me lo compare en cualquier tipo de dato evitando asi errores
            autoIncrement++;
        }
        return autoIncrement;
    }

    barsActive() {
        this.menu_bars.children[0].classList.toggle('bars_active')
        this.menu_bars.children[1].classList.toggle('d-none')
        this.menu_bars.children[2].classList.toggle('bars_active')
    }


    /**
     * Este methods creará todos los eventos necesarios en el esqueleto html una vez insertado en el cuerpo
     * de una página web
     */
    initializeEvents() {
        //ANIMACION LOTTIE
        const animDelete= bodymovin.loadAnimation({
            wrapper: document.querySelector('#delete .container-svg'),
            animType: 'svg',
            loop: false,
            autoplay: false,
            path: 'https://lottie.host/258a6c86-fba6-4b0b-9ebc-64b9f1e72074/82fHo4oK3i.json'
        });

        //Buscamos todos los elementos interactivos de la página
        this.menu_bars = document.getElementById('bars');

        this.menu_bars.addEventListener('click', this.barsActive.bind(this));
        
        this.addTask()
        this.delete(animDelete);
    }

    /**
     * EVENTO:
     * creará un evento con todos los procedimientos para crear una tarea en el dom
     */
    addTask(){
        const formAdd = document.querySelector('footer form') //Formulario crear tarea

        formAdd.querySelector('button[type="submit"]').addEventListener('click', () => {
            this.newTask(formAdd.querySelector('input[type="text"]').value)
            formAdd.querySelector('input[type="text"]').value=""
        });

        formAdd.querySelector('input[type="text"]').addEventListener('focus', () => {
            formAdd.classList.add('form_active')
        })

        formAdd.querySelector('input[type="text"]').addEventListener('focusout', () => {
            formAdd.classList.remove('form_active')
        })
    }
    /**
     *  EVENTO: 
     * Evento eliminará las tareas seleccionadas por el usuario. La filosofía de este methods es devolver en forma de array
     * todas las tareas que no tengan activado el check. de modo que se eliminaran automáticamente todas aquellas que 
     * tengan el check
     */
    delete(animItem){
        const btnDelete= document.querySelector('nav ul #delete')
            btnDelete.addEventListener('click',()=>{
                if(document.querySelectorAll('.task input[type="checkbox"]:checked').length>0){
                    animItem.play()
                    animItem.addEventListener('complete', function() {
                        animItem.goToAndStop(0);
                    });
                }
                
                
               this.tasks = this.tasks.filter(function (value){
                    if(document.getElementById('Task_'+value.id).querySelector('input:checked')===null){
                        return value;
                    }
                })
                this.updateTasksContainer()
                this.NodeList_toTask(document.querySelectorAll('.task'))
            })
    }

    getHtml() {
        return `
        <div id="contains" class="p-0 w-100 h-100">
            <header class="p-2 d-flex justify-content-between align-items-center" style="background-color:rgb(103, 199, 195,.7);backdrop-filter: blur(10px)">
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
            <!--Modulo -->
            <div>
                
            </div>
            <section class="d-flex flex-column p-4">
                <nav class="">
                    <ul class="d-flex flex-row-reverse ml-auto">
                        <li id="delete" class="d-flex gap-1">
                            <div class="container-svg"></div>
                        </li>
                        <li class="d-flex gap-1" id="search">
                            <div></div>
                        </li>
                    </ul>
                </nav>
                <div id="TaskContainer" class="d-flex flex-column gap-3 swim-lane">
                
                </div>
            </section>
            <footer class="bg-clear">
                <form action="javascript:void(0);" class="d-flex bg-white">
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
                            fill="#003aff" />
                        <path
                            d="M29.3992 8.85H28.0492V6H30.2992C31.1992 6 31.7992 5.4 31.7992 4.5C31.7992 3.6 31.1992 3 30.2992 3H22.9492C22.0492 3 21.4492 3.6 21.4492 4.5C21.4492 5.4 22.0492 6 22.9492 6H25.1992V30H22.9492C22.0492 30 21.4492 30.6 21.4492 31.5C21.4492 32.4 22.0492 33 22.9492 33H30.2992C31.1992 33 31.7992 32.4 31.7992 31.5C31.7992 30.6 31.1992 30 30.2992 30H28.0492V27.15H29.3992C32.2492 27.15 34.4992 24.9 34.4992 22.05V13.95C34.4992 11.1 32.2492 8.85 29.3992 8.85ZM31.4992 22.05C31.4992 23.25 30.5992 24.15 29.3992 24.15H28.0492V11.85H29.3992C30.5992 11.85 31.4992 12.75 31.4992 13.95V22.05Z"
                            fill="#003aff" />
                    </svg>
                </form>
            </footer>
        </div>
        `
    }
}