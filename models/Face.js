
import mongoose, { schema } from 'mongoose';

const faceschema = new schema({
    user:{type:schema.faceschema.Types.ObjectId,ref:'User',required:true},
    faceImage:{type:String,required:true},//store image URL or file path
    // faceEncoding:{type:[Number],required:true}//store numerical encoding if using AI
},{timestamps:true});
const Face = mongoose.model('Face', faceschema);  

export default Face;