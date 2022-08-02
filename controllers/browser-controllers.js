const Entry = require('../models/entry')
const { validationResult } = require('express-validator')

const getEntries = async (req, res, next) => {
    let entries;
    try {
        entries = await Entry.find({})
    } catch (error) {
        return next(error)
    }
    res.render('index.ejs', { entries })
}

const getDocPage = (req, res, next) => {
    res.render('doc.ejs')
}

const getEditPage = (req, res, next) => {
    res.render('crud.ejs')
}

const getCategory = async (req, res, next) => {
    const category = req.params.category.toLowerCase()
    let entries;
    try {
        entries = await Entry.find({ category: category })
    } catch (error) {
        return next(error)
    }
    if (entries.length) {
        res.render('index.ejs', {entries})
    } else {
        res.render('index.ejs', {entries: {warning: 'Nothing found in this search'}})
    }
}

const searchEntries = async (req, res, next) => {
    const query = req.params.query.toLowerCase()
    let entries;
    try {
        entries = await Entry.aggregate().search({
                'index': 'corporate-entries',
                'text': {
                    'query': query,
                    'path': {
                    'wildcard': '*'
                    },
                    'fuzzy':{
                    'maxEdits': 2,
                    'prefixLength': 3
                    }
                }
                }
        )
    } catch (error) {
        return next(error)
    }
    if (entries.length) {
        res.render('index.ejs', {entries})
    } else {
        res.render('index.ejs', {entries: {warning: 'Nothing found in this search'}})
    }
}

const createEntry = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return next(alert(new Error('Invalid inputs.')))
    }
    Entry.create(req.body)
    .then(result => {
        res.redirect('/crud')
        console.log('Entry successfully created.')
        })
        .catch(error => 
            console.error(error)
        )
    }

const editEntry = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        console.log(errors)
        return next(alert('Invalid input.'))
    }

    await Entry.findByIdAndUpdate(req.body.patchid, {original: req.body.original, corporate: req.body.corporate, category: req.body.category}, {
        new: true,
        upsert: false
    } )
    try{
        res.status(200).redirect('/crud')
        console.log('Entry successfully edited.')
    }catch(err){
        console.log(err)
    }
    }

const deleteEntry = async (req, res, next) => {
    await Entry.findByIdAndDelete(req.body.deleteid)
    try{
        res.status(200).redirect('/crud')
        console.log('Entry successfully deleted.')
    }catch(err){
        console.log(err)
    }
}

exports.getEntries = getEntries
exports.getDocPage = getDocPage
exports.getEditPage = getEditPage
exports.getCategory = getCategory
exports.searchEntries = searchEntries
exports.createEntry = createEntry
exports.editEntry = editEntry
exports.deleteEntry = deleteEntry