var Itemdb = require('../model/model');

//create and save new item
exports.create = (req,res) =>{
    //validate request
    if(!req.body){
        res.status(400).send({message : 'Please add an item!'});
        return;
    }


    //new item
    const item = new Itemdb({
        item: req.body.item,
        category: req.body.category,
        quantity: req.body.quantity,
        gotIt: req.body.gotIt
    })

    //save item in the database

    item
        .save(item)
        .then(data =>{
            //res.send(data)
            res.redirect('/');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Oops! An error occured. Try adding your item again."
            });
        });
}


exports.find = (req,res) =>{

    if(req.query.id){
        const id = req.query.id;

        Itemdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({message: 'Could not find item with id ' + id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({message: "Oops! Could not find item"})
            })
    }else{
        Itemdb.find().sort('category')
        .then(item =>{
            res.send(item)
        })
        .catch(err =>{
            res.status(500).send({message: err.message || "Oops! An error occured when trying to get your item."})
        })
    }
}

exports.update = (req,res) =>{
    if(!req.body){
        return res
            .status(400)
            .send({message: "Oops! To update you must add something."})
    }

    const id = req.params.id;

    Itemdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data =>{
            if(!data){
                res.status(404).send({message : `Oops! Cannot update item. Maybe the item has not been added.`})
            }else{
                res.redirect('/')
            }
        })
        .catch(err =>{
            res.status(500).send({message: "Oops! An error occured when updating."})
        })
    
}


exports.delete = (req,res) =>{
    const id = req.params.id;

    Itemdb.findByIdAndDelete(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message: 'Cannot Delete with id'})
            }else{
                res.send({
                    message: "Item was deleted."
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Item."
            });
        });

}