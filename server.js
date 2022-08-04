const http = require("http");
const fs = require("fs");
const path = require("path");

// Answers from magic-8ball
const answers = [
    "It is certain", "It is decidedly so", "Without a doubt",
    "Yes definitely", "You may rely on it", "As I see it, yes",
    "Most likely", "Outlook good", "Yes", "Signs point to yes",
    "Reply hazy, try again", "Ask again later", "Better not tell you now",
    "Cannot predict now", "Concentrate and ask again", "Don’t count on it",
    "My reply is no", "My sources say no", "Outlook not so good",
    "Very doubtful"
]

// Utility to generate random number from 0-19

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

const server = http.createServer((req, resp) => {
    // build filePath
    let filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url);
    //console.log(req.url);
    console.log(filePath);
    //get extension of the file
    let extname = path.extname(filePath);
    console.log(extname);

    //console.log(filePath);
    // set initial contentType
    let contentType = "text/html";
    // check extension and set the contentType

    switch(extname) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }
    console.log(contentType);
    console.log(req.url);

    // If the request is through fetch api, create magic 8 ball response
    if(req.url == "/api") {
        console.log("Success");
        console.log(answers.length);
        // Get a random number from 0 - total length of answers array - 1
        const randomNum = getRandomInt(0, answers.length-1);
        console.log(randomNum);
        console.log(answers[randomNum]);
        // Set the answer in the response object
        const answer = {'answer': answers[randomNum]};
        resp.writeHead(200, {'Content-Type': "application/json"});
        // Send response
        resp.end(JSON.stringify(answer));
    } else {    // If the request is any other file like index.html
        fs.readFile(filePath, (err, content) => {
            console.log(err,content);
            if(err) {
                //console.log(err);
                if(err.code == "ENOENT") {
                    fs.readFile(path.join(__dirname, "404.html"), (err, content) => {
                        resp.writeHead(200, {'Content-Type': "text/html"});
                        resp.end(content, "utf8");
                    })
                } else {
                    resp.writeHead(500);
                    resp.end(`Server error ${err}`);
                }
            } else {
                console.log(req.url);                
                resp.writeHead(200, {'Content-Type': contentType});
                resp.end(content, "utf8");
                //console.log(resp.contentType);            
            }
        });
    }
})

const PORT = process.env.PORT || 8001;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));