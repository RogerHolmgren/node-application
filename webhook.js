"use strict";

module.exports = (app) =>{
    console.log("Webhook is running");
        app.post('/webhook',(req,res)=>{
            console.log("Active webhook");
            console.log(req.body);
            res.status(200).send();
        });
};