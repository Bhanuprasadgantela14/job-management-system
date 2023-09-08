//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/usesrregister", {useNewUrlParser: true});

const signSchema = {
  name : {
    type : String,
    required : true
  },
  type : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
};


const resumeSchema = {
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    // unique : true
  },
  college : {
    type : String,
    required : true
  },
  cgpa : {
    type : String,
    required : true
  },
  branch :{
    type : String,
    required : true
  },
  yexperience : {
    type : Number,
    required : true
  },
  fields : {
    type : String,
    required : true,
  }
  
};

const jobSchema = {
  companyname : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    // unique : true
  },
  fields : {
    type : String,
    required : true,
  },
  salary : {
    type : Number,
    required : true,
  }
  
};


const skillsSchema = {
  email : {
    type : String,
    required : true
  },
  skill : {
    type : String,
    required : true,
    // unique : true
  },
  
};

const Register = mongoose.model("Register", signSchema);

const Skills = mongoose.model("Skills", skillsSchema);

const Resume = mongoose.model("Resume", resumeSchema);

const Job = mongoose.model("Job", jobSchema);


var em;


app.get("/", async (req, res) => {
  try {
    
    res.render("home");
  } catch (err) {
    console.log(err);
  }
});

app.get("/login", async (req, res) => {
  try {
    
    res.render("login");
  } catch (err) {
    console.log(err);
  }
});

app.get("/recruiter", async (req, res) => {
  try {
    
    res.render("recruiter");
  } catch (err) {
    console.log(err);
  }
});

app.get("/postjob", async (req, res) => {
  try{
    res.render("postjob");
  }catch(err)
  {
    console.log(err);
  }
});

app.get("/postresume", async (req, res) => {
  try{
    res.render("postresume");
  }catch(err)
  {
    console.log(err);
  }
});


app.get("/jobseeker", async (req, res) => {
  try {
    res.render("jobseeker",{
      em : em
    });
  } catch (err) {
    console.log(err);
  }
});


app.get("/alljobs", async (req,res)=>{
  try{
    const posts = await Job.find({ });
    res.render("alljobs",{
      posts: posts
    });
  }catch(err)
  {
    console.log(err);
  }
})

app.get("/allcandidate", async (req,res)=>{
  try{
    const posts = await Resume.find({ });
    //console.log(posts);
    res.render("allcandidate",{
      posts: posts
    });
  }catch(err)
  {
    console.log(err);
  }
})


app.post("/login", async(req,res)=>{
  try{
      const email = req.body.email;
      const password = req.body.password;

      const usermail = await Register.findOne({email:email});
      if(usermail == null){
        res.send("Invalid Login Details");
      }else if(usermail.password === password){
        if(usermail.type === "Recruiter")
        {
           res.redirect("/recruiter");
        }else{
          em=email;
          res.redirect("/jobseeker");
          
        }
        
      }else{
        res.send("Invalid Login Details");
      }

      
      
  }
  catch(err)
  {
    console.log(err);
  }
})


app.get("/register", async (req, res) => {
  try {
    //const posts = await Post.find({ });
    res.render("register");
  } catch (err) {
    console.log(err);
  }
});


app.get("/postresume", async (req, res) => {
  try {
    //const posts = await Post.find({ });
    res.render("postresume");
  } catch (err) {
    console.log(err);
  }
});


app.post("/register",async (req,res) => {

  
  const post = new Register ({
    name: req.body.name,
    type: req.body.type,
    email: req.body.email,
    password: req.body.password
  });

  post.save().then(()=>{
    res.redirect("/login");
  }).catch((err)=>{
    console.log(err);
  })
});


app.post("/postjob",async (req,res) => {

  
  const post = new Job ({
    companyname: req.body.companyname,
    email: req.body.email,
    fields: req.body.fields,
    salary: req.body.salary
  });

  post.save().then(()=>{
    res.redirect("/allcandidate");
  }).catch((err)=>{
    console.log(err);
  })
});


app.post("/postresume",async (req,res) => {

  
  const post = new Resume ({
    name: req.body.name,
    email: req.body.email,
    college: req.body.college,
    cgpa: req.body.cgpa,
    branch: req.body.branch,
    yexperience: req.body.yexperience,
    fields: req.body.fields
  });

  post.save().then(()=>{
    res.redirect("/alljobs");
  }).catch((err)=>{
    console.log(err);
  })
});


app.post("/searchcandidate",async (req,res, next) => {

  
  const fields = req.body.fields;
  const yexperience = req.body.yexperience;
  try {
    const posts = await Resume.find({
      yexperience: { $gte: yexperience },
      fields: fields
   } );
   res.send(posts);
  //  console.log(posts);
  //   next();
  //  res.render("resultcandidate",{
  //       posts : posts
  //  });
   } catch (err) {
     console.log(err);
   }
});

app.get("/searchcandidate",async (req,res) => { 
  try {
    res.render("searchcandidate");
  } catch (err) {
    console.log(err);
  }
});


app.post("/searchjob",async (req,res,next) => { 
  
  try {
    const fields = req.body.fields;
    const salary = req.body.salary;
    console.log(fields);
    console.log(salary);
    const posts = await Job.find({
      salary: { $gte: salary },
      fields: fields
   } );
    
    // res.render("resultjob",{
    //   posts : posts,
     
    // });
    // next();
     
    res.send(posts);
    //res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.get("/searchjob",async (req,res) => { 
  try {
   res.render("searchjob");
  } catch (err) {
    console.log(err);
  }
});

app.get("/addskills/:email",async (req,res) => { 
  try {
    const email = req.params.email;
    const posts = await Skills.find({
      email: email
   } );
   //console.log(posts);
    res.render("addskills",{
      email:email,
      posts : posts
    });
   

  } catch (err) {
    console.log(err);
  }
});

app.post("/addskills/:email",async (req,res)=>{
  // try {
     const email = req.params.email;
  //   const posts = await Skills.find({
  //     email: email
  //  } );
   const post = new Skills ({
    email: req.params.email,
    skill: req.body.skill
  
  });

  post.save().then(()=>{
    res.redirect("/addskills/" + email);
  }).catch((err)=>{
    console.log(err);
  })
});

var postsstore=[];
var emailstore=[];
let resumes=[];

app.get("/searchskill", async (req, res)=>{
  try{
    
   res.render("searchskill",{
    posts : postsstore
   });

  }catch(err){
    console.log(err);
  }
});

app.post("/searchskill", async (req, res)=>{
  try{
    const skill = req.body.skill;

    postsstore.push(skill);

    const emails = await Skills.find({
      skill: skill
   } );

   if(emails != null)
   {
      //console.log(emails);
      emails.forEach(function(post){
            //console.log(post.email);
            emailstore.push(post.email);
      })
    
   }

   res.redirect("/searchskill");

  }catch(err){
    console.log(err);
  }
});

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}


app.post("/showskillresult", async(req,res)=>{
   try{
    
    var unique = emailstore.filter(onlyUnique);
    unique.forEach(async(email) => {
      //console.log(email);
      const emails = await Resume.find({
        email: email
     } );
     

     emails.forEach(async(resume)=>{
      const result ={
        name: resume.name,
        email: resume.email,
        college: resume.college,
        cgpa: resume.cgpa,
        branch: resume.branch,
        yexperience: resume.yexperience,
        fields : resume.fields
       };
       
       //console.log(result.email);
       resumes.push(result);
     })
     
     
  
    })

    //console.log(resumes);
    res.redirect("/results");
   }catch(err){
    console.log(err);
   }
});

app.get("/results", async (req, res) => {
  try{
    //console.log(resumes);
        res.send(resumes);
  }catch(err){
    console.log(err);
  }
});

app.get("/jobsuggestion/:email", async(req, res)=>{
     try{
      const email = req.params.email;
      const emails = await Resume.findOne({
        email: email
     } );

     //console.log(emails.fields);
     const field = emails.fields;
     const jobs = await Job.find({
      fields: field
   } );

   res.send(jobs);

     }catch(err){
      console.log(err);
     }
});


app.get("/updateresume/:email", async (req, res) => {
  try{
    const email = req.params.email;
    const resu = await Resume.findOne({
      email : email
    });
    res.render("updateresume",
    {
      resu : resu
    });
  }catch(err){
    console.log(err);
  }
});

app.post("/updateresume/:email", async (req, res) => {
  try{
    const email = req.params.email;
    await Resume.updateOne({email : email},{
      name : req.body.name,
      college : req.body.college,
      cgpa : req.body.cgpa,
      branch : req.body.branch,
      yexperience : req.body.yexperience,
      skill : req.body.skill,
      fields : req.body.fields
    });

    res.redirect("/jobseeker");
    
  }catch(err){
    console.log(err);
  }
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
