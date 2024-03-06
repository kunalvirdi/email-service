const {app,uploadImage}=require('./utils')
const {sendMail} =require('./utils/mail')
const bodyParser=require('body-parser')
const fs=require('fs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res, next) => {
	res.render('email-form')
});

app.post('/send-email',uploadImage.single('attachment'),async (req,res,next)=>{
	const {to,text,subject}=req.body
	try{
		await sendMail(to,text,subject,req.file);
		fs.unlinkSync(req.file.path)
		res.render('success')
	}catch(error){
		console.log(error)
	}

})

app.listen(3000, () => {
	console.log('Server running.');
});
