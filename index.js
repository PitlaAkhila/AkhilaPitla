const http = require('http');
const path = require('path');
const fs = require('fs');
const cors=require('cors');
const {MongoClient}=require('mongodb');
const uri="mongodb+srv://AkhilaPitla:Pitla@cluster0.w7uvtqi.mongodb.net/test";
const client=new MongoClient(uri);
const server = http.createServer(async (req,res)=>{


    console.log(req.url);
   


    if(req.url ==='/'){
        
        fs.readFile(path.join(__dirname,'public','index.html'), (err, content)=>{
            if (err) throw err;
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(content);

        });
    }
    else if(req.url =='/about.html'){

        fs.readFile(path.join(__dirname,'public','about.html'),(err, content)=>{
            if (err) throw err;
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(content);
        })

    }
    else if(req.url ==='/api' && req.method === 'GET'){
        try{
            await client.connect();
            console.log("connection established");
            const cursor=client.db("Final").collection("Destination").find({});
            const results=await cursor.toArray();
            console.log(results);
            res.setHeader('Content-Type','application/json');
            res.setHeader('Access-Control-Allow-Origin','*');
            res.end(JSON.stringify(results));
        }
        catch(e){
            await console.log(e);
        }
        finally{
            await client.close();
            console.log("connection closed")
        }
    }
    else{

        res.writeHead(404,{'Content-Type':'text/html'});
        res.end(" <h1> 404 Nothing Found </h1>")
    }



})
const PORT= process.env.PORT || 5990;

server.listen(PORT,()=> console.log(`Great our server is running on port ${PORT} `));
