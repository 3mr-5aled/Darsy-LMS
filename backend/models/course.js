const mongoose = require('mongoose');

const Courses =new mongoose.Schema({
    
}, { timestamps: true });

module.exports = mongoose.model('courses', Courses);
