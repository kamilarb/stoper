class Timer {
    constructor() {
        this.controls = $(".controls");
        this.display = document.querySelector(".disp");
        this.lapDiv = $(".laps");
        this.laps = [];
        this.run;
        this.running;
        this.counter = 1;
        this.saved = $(".saved");

        this.controls.on("click", "button", (event) => {
            
            const op = event.target.dataset.op;
            this.opType = this.ops[op];
            this.opType();
        });
    
}
    ops = {
        "start": this.start,
        "stop": this.stop,
        "lap": this.lap,
        "reset": this.reset,
        "save": this.save
    }

      
    start() {

    let timeStart = Date.now();

        this.run = setInterval(() => {
    
        this.running = Date.now() - timeStart;
        this.display.textContent = this.show(this.running);

    }, 10);
 
    };


    stop() {
    clearInterval(this.run)
    }

    lap() {
        let actualTimer = this.running,     
        previousLap = this.laps.length == 0 ? 0 : this.laps[this.laps.length-1],
        actualLap = actualTimer - previousLap;

        this.laps.push(actualTimer);
        

this.lapDiv.prepend(`<h5 class="mt-0">${this.counter}: ${this.show(actualLap)}</h5>`)
   
        this.counter++

    }

    reset() {
    this.display.textContent = "00:00:000";
    this.lapDiv.empty();
    this.laps = [];
    this.counter = 1;

    }

    save(){
        this.saved.prepend(this.lapDiv.clone().addClass("save").removeClass("laps"));
        this.saved.prepend(`<div class="save"><hr><h5 class="mt-0">Your saved laps</h5></div>`)
        var button = $(".clear");

        button.css("display", "block")
        
        $(".saved").on("click", "button", (event) => {
                $(".save").remove();
                button.css("display", "none")

        })
    }

    show(ms) {
        let dateMs = new Date(ms),
            miliseconds = dateMs.getUTCMilliseconds(),
            seconds = dateMs.getUTCSeconds() < 10 ? `0${dateMs.getUTCSeconds()}` : dateMs.getUTCSeconds(),
            minutes = dateMs.getUTCMinutes() < 10 ? `0${dateMs.getUTCMinutes()}` : dateMs.getUTCMinutes();

            if (miliseconds < 10) {
                miliseconds = `00${miliseconds}`;
            } else if (miliseconds <100 ) {
                miliseconds = `0${miliseconds}`
            }
            
            return `${minutes}:${seconds}:${miliseconds}`

    }
    
}

const stoper = new Timer();