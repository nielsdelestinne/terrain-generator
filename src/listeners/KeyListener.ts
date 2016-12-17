export default class KeyListener {

    static onRightArrowPressed(callbackMethod: Function) {
        window.addEventListener('keydown',(event) => {
            if(event.keyCode === 39) callbackMethod(event)
        },true);
    }

    static onLeftArrowPressed(callbackMethod: Function) {
        window.addEventListener('keydown',(event) => {
            if(event.keyCode === 37) callbackMethod(event)
        },true);
    }

    static onUpArrowPressed(callbackMethod: Function) {
        window.addEventListener('keydown',(event) => {
            if(event.keyCode === 38) callbackMethod(event)
        },true);
    }

    static onDownArrowPressed(callbackMethod: Function) {
        window.addEventListener('keydown',(event) => {
            if(event.keyCode === 40) callbackMethod(event)
        },true);
    }

}