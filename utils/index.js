const express=require('express')
require('dotenv').config()
const app=express();
const router=express.Router()
const bodyParser=require('body-parser')
const crypto=require('crypto')
const session=require('express-session')
const cors=require('cors')
const multer=require('multer')


/*********** MULTER STORAGE CONFIGURATION ************/
const storage=multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,'attachment')
	},
	filename:(req,file,cb)=>{
		cb(null,Date.now().toString()+'_'+file.originalname);
	}
})

const uploadImage=multer({storage,limits:{fileSize:1000000}})


/***************** EXPRESS COMMON MIDDLEWARES ****************/
const getUID=()=>{
	return crypto.randomBytes(5).toString('hex');
}

/********************* SESSION CONFIGURATION ********************/
app.use(session({
	secret:getUID(),
	resave:false,
	saveUninitialized:true
}))
app.use(cors())
app.set('view engine','ejs')

const PORT=process.env.PORT

/********** FETCH CUSTOM CODE *****************/
const fetchData=async (url)=>{
	const response=await fetch(url)
	return await response.json()
}

module.exports={app,PORT,router,fetchData,getUID,uploadImage}

