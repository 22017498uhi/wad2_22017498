'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//JSON schema for
var QuestionsSchema = new Schema({
    urltitle: {
        type: String,
        unique: true,
        required: true
    },
    qtype: String,
    fulltitle: String,
    qtext: String,
    metadata: String

});

module.exports = mongoose.model('Questions', QuestionsSchema);