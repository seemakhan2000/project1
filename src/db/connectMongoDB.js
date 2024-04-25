const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://seema:seema38436065@cluster0.ow7iytj.mongodb.net/form";
async function connectToMongoDB() {
    
      try {
        await mongoose.connect(mongoDB);
        console.log('MongoDB is connected');
      } catch (error) {
        //console.error(`Unable to connect to the server: ${error}`);
        throw new Error(`Unable to connect to the server: ${error}`);

      }
    }
    module.exports = {
        connectToMongoDB  // Exporting mongoDB to use in other files
      };