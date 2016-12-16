export default class MouseListener {

    static onClick(idOfHtmlElement: string, callbackMethod: Function) {
        document.getElementById(idOfHtmlElement).addEventListener('click',(event) => callbackMethod(event),false);
    }

}