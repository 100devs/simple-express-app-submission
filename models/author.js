// The schema defines an author as having String SchemaTypes for the first and family names (required, with a maximum of 100 characters), and Date fields for the dates of birth
const mongoose = require('mongoose');
const {DateTime} = require("luxon");

const Schema = mongoose.Schema;
const AuthorSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
            maxlength: 100
        },
        family_name: {
            type: String,
            required: true,
            maxlength: 100
        }, date_of_birth: {
            type: Date
        }
    }
);
// Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get(function() {
// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
        let fullName = '';
        if (this.first_name && this.family_name) {
            fullName = `${this.family_name}, ${this.first_name}`
        } 
        return fullName;
    })

// Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(function () {
        return `/catalog/author/${this._id}`;
    });
AuthorSchema
    .virtual('date_of_birth_formatted')
    .get(function() {
        return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
    });

//Export model
// The first argument is the singular name of the collection that will be created for your model (Mongoose will create the database collection for the above model Author above), and the second argument is the schema you want to use in creating the model.
module.exports = mongoose.model('Author', AuthorSchema);