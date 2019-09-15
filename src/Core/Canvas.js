import * as Constants from "../Constants";

export class Canvas {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    dashboardWidth = 225
    drawOffset = {
        x: 0,
        y: 0
    };
    ctx = null;

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.createCanvas();
    }

    createCanvas() {

        const canvas = document.createElement('canvas');
        canvas.id = "skiCanvas";
        canvas.width = this.width * window.devicePixelRatio;
        canvas.height = this.height * window.devicePixelRatio;
        canvas.style.width = (this.width - this.dashboardWidth) + 'px';
        canvas.style.height = this.height + 'px';

        this.ctx = canvas.getContext("2d");
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        document.body.appendChild(canvas);
        this.drawDashboard();

    }

    drawDashboard() {
        let node = document.createElement("div");
        let att = document.createAttribute("id");       // Create a "class" attribute
        att.value = "dashboard";                           // Set the value of the class attribute
        node.setAttributeNode(att);
        document.body.appendChild(node);

        let elem = document.querySelector('#dashboard');
        if (!elem)
            return;
        elem.style.width = this.dashboardWidth + 'px';
        elem.style.height = this.height
        elem.style.float = 'right';
        elem.innerHTML = `
            <div status ><br />Status : <span>Playing</span></div>
            <div scores ><br />Scores : <span>0</span></div>
            <div speed ><br />Speed : <span></span></div>
            <div><em><p>- <b>Down Arrow</b> key to move down or start the game<br />- <b>F </b>key to move the skier faster increases the speed by 1.
            <br />-<b> Space </b>key to jump<br />-<b> P </b>key to Pause/resume the game <br />
        `;


    }

    clearCanvas() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    setDrawOffset(x, y) {
        this.drawOffset.x = x;
        this.drawOffset.y = y;
    }

    drawImage(image, x, y, width, height) {
        x -= this.drawOffset.x;
        y -= this.drawOffset.y;

        this.ctx.drawImage(image, x, y, width, height);
    }
}