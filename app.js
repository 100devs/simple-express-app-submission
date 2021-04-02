const express = require('express');
require('dotenv').config();
let db_str = process.env.db_str;
const app = express();

const PORT = 3000;

const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

mongoose.connect(db_str, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
}); // add to local mongoDB, and create todolistDB

const itemsSchema = {
	//create schema
	name: String,
};
const Item = mongoose.model('Item', itemsSchema); //Create model(collection), first parameter is the singular version of collection name.

const item1 = new Item({
	//create documents
	name: 'Welcome to the To Do List.',
});

const item2 = new Item({
	name: 'Hit the + button to add a new item.',
});

const item3 = new Item({
	name: 'Hit the checkbox to delete.',
});

const defaultItems = [item1, item2, item3];

app.get('/', (req, res) => {
	Item.find({}, (error, foundItems) => {
		if (foundItems.length === 0) {
			Item.insertMany(defaultItems, (e) => {
				if (e) {
					console.log(e);
				} else {
					('Added.');
				}
			});
			res.redirect('/');
		} else {
			res.render('list', { listTitle: 'Today', newListItems: foundItems });
		}
	}); //find all
});

app.post('/', (req, res) => {
	const itemName = req.body.newItem; //  grab the input field
	const item = new Item({
		name: itemName,
	});
	item.save(); //mongoose shortcut to save the item in collection
	res.redirect('/');
});

app.post('/delete', (req, res) => {
	const checkedItemId = req.body.checkbox;
	Item.findByIdAndRemove(checkedItemId, (err) => {
		if (!err) {
			console.log('successfully deleted.');
			res.redirect('/');
		} else {
			console.log(err);
		}
	});
});

app.post('/work', (req, res) => {
	let item = req.body.newItem;
	workItems.push(item);
	res.redirect('/work');
});

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
