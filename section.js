// export class Section {
class Section {
    constructor(titleElement) {
        this.title = titleElement;
        this.elements = [];
        this.subSecs = []
        this.state = true;
        this.previousState = true;
        this.order = parseInt(titleElement.tagName.substring(1));


        this.title.addEventListener("click", () => {
            this.toggle()
        })

        this.spaces = new Array((this.order - 1) * 2).fill(" ").join("")
    }

    create() {
        let currentElement = this.title.nextElementSibling;
        while (currentElement) {

            if (currentElement.tagName.startsWith("H")) {
                let currentElementOrder = parseInt(currentElement.tagName.substring(1));

                if (currentElementOrder <= this.order) {
                    return currentElement
                }
                else {
                    this.elements.push(currentElement)
                    const subSec = new Section(currentElement)
                    this.subSecs.push(subSec)
                    currentElement = subSec.create()

                    if (currentElement == null) { console.log("done"); continue; }
                    currentElementOrder = parseInt(currentElement.tagName.substring(1));
                    if (currentElementOrder <= this.order) {
                        return currentElement
                    }
                    continue;
                }
            }

            this.elements.push(currentElement);
            currentElement = currentElement.nextElementSibling;
        }

        return currentElement
    }

    toggle(toggleTo = null) {
        if (toggleTo != null) {
            this.toggleTo(toggleTo)
        }
        else {
            this.previousState = this.state;
            this.state = !this.state;
        }

        toggleTo = this.state ? "block" : "none"

        this.elements.forEach(element => {
            element.style.display = toggleTo
        })
        this.subSecs.forEach(subSec => {
            subSec.toggle(toggleTo)
        })
    }

    toggleTo(toggleTo) {
        if (toggleTo == "none") {
            this.previousState = this.state;
            this.state = false;
        }
        if (toggleTo == "block") {
            if (this.previousState) {
                this.previousState = this.state;
                this.state = true;
            }
            else {
                this.previousState = false;
                this.state = false;
            }
        }
    }

    log(msg) {
        console.log(this.spaces, msg)
    }
}

