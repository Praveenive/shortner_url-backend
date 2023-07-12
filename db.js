import mongoose from 'mongoose'
export function dbConnection(){
    const params={
        useNewUrlParser:true,
        useUnifiedTopology: true
}
try {
    mongoose.connect('mongodb+srv://praveenive:Praveen6@cluster0.4iggedc.mongodb.net/?retryWrites=true&w=majority',params)
    console.log("database connected succesfully")
} catch (error) {
    console.log("database error",error)
}
}