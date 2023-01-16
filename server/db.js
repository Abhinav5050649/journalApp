const mongoose = require(`mongoose`);

//const URL = `mongodb+srv://abhinavsharma:abhinav1234@cluster0.9ihv5pr.mongodb.net/testdbs?retryWrites=true&w=majority`

const connectToMongo = () => {
    mongoose.connect(URL, () => {
        console.log(`Connected to database!`)
    })
};

module.exports = connectToMongo;