const mongoose=require("mongoose")
const initData=require("./data.js")
const Workout=require("../models/workout.js");


const MONGO_URL="mongodb://127.0.0.1:27017/gym";
main().then(()=>{
    console.log("connection successful")
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL); 
}


const initDB=async()=>{
    await Workout.deleteMany({});
    await Workout.insertMany(initData.data);
    console.log("data was initialised");
};

initDB();