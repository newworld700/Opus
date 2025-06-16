import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import userroutes from "./routes/userroutes.js";
import adminroutes from "./routes/adminroutes.js"
import { createServer } from "http";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const app=express()
const server =createServer(app);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin:true,
    credentials:true,
    exposeHeaders:["set-cookie"]
}
));

app.set("trust proxy",true)
app.use(express.json());
app.use(express.static("/public"));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send({status:"started"});

})

app.use("/api/v0.1/user/",userroutes);
app.use("/api/v0.1/admin/",adminroutes)


export {app,server};
