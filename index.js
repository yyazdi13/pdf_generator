const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");
var html = fs.readFileSync('./index.html', 'utf8'); 
var options = {format: 'Letter'}



inquirer
.prompt([
    {
    message: "Enter your github username",
    name: "username"
},
{
    message: "What's your fave color?",
    name: "color"
}
])
.then(function({username, color}){
    const queryURL = `https://api.github.com/users/${username}`;

    axios
    .get(queryURL)
    .then(function(res){
        console.log(res.data);
        var bio = res.data.bio;
        var blog = res.data.blog;
        var pic = res.data.avatar_url;
        var url = res.data.html_url;
        var repo = res.data.public_repos;
        var followers = res.data.followers;
        var following = res.data.following;
        var githublocation = res.data.location;
        var location = `https://www.google.com/search?q=google+maps+${githublocation}`
    
    fs.writeFile("index.html", `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body style="background: ${color};">
        <h1>${username}</h1>
        <img src="${pic}">
        <h2>
        <a href="${url}">github</a>
        </h2>
        <p>number of repos: ${repo}</p>
        <p>number of followers: ${followers}</p>
        <p>number following: ${following}</p>
        <p>bio: ${bio}</p>
        <h2>
        <a href="${location}"> Location</a>
        </h2>
        <h2>
        <a href="${blog}"> Blog</a>
        </h2>
    </body>
    </html>`, function(err){
        if (err){
            throw err;
        }
    })
    
     pdf.create(html, options).toFile('./index.pdf', function(err, data){
         if (err) {
             throw err;
         }
         console.log(data);
     }); 
    
     });
})