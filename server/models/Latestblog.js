const mongoose = require('mongoose');

const latestblogSchema = new mongoose.Schema({
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


module.exports = mongoose.model('Latestblog', latestblogSchema);