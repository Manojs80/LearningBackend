import { Contact } from "../models/contactModel.js";


 export const getContactList = async(req,res,next)=>{
    try {
     const QuizList = await Contact.find();
      res.json({ success: true , message: "Contact fetch succcesfuly" , data:QuizList});   

     } catch (error) {
        res.status(400).json({ message: "Contact internal server error"});
     }
};

 export const getContact = async(req,res,next)=>{
     try {
         const {id} = req.params;
      const existContact = await Contact.find(id);
         if (!existContact) {
           return res.status(404).send('Contact not found');
         }
      res.json({ success: true , message: "Contact fetch succcesfuly" , data:existContact});   

     } catch (error) {
        res.status(400).json({ message: "Contact internal server error"});
     }
 };

 export const createContact = async(req,res,next)=>{
     try {
        console.log("here");
        const {name,email,mobile,message} = req.body;
        console.log("here",req.body);
        const newContact = new Contact({name,email,mobile,message}); 
        await newContact.save();

      res.json({ success: true , message: "Contact create succcesfuly" , data:newContact});   

     } catch (error) {
         console.log(error);
        
         res.status(400).json({ message: "Contact intern server  error"});
     }
 };

 export const deleteContact = async(req,res,next)=>{
     try {
    
     const {id} = req.params;

       await Contact.findByIdAndDelete(id); 

      res.json({ success: true , message: "Contact deleted succcesfuly" });   

     } catch (error) {
         res.status(400).json({ message: "Contact internal server error"});
     }
 };