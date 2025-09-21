const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const workoutSchema=new Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  for later when there is userdatabase
  exercise: String, 
  weight:Number,
  reps: Number,

  date: { type: Date, default: Date.now }
});

const Workout=mongoose.model("Workout",workoutSchema);
module.exports=Workout;