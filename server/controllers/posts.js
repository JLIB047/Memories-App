//Controller file makes the app more scable
//proper folder structure
import mongoose from 'mongoose';
import express from 'express';
import PostMessage from '../models/postMessage.js';

const router = express.Router();

//takes time to find posts: need async/await 
export const getPosts = async (req, res) => {
   try {
        const postMessages = await PostMessage.find();

        console.log(postMessages)

        res.status(200).json(postMessages);
   } catch (error) {
       res.status(404).json({message: error.message})

   }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try{
        await newPost.save();

        res.status(201).json(newPost);
    } catch(error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id.');

    const updatedPost = {creator, title, message, tags, selectedFile, _id: id };
    
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true })

    res.json(updatedPost);

}

export const deletePost = async (req, res) => {
    const { id } = req.params; 

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id.');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params; 

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id.');

    const post = await PostMessage.findById(id); 
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true });

    res.json(updatedPost);

}

export default router;