const db = require("../models");

// Defining methods for the articleControllers
module.exports = {
    create : function(req, res){
        console.log("in notesController, params:");
        console.log(req.params);
        console.log("in notesController, body:");
        console.log(req.body);
        db.Note.create(req.body)
               .then(dbNote =>{
                   console.log("dbNote", dbNote);
                   db.Article
                    .findOneAndUpdate({ _id: req.params.id}, {$push: {note: dbNote._id}}, {new:true, upsert: true})
                    .populate('note')
                    .exec((err, doc) =>{
                        if(err) {console.log(err)}
                        else{res.json(doc)}
                        })
                    })

               }
    }
