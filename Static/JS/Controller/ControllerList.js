class ControllerList {
    constructor(list) {
        this.list=list;
    }

    /**
     * Se encarga de realizar todo el procedimiento para cargar correctamente cualquier lista
     * de tareas . De modo que primero insertara la base HTML para posteriormente cargar todas las tareas
     * asi como inicializar los eventos pertinentes de la lista de tareas
     */
    loadList(body) {
        body.innerHTML = this.list.getHtml();
        body.querySelector('#contains');
        this.initializeEvents();
        this.updateTasksContainer()
    }

    /**
     * Cuando creemos una nueva tarea o carguemos todas las tareas del localStorage.
     * Este methods será lanzado para insertar la tarea en el DOM.
     * posteriormente, actualizará los objetos que son draggable dentro de TaskContainer para agregarle
     * eventos
     */
    updateTasksContainer() {
        document.querySelector('#TaskContainer').innerHTML = "<div></div>"
        for (const task of this.list.tasks) {
            document.querySelector('#TaskContainer').innerHTML += task.getHtml()
            setTimeout(() => {
                task.initializeEvents()
            }, 1)
        }
        TasksDAO.saveAll(document.querySelectorAll('.task'), this.list)
        updateDraggables()
    }

    /**
     * Este methods creará una nueva tarea y la guardará en el localStorage. Para posteriormente recargar todo el panel
     * de tareas
     * @param title titulo de la tarea
     * @returns {Task} a continuation retornara el objeto de la nueva tarea creada
     */
    newTask(title) {
        return new Task(this.list.newID(), title, "", "");
    }


    /**
     * EVENTOS:
     * Este methods creará todos los eventos necesarios en el esqueleto html una vez insertado en el cuerpo
     * de una página web
     */
    initializeEvents() {
        //ANIMATION LOTTIE
        const animDelete = bodymovin.loadAnimation({
            wrapper: document.querySelector('#delete .container-svg'),
            animType: 'svg',
            loop: false,
            autoplay: false,
            path: 'https://lottie.host/258a6c86-fba6-4b0b-9ebc-64b9f1e72074/82fHo4oK3i.json'
        });
        //Buscamos todos los elementos interactivos de la página
        this.addTask()
        this.deleteTasks(animDelete);
        this.searchTasks()
        this.bars()
        this.addList()
        this.resize()
        window.addEventListener('resize', () => {
            this.resize()
        })
    }

    resize() {
        const menu_bars = document.getElementById('bars')
        if (window.innerWidth >= 768) {
            menu_bars.children[0].classList.remove('bars_active')
            menu_bars.children[1].classList.remove('d-none')
            menu_bars.children[2].classList.remove('bars_active')
            if (!document.getElementById('menuList').classList.contains('active')) {
                this.menuList()
            }
        } else {
            document.getElementById('menuList').classList.remove('active')
        }
    }

    /**
     * EVENTO:
     * creará un evento con todos los procedimientos para crear una tarea en el dom
     */
    addTask() {
        const formAdd = document.querySelector('footer form') //Formulario crear tarea

        formAdd.querySelector('button[type="submit"]').addEventListener('click', () => {
            const value = formAdd.querySelector('input[type="text"]').value
            if (value.length > 0) {
                this.list.tasks.push(this.newTask(value))
                this.updateTasksContainer()
                formAdd.querySelector('input[type="text"]').value = ""
            }
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
     * @param animItem animación que se ejecutara cuando se cumpla la condición de que
     */
    deleteTasks(animItem) {
        const btnDelete = document.querySelector('nav ul #delete')
        btnDelete.addEventListener('click', () => {
            if (document.querySelectorAll('.task input[type="checkbox"]:checked').length > 0) {
                animItem.play()
                animItem.addEventListener('complete', function () {
                    animItem.goToAndStop(0);
                    document.querySelector('nav #delete').classList.remove('navActive')
                });
            }


            this.list.tasks = this.list.tasks.filter(function (value) {
                if (document.getElementById('Task_' + value.id).querySelector('input:checked') === null) {
                    return value;
                }
            })
            this.updateTasksContainer()
            TasksDAO.saveAll(document.querySelectorAll('.task'), this.list)
        })
    }

    /**
     * Evento:
     * creará un evento en el que cuando se clicke sobre elemento del Header 'bars'
     * de modo que se mostrara el formulario del método getMenuHTML() del objeto List()
     * para posteriormente construir elementos <li> de la lista que se mostrara. si esta no esta insertada
     * previamente en el ul del formulario
     */
    bars() {
        const menu_bars = document.getElementById('bars')
        menu_bars.addEventListener('click', () => {
            menu_bars.children[0].classList.toggle('bars_active')
            menu_bars.children[1].classList.toggle('d-none')
            menu_bars.children[2].classList.toggle('bars_active');
            this.menuList()
        });
    }

    /**
     * Este componente cargara todo lo necesario para que el menu de listas se ejecute correctamente
     * Este menu mostrara todas las listas del usuario ademas de permitir un "Crud" de ellas
     */
    menuList() {
        const menuList = document.getElementById('menuList')
        const ul = document.querySelector('#menuList ul')
        const lists = ul.querySelectorAll('li')

        ListDAO.searchAll().filter(function (value) { //value = List
            let boolean = false; //¿existe?
            const id = value.name.trim().replace(/\s/g, "")
            for (let i = 0; i < lists.length && !boolean; i++) {
                if (id === lists[i].id) {
                    boolean = true;
                }
            }
            if (!boolean) { //SI NO EXISTE EN EL DOM ENTONCES CARGAMOS LA LISTA EN EL MENU
                ul.innerHTML += value.getMenuHtml(value)

                setTimeout(() => {
                    ul.querySelector('#' + id).addEventListener('click', () => {
                        console.log('cdd')
                        controllerList = new ControllerList(value)
                        controllerList.loadList(document.querySelector('body'))
                    })
                }, 1)
            }
        })
        menuList.classList.toggle('active')
        if (!menuList.classList.contains('active')) {
            ul.innerHTML = ''
        }
    }

    /**
     * En el formulario de la lista se podrá crear una nueva lista. Este método creará la nueva lista si el campo
     * input no está vació. Si la crea, redireccionará al usuario a esa nueva lista
     */
    addList() {
        const form = document.querySelector('#menuList')
        form.querySelector('#addList button').addEventListener('click', () => {
            if (form.querySelector('#addList input[type="text"]').value.length > 0 && localStorage.getItem(form.querySelector('#addList input[type="text"]').value) === null) {
                ListDAO.save(ListDAO.searchList(form.querySelector('#addList input[type="text"]').value))
                controllerList = new ControllerList(ListDAO.searchList(form.querySelector('#addList input[type="text"]').value))//Le pasamos el nombre de la lista
                controllerList.loadList(document.querySelector('body'))
            }
        })
    }

    /**
     * EVENTO:
     * Buscará entre todas las tareas de la lista seleccionada. Devolviendo un array con exclusivamente los elementos
     * filtrados. Este método hará consultas de filtrado al TaskDAO
     */
    searchTasks() {
        const search = document.querySelector('#search')
        search.querySelector('div input[type="search"]').addEventListener('change', () => {
            document.querySelector('#TaskContainer').innerHTML = "<div></div>"
            const text = search.querySelector('div input[type="search"]').value;
            const result = TasksDAO.filter(text, this.list.name)
            for (const aux of result) {
                document.querySelector('#TaskContainer').innerHTML += aux.getHtml()
            }
        })
    }
}