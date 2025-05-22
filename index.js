const express = require("express");
const mongoose = require("mongoose");


const app = express()
mongoose.connect("$$mongo$$")
.then(()=>{
  console.log("Connect");
}
).catch((error)=>{
  console.error("Can't Connect",error)
})
app.listen(3000,()=>{
    console.log("server RUN!!!")
});
app.use(express.json());


const Schema=mongoose.Schema;
const taskSchema = new Schema({
    task:String,
    done:{
        type:Boolean,
        default:false
    }

}, { versionKey:false})
const Task = mongoose.model("Task",taskSchema)


 // =============create===================

app.post("/todos",async(req,res)=>{
  const Task1 = new Task()
  Task1.task=req.body.task
  Task1.done=req.body.done
  try{
  await Task1.save()
   res.status(201).json(Task1)
   console.log ("add new task successfully")
  }catch(error){
    console.error(error)
    res.status(500).json({message:"there is error,try again",error})
  }
 
})//===============fetch all==========================
app.get("/todos",async (req,res)=>{
  try{ const task = await Task.find()
  res.status(200).json(task)
  console.log("fetch all data successfully")

  }catch(error){
      console.error(error)
      res.status(500).json({message:"Error happend when you trying to fetch all tasks",error})
  }
 


})
//=================update======================
app.put("/todos/:id",async(req,res)=>{
  const id = req.params.id;
  const{taske,done}=req.body;
  
  try {
    const task = await Task.findByIdAndUpdate(id,{
     $set:{task:taske,
      done:done}},{new:true} )
    
  res.status(200).json(task)
    
  }catch
  { 
    res.status(500).send("error while updating task id -->",id)
  }});
//===================Delete==================
app.delete("/todos/:id",async(req,res)=>{
  const id = req.params.id
  try{
    const deletedTask = await Task.findByIdAndDelete(id)
    console.log("task deleted")
   res.status(204).json({message:"to do deleted successfully"});
  
  }catch(error){
    res.status(500).send("there is error happend when you trying to delete task",id )
    console.error( error);

  
  }
  
  
})
