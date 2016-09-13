var Document = require('camo').Document;

class Testimonial extends Document {
    constructor() {
        super();

        this.body = String;
        this.name = String;
        this.img  = String;
    }
}

module.exports = Testimonial;
