import mongoose from 'mongoose';
  const { Schema } = mongoose;

  const PersonSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    age: Number,
    favoriteFoods:   [String],
    
  });
  const Person = mongoose.model('Person', PersonSchema);

  export default  Person