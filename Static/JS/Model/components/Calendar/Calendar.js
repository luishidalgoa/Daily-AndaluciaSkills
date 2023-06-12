class Calendar{
    /**
     * @param currentDate hora seleccionada por el usuario o por defecto la de este momento
     */
    constructor(currentDate=moment()) {
        this.days=[] //Aquí guardaremos todos los días presentes en el mes del calendario
        this.currentDate=currentDate;
    }
    getHtml(){
        return `
            <div class="calendar d-flex flex-column shadow-lg p-3 gap-2 rounded-3" style="position: relative">
                <div class="calendar-header d-flex justify-content-between">
                    <svg class="control" xmlns="http://www.w3.org/2000/svg" width="15.688" height="27.98" viewBox="0 0 15.688 27.98">
                        <path id="Path_39" data-name="Path 39" d="M32.9,32.8,19.88,19.078,32.9,6.58" transform="translate(-18.118 -5.678)" fill="none" stroke="#cacbd2" stroke-width="2.5"/>
                    </svg>
                    <span class="MonthName">`+this.currentDate.format('MMMM YYYY')+`</span>
                    <svg class="control control-next" xmlns="http://www.w3.org/2000/svg" width="15.683" height="27.98" viewBox="0 0 15.683 27.98">
                        <path id="Path_38" data-name="Path 38" d="M18.86,32.8,31.874,19.078,18.86,6.58" transform="translate(-17.953 -5.678)" fill="none" stroke="#cacbd2" stroke-width="2.5"/>
                    </svg>
                </div>
                <div class="calendar-body">
                    <div class="header-days grid">
                        <span>Mo</span>
                        <span>Tu</span>
                        <span>We</span>
                        <span>Th</span>
                        <span>Fr</span>
                        <span style="font-weight: 600">Sa</span>
                        <span style="font-weight: 600">Su</span>
                    </div>
                    <div class="days-cells grid">
                        
                    </div>
                </div>
            </div>
        `
    }

    /**
     * @param day numero del día que se imprimirá
     * @param disabled Booleano. Si este booleano es true, significará que este día no pertenece al mismo mes por
     * lo que ese día estara desactivado en el calendario
     * @returns {string} Devuelve la estructura de un día del calendario
     */
    getDayHtml(day,disabled=true){
        if(disabled){
            disabled='day-cell-disable'
        }else{
            disabled=''
        }
        return `
            <div class="day-cell ${disabled}">
                <span>`+day+`</span>
            </div>
        `
    }
}