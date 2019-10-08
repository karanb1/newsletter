const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");

  const app=express();
  app.use(bodyParser.urlencoded({extended:true}));
  
  app.use(express.static("public"));
  app.get("/",function(req,res){
        res.sendFile(__dirname +"/index.html");
  });

  app.post("/",function(req,res){
        var firstName=req.body.fname;
        var lastName=req.body.lname;
        var email=req.body.email;

        var data={
            members:[
                {
                  email_address: email,
                  status: "subscribed",
                  merge_fields:{
                      FNAME: firstName,
                      LNAME: lastName
                  }  
                }
            ]
        };

        var jsonData=JSON.stringify(data);
            
          var options={
              url:"https://us20.api.mailchimp.com/3.0/lists/33b2378bc4",
              method:"POST",
              headers:{
                  "Authorization":"karan fa97ce8a80056de49fce755a6f064b83-us20"
              },
              body: jsonData
          };

        request(options,function(error,response,body){
            if(error){
                res.sendFile(__dirname +"/failure.html");
            }
            else{
                if(response.statusCode === 200){
                     res.sendFile(__dirname +"/success.html");
                }
                else{
                     res.sendFile(__dirname +"/failure.html");
                }
            }
        });
  });

  app.post("/failure",function(req,res){
      res.redirect("/")
  });

  app.listen(process.env.PORT || 8000,function(){
        console.log("Server started");
  });


  