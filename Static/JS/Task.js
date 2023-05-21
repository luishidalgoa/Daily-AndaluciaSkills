class Task{
    constructor(id,title,note,date) {
        this.id=id;
        this.Title=title;
        this.Note=note;
        this.Date= date;
    }
    editable(){

    }
    setId(Id){
        this.id=Id;
    }
    setTitle(Title){
        this.Title=Title;
    }
    setNote(note){
        if(note instanceof String){
            this.Note=note;
        }
    }
    setDate(date){
        this.Date=date;
    }

    /**
     * Construiremos la publicacion en torno a los valores definidos en el constructor
     * @returns {string}
     */
    getHtml(){
        return `
            <div id="Task_`+this.id+`" tabindex="-1" draggable="true" class="task d-flex bg-white flex-nowrap p-2 rounded-4 overflow-auto flex-wrap" style="align-items: center;">
                    <input type="checkbox" class="" name="" id="">
                    <span class="p-1">`+this.Title+`</span>
                    <svg id="calendar" class="" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M27.6269 6.9H25.3881V6C25.3881 5.1 24.791 4.5 23.8955 4.5C23 4.5 22.403 5.1 22.403 6V6.9H16.7313C15.8358 6.9 15.2388 7.5 15.2388 8.4C15.2388 9.3 15.8358 9.9 16.7313 9.9H22.5522V10.8C22.5522 11.7 23.1493 12.3 24.0448 12.3C24.9403 12.3 25.5373 11.7 25.5373 10.8V9.9H27.7761C28.8209 9.9 29.8657 10.8 29.8657 12V14.1H5.98507V12C5.98507 10.8 7.02985 9.9 8.22388 9.9H10.4627V10.8C10.4627 11.7 11.0597 12.3 11.9552 12.3C12.8507 12.3 13.4478 11.7 13.4478 10.8V8.4V6C13.4478 5.1 12.8507 4.5 11.9552 4.5C11.0597 4.5 10.4627 5.1 10.4627 6V6.9H8.22388C5.23881 6.9 3 9.15 3 12V26.4C3 29.25 5.23881 31.5 8.22388 31.5H27.7761C30.6119 31.5 33 29.25 33 26.4V12C32.8507 9.15 30.6119 6.9 27.6269 6.9ZM27.6269 28.5H8.22388C7.02985 28.5 5.98507 27.6 5.98507 26.4V17.1H29.8657V26.4C29.8657 27.6 28.8209 28.5 27.6269 28.5Z"
                            fill="black" />
                    </svg>
            </div>
        `
    }
}