const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');


//lodash full build for routing param challenge no.18
let _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

//to use the css we write this method!
app.use(express.static("public"));

//global variable to store the objects in compose post!
let posts = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";



app.get("/", (req, res)=>{
    
    //adding date
  var date = new Date();
let day = (date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));

    res.render("home.ejs", {
      Date : day,
      posts : posts
    });
});

app.get("/about", (req, res)=>{ 
    res.render("about.ejs", {
        aboutContent : aboutContent
    });
})

app.get("/contact", (req, res)=>{
    res.render("contact.ejs", {
        contactContent : contactContent
    });
})

// compose starts here............
app.get("/compose", (req, res)=>{
    res.render("compose.ejs");
})



app.post("/compose", (req, res)=>{
    
    let catchInput = req.body.compose; 
    let catchPost = req.body.post;
    const store={
        title: catchInput,
        content: catchPost
    };

   //pushing object to global variable
   posts.push(store);
   
    res.redirect("/");
});



//challenge 17
//with the help of routing parameters 
//these are case sensitive!
app.get("/posts/:topic", (req,res)=>{

                  //loadash 
    let reqTitle = _.lowerCase(req.params.topic); //express routing param web
     
   
    //using forEach, iterating through posts array!
    posts.forEach((post)=>{
        const storedTitle = _.lowerCase(post.title);
        if(reqTitle == storedTitle){
            res.render("post.ejs",{
                title: post.title,
                content: post.content
            })
        }
        else{
            console.log("Match Not Found!");
        }
    })
})

//challenge 18
//now what if our topic is of two words how one can manage that? -> kebab-case
//for that we require  lodash library: https://lodash.com/

app.listen(3000, ()=>{
    console.log("server started in port 3000");
}); 