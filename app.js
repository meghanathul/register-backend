const express = require("express");
const path = require("path")
const app = express();
const hbs = require("hbs")
require('./connect')
const Register = require("./models/register")


// const port=process.env.PORT || 3000;
const static_path = path.join(__dirname, "./public")
const templates_path = path.join(__dirname, "./templates/views")
const partials_path = path.join(__dirname, "./templates/partials")

// console.log(path.join(__dirname,"../public"))

app.use(express.urlencoded({ extended: false }))  //for getting data

app.use(express.static(static_path))
app.set("view engine", "hbs")
app.set("views", templates_path)
hbs.registerPartials(partials_path)


app.get("/", (req, res) => {
    res.render("index")
})
app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/register", async (req, res) => {  //adding
    // res.render("register")
    try {
        // console.log(req.body.name)
        // res.send(req.body.name)    //old
        const password = req.body.password  //for checkin password if(1===2)
        const cpassword = req.body.cpassword
        if (password === cpassword) {
            const registerEmp = new Register({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword,
            })
            
            const registerd =  await registerEmp.save();
        res.status(201).render("index");
  
        }
        else {
            res.send("password are not matching")
        }
        
    }
    catch (error) {
        res.status(400).send(error)
    }
})


app.listen(3000, () => {
    console.log('server is running...')
})