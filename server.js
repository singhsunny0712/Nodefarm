//overview->Homepage,"/",""
//"Product" =>product page
//"/api"=>api

//error 404 Page not found
var http=require("http");
var fs=require("fs");
var url=require("url");
var json=fs.readFileSync("./data.json");
var template=fs.readFileSync("./product.html");
template+="";
json=JSON.parse(json);

var cardtemplate=fs.readFileSync("./cardtemplate.html");
cardtemplate+="";

var overview=fs.readFileSync("./overview.html");
overview+="";

function replace(template,product){
    //replace use for replace the /##/ content to 2nd parameter
  template=template.replace(/#image#/g,product["image"]);
  template=template.replace(/#Productname#/g,product["productName"]);
  template=template.replace(/#From#/g,product["from"]);
  template=template.replace(/#Nutrients#/g,product["nutrients"]);
  template=template.replace(/#Quantity#/g,product["quantity"]);
  template=template.replace(/#Price#/g,product["price"]);
  template=template.replace(/#Description#/g,product["description"]);
  template=template.replace(/{id}/g,product["id"]);

  if(!product["organic"]){

      template=template.replace(/#not-organic#/g,"not-organic");
    }
  return template;
}



// product=product.replace(/Fresh Avocados/g,"Green Apples");
// console.log(req.url);

var server=http.createServer(function(req,res){
    console.log(req.url);
    urlobj=url.parse(req.url,true); //url.parse(req.url,false) 
    console.log(url.parse(req.url,true));
    if(req.url=="/" || req.url=="homepage"|| req.url==""){
        // res.write("<h1>HOme page</H1>");
        var card="";
        for(var i=0;i<json.length;i++){
            card+=replace(cardtemplate,json[i]);
        }
        overview=overview.replace( /{%cardArea%}/g,card);
        res.write(overview);



    }else if(urlobj["pathname"]=="/product"){
        // res.write("<h1>Product</H1>");
     
      
        var productPage=replace(template,json[urlobj["query"]["id"]]);
        res.write(productPage);
        
    }else if(req.url=="/api"){
        res.write(template);
        
    }
    else{
        res.write("<H1>404</H1>");

    }
    res.end();
});

server.listen(3000,function(){
    console.log("Server has started  on port 3000");
})


 