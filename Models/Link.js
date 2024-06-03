import mongoose from 'mongoose';

const { Schema } = mongoose; // Importing Schema directly from the mongoose module

const clickSchema = new Schema({ // Defining the schema for click documents
    insertedAt: { type: Date, default: Date.now }, // Date when the click was inserted, defaults to current date
    ipAddress: { type: String, required: true } // IP address of the user who clicked, required field
});

const linkSchema = new Schema({ // Defining the schema for link documents
    originalUrl: String, // Original URL before shortening
    clicks: [clickSchema], // Array of click documents, using the clickSchema defined earlier
    targetParamName: String, // Name of the parameter in the URL
    targetValues: [{ // Array of objects representing target values
        name: String, // Name of the source
        value: String // Value that will appear in the target parameter in the URL
    }]
});

const Link = mongoose.model('Link', linkSchema); // Creating the Link model based on the linkSchema

export default Link;
