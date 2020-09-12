import express from "express"
import mongoose from "mongoose"
import bodyParser from 'body-parser'
import Person from './Person'
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const app= express();
app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json()); //read body json//

app.post('/add',(req,res)=>{ // create person//
const person=new Person(req.body)
person.save();
res.send("success")
});
app.get("/persons",(_,res)=>{
    Person.find((e,r)=>{
        res.json(r)
    })
})
app.get("/favorit/:food",(req,res)=>{
    let {food} = req.params;
    Person.findOne({favoriteFoods:food.trim()},(e,r)=>{
        console.log(food)
        res.json(r)
    })

})
app.get("/person/:id",(req,res,next)=>{ //if we dont found with id go to search with Favorite food//

Person.findById(req.params.id,(e,r)=>{
    if(!r)
    next()
    else{
        res.json(r)
    }
    
})
})
app.post("/person/edit",(req,res)=>{
const {id,newFood}=req.body
Person.findByIdAndUpdate(id,{$push:{favoriteFoods:newFood}},{new:true},(e,r)=>{
    res.json(r)
})    
})
app.post("/person/editWithName",(req,res)=>{
    const {name,age}=req.body
    Person.findOneAndUpdate({name},{$set:{age}},{new:true},(e,r)=>{
        res.json(r)
    })    
    })
    app.get("/person/delete/:id",(req,res)=>{
        Person.findByIdAndRemove(req.params.id,(e,r)=>{
            res.json(r)
        })    
        })
        app.get("/person/massDelete/:name",async(req,res)=>{
            console.log(req.params.name)
         const rest =  await Person.remove({name:req.params.name});
         res.json(rest)
            
          } )    
          app.get("/person/:food",(req,res)=>{
              Person.find({favoriteFoods:req.params.food})
              .sort({name:1})
              .limit(2)
              .select({age:0})
              .exec((e,r)=>{
                  res.json(r)
              })

          })
            
const PORT=8080
app.listen(PORT,()=>console.log("App started "))
