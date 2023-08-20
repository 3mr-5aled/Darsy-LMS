const mongoose = require("mongoose");

const Owner = new mongoose.Schema(
    {
        name: {
            require: true,
            type: String,
            unique: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
        },
        features: [
            {
                name: String,
                description: String,
            }
        ],
        testimonialsData: [
            {
                name: String,
                subject: String,
                quote: String,
                rating: Number,
            }
        ],
        heroSection: {
            title: String,
            description: String,
            photo: String,
        },
        logo: {
            type:String,
            required:true
        },
        phone: {
            type:String,
            required:true
        },
        whatsappLink: String,
        youtubeLink: String,
        facebookLink: String,
        instagramLink: String,
        twitterLink: String,
        linkedinLink: String,
        githubLink: String
    },
    { timestamps: true }
);
module.exports = mongoose.model("owners", Owner);
