import express from "express"
import mongoose from "mongoose"
import bodyParser from 'body-parser'
import Person from './Person'
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const app= express();
app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json());

app.post('/add',(req,res)=>{
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
app.get("/person/:id",(req,res)=>{
    let findPersonById= function (personId,done){
        person.findById(personId,(e,r)=>{
            if(e){
                console.log(err)
            }
            else{
                done(null,r)
            }

        })
    }
})
const PORT=8080
app.listen(PORT,()=>console.log("App started "))
