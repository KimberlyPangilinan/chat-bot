// express server which handles api requests

const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port =3001;


const configuration = new Configuration({
    organization: "org-9WuTbbvRp2hmSpoKrRrDLkgS",
    apiKey:"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",
});
const openai = new OpenAIApi(configuration);



app.use(bodyParser.json());
app.use(cors());

app.post('/',async(req,res)=>{
    const {message} = req.body;
    const response = await openai.createImage({
       
        prompt: message,
        n: 2,
  size: "1024x1024",
      });
      
    console.log(response.data);
    image_url = response.data.data[0].url;
    res.json({image_url});
});


app.post('/chat',async(req,res)=>{
    const {message} = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 1000,
        temperature: 0,
      });
      
    console.log(response.data);
    if(response.data.choices[0].text){  
        res.json({message: response.data.choices[0].text})
    }
});

app.listen(port,()=>{
    console.log('Example app http://localhost:'+port);
});