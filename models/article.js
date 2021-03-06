const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: { type: String, required: true },
    teaser: {type: String, required: true },
    link : {type: String, required: true },
    date: { type: Date, default: Date.now }, 
    note: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
