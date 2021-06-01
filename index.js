const request = require("request");
const fs = require("fs");
const axios = require("axios");
const prompt = require("prompt")

const value = process.argv[2];

prompt.start();
prompt.get(['searchTerm'],(err,result)=>{
    if(err){
        console.log(err)
    }
        request(`https://icanhazdadjoke.com/search?term=${result.searchTerm}`,{headers: {Accept: 'application/json'}},(error,response,body)=>{
            if (!error && response.statusCode == 200) {
                let bd = JSON.parse(body).results;
                bd.forEach(value=>{
                    fs.appendFile("jokes.txt",`${value.joke}\n`,err=>{// to write to a file
                        if(err) throw err;
                        console.log("written to file")
                    })
                })
            }
        
        })
})

// axios.get("https://icanhazdadjoke.com/",{headers: {Accept: 'application/json'}})
//     .then(response=>{
//         console.log(response)
//     })
//     .catch(err=>{
//         console.log(err);
//     })