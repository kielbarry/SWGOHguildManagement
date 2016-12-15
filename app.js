var request = require("request");
var cheerio = require("cheerio");
var URL = require("url-parse");
var fs = require("fs");
var baseURL = "https://swgoh.gg/";
var guildPath = "g/2698/teamskunk-omicron/";

var members = [];

//this creates a members of those in a guild
/**
request(baseURL+guildPath, function(error, response, body) {
   if(error) {
     console.log("Error: " + error);
   }
   console.log("Status code: " + response.statusCode);
   if(response.statusCode === 200) {
     var $ = cheerio.load(body);
     $('td > a').map(function(i, el) {
       members.push($(this).prop("href"));
     });
   }
   fs.writeFile("members.txt", members);
});
**/

//this will find a guildies collection

//var guildie = "pazuzu";

var rosters = [];

members = fs.readFileSync("./members.txt").toString().split(",");

members.map(function(y){
  var guildie = y.replace("/u/","").replace("/","");
  request(baseURL+`u/${guildie}/collection/`, (error, response, body) => {
     if(error) {
       console.log("Error: " + error);
     }
     console.log("Status code: " + response.statusCode);
     if(response.statusCode === 200) {
       var $ = cheerio.load(body);
       var charsArr = fs.readFileSync("./charList.txt").toString().split("\n");
       charsArr.map(function(x){
       		var toon = "/" + `u/${guildie}/collection/` + x.replace(/\s+/g, "-").toLowerCase() + "/";
          var level = $("a[href$='" + toon + "']").find(".char-portrait-full-level").text();
          var gear = $("a[href$='" + toon + "']").find(".char-portrait-full-gear-level").text();
          fs.appendFile("rosters.txt", [`${guildie}`, x, level, gear]+"\n");
       });
     }
  });
});




/**
request(baseURL, function(error, response, body) {
   if(error) {
     console.log("Error: " + error);
   }
   console.log("Status code: " + response.statusCode);
   if(response.statusCode === 200) {
 
     var $ = cheerio.load(body);
     fs.writeFile("charList.txt");
     $("ul > li > a > div > h5").map(function(i, el){
        // change this replace to use regex
        fs.appendFile("charList.txt", $(this).text().replace(" ", "-")); // .replace(" ", "%20"));
        fs.appendFile("charList.txt", "\n");
      
     });
   }
});
**/







