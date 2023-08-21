const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    name: String,
    subject: String,
    quote: String,
    rating: Number,
});
const featureSchema = new mongoose.Schema({
    name: String,
    description: String,
    icon: String, // You can store the icon data here
});
const Owner = new mongoose.Schema(
    {
        name:  {
            type: String,
            require: true,
            unique: true
        },
        ownerName: String,
        description: String,
        password: {
            type: String,
            require: true,
        },
        websiteDetails: {
            name: String,
            url: String,
            description: String,
            logo: String,
            keywords: String,
            author: String,
            email:  {
                type: String,
                require: true,
                unique: true
            },
            phone: String,
            whatsappLink: String,
            youtubeLink: String,
            facebookLink: String,
            instagramLink: String,
            twitterLink: String,
            linkedinLink: String,
            githubLink: String,
            testimonials: {
                heading1: String,
                heading2: String,
                description: String,
                testimonialsData: [testimonialSchema],
            },
            hero: {
                heading: String,
                body: String,
                image: String,
                button: String,
            },
            features: {
                heading: String,
                paragraph1: String,
                paragraph2: String,
                featuresData: [featureSchema],
            },
        },
        premium: {
            membership: Boolean,
        },
        plugins: {
            paytabs: {
                profileId: Number,
                serverKey: String,
            },
            tawkChat: {
                embedUrl: String,
            },
    }
    },
{ timestamps: true }
);
module.exports = mongoose.model("owners", Owner);
