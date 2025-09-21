const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Workout=require("./models/workout.js");

const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const MONGO_URL="mongodb://127.0.0.1:27017/gym";
main().then(()=>{
    console.log("connection successful")
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL); 
}


// root
app.get("/",(req,res)=>{
    res.send("root working");
});

// index route
app.get("/workouts",async(req,res)=>{
    const allWorkouts=await Workout.find({});
    res.render("workouts/index.ejs",{allWorkouts});
});

// new
app.get("/workouts/new",(req,res)=>{
    res.render("workouts/new.ejs");
})

//post
app.post("/workouts",async(req,res)=>{
    const newWorkout=new Workout(req.body.workout);
    await newWorkout.save();
    res.redirect("/workouts");
})

// edit
app.get("/workouts/:id/edit",async(req,res)=>{
    let{id}=req.params;
    const workout=await Workout.findById(id);
    res.render("workouts/edit.ejs",{workout});
})

// update
app.put("/workouts/:id",async(req,res)=>{
    let{id}=req.params;
    await Workout.findByIdAndUpdate(id,{...req.body.workout});
    res.redirect(`/workouts/${id}`);
})


// delete
app.delete("/workouts/:id",async(req,res)=>{
    let{id}=req.params;
    let deletedWorkout=await Workout.findByIdAndDelete(id);
    res.redirect("/workouts");

})

// show
app.get("/workouts/:id",async(req,res)=>{
    let{id}=req.params;
    const workout=await Workout.findById(id);
    res.render("workouts/show.ejs",{workout});
});




app.listen(8080,()=>{
    console.log("server listening on 8080");
});