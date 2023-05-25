class ControllerList{
    constructor(name) {
        this.list=ListDAO.searchList(name);
    }

    /**
     * Se encarga de realizar todo el procedimiento para cargar correctamente cualquier lista
     * de tareas . De modo que primero insertara la base HTML para posteriormente cargar todas las tareas
     * asi como inicializar los eventos pertinentes de la lista de tareas
     */
    loadList(body){
        body.innerHTML += this.list.getHtml();
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
        TasksDAO.saveAll(document.querySelectorAll('.task'),this.list.name)
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

    barsActive() {
        this.menu_bars.children[0].classList.toggle('bars_active')
        this.menu_bars.children[1].classList.toggle('d-none')
        this.menu_bars.children[2].classList.toggle('bars_active')
    }


    /**
     * EVENTOS:
     * Este methods creará todos los eventos necesarios en el esqueleto html una vez insertado en el cuerpo
     * de una página web
     */
    initializeEvents() {
        //ANIMATION LOTTIE
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
        this.deleteTasks(animDelete);
        this.searchTasks()
    }

    /**
     * EVENTO:
     * creará un evento con todos los procedimientos para crear una tarea en el dom
     */
    addTask(){
        const formAdd = document.querySelector('footer form') //Formulario crear tarea

        formAdd.querySelector('button[type="submit"]').addEventListener('click', () => {
            this.list.tasks.push(this.newTask(formAdd.querySelector('input[type="text"]').value))
            this.updateTasksContainer()
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
     * @param animItem animación que se ejecutara cuando se cumpla la condición de que
     */
    deleteTasks(animItem){
        const btnDelete= document.querySelector('nav ul #delete')
        btnDelete.addEventListener('click',()=>{
            if(document.querySelectorAll('.task input[type="checkbox"]:checked').length>0){
                animItem.play()
                animItem.addEventListener('complete', function() {
                    animItem.goToAndStop(0);
                    document.querySelector('nav #delete').classList.remove('navActive')
                });
            }


            this.list.tasks = this.list.tasks.filter(function (value){
                if(document.getElementById('Task_'+value.id).querySelector('input:checked')===null){
                    return value;
                }
            })
            this.updateTasksContainer()
            TasksDAO.saveAll(document.querySelectorAll('.task'),this.list.name)
        })
    }

    /**
     * EVENTO:
     * Buscará entre todas las tareas de la lista seleccionada. Devolviendo un array con exclusivamente los elementos 
     * filtrados. Este método hará consultas de filtrado al TaskDAO
     */
    searchTasks(){
        const search = document.querySelector('#search')
        search.querySelector('div input[type="search"]').addEventListener('change',()=>{
            document.querySelector('#TaskContainer').innerHTML="<div></div>"
            const text = search.querySelector('div input[type="search"]').value;
            const result= TasksDAO.filter(text,this.list.name)
            for (const aux of result) {
                document.querySelector('#TaskContainer').innerHTML += aux.getHtml()
            }
        })
    }
}