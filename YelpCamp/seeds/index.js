const mongoose = require("mongoose");
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const Campground = require("../models/campground")

mongoose.connect('mongodb://localhost:27017/yelp-camp', {  // it has some logic that says use development database or if it is in production use production database
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});    

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]     // passing the array and return a random element from array

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0; i<300; i++)                             // getting first 50 locations from the database
    {
        const random1000 = Math.floor(Math.random() * 1000);   // detting a random number from the 1000 numbers
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '6070cfd4b0dcc825a03899fd',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,   // grtting a city and its state from the array with the help of random  no. 
            title: `${sample(descriptors)} ${sample(places)}`,      // returns a name from descriptors array and places array from seedHelpers.js
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nisi aperiam animi esse et, repudiandae fugit explicabo ea quasi minus praesentium, molestias soluta suscipit voluptates saepe? Earum aut eos soluta?',
            price,
            geometry: { 
                type : "Point", 
                coordinates : [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ] 
            },
            images:  [
                {
                    url: 'https://res.cloudinary.com/dpxkwwnfk/image/upload/v1618178482/YelpCamp/k46mx3vwyb7nipupirde.jpg',
                    filename: 'YelpCamp/k46mx3vwyb7nipupirde'
                  },
                {
                  url: 'https://images.unsplash.com/photo-1610413341456-e283a1c6026f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGFtYXpvbiUyMGZvcmVzdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
                  filename: 'YelpCamp/g1ojq5qsljwpy3prlsrg'
                },
                {
                  url: 'https://res.cloudinary.com/dpxkwwnfk/image/upload/v1618178491/YelpCamp/ur7kxtwuw065ab2ssnfn.jpg',
                  filename: 'YelpCamp/ur7kxtwuw065ab2ssnfn'
                }
              ] 
        })
        await camp.save();
    }
}

seedDB().then(() => {          // seedDB return a promise and closes the connection from database
    mongoose.connection.close();

})