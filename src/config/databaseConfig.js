const mongoose = require("mongoose")
const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://user4203:42039133@cluster0.jos22gx.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
    // d33h5c6yDCE9JSjs
};

module.exports = connect;
