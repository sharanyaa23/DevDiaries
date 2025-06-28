const mongoose = require('mongoose');

const popularblogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is reuired.'
        },
        description: {
            type: String,
            required: 'This field is reuired.'
            },
            image: {
                type: String,
                required: 'This field is reuired.'
                },
                email: {
                    type: String,
                    required: 'This field is reuired.'
                    },
       

});

popularblogSchema.index({ name: 'text', description: 'text'});

module.exports = mongoose.model('Popularblog', popularblogSchema);