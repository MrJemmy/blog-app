const Blog = require("../models/blog")
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET


const blogProfile = async(req, res) => {
    try {
        const data = await Blog.find({ deleted: { $ne: true } })
        res.status(200).json({
            data: data
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to create blog' });
    }
}

const createBlog = async(req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const userDoc = jwt.verify(token, secret);
        const createdBy = userDoc.id
        const { title, summary, content} = req.body;
        const blog = await Blog.create({ title,  summary, content, createdBy });
        res.json({msg: blog, user: userDoc});
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to create blog' });
      }
}

const updateBlog = async(req, res) => {
    // can update if only user is admin or user's data
    try {
        const id = req.params.blogId;
        const { title, summary, content} = req.body;

        const blogExist = await Blog.findOne({_id: id, deleted: { $ne: true } })
        if(blogExist){
            const usersId = await Blog.findOne({_id:id}, 'createdBy');

            const token = req.headers['authorization'].split(' ')[1];
            const userDoc = jwt.verify(token, secret);

            if(String(usersId.createdBy) == userDoc.id){
                const blog = await Blog.findByIdAndUpdate(id, { title, summary, content }, { new: true });
                res.json({msg: blog});
            }else{
                res.json({msg: `you do not have permisions to update this blog ${blog.title}`});
            }
        }else{
            res.json({msg: 'this blog dose not exist'});
        }

    } catch (err) {
        console.log(err);
        res.json({msg: 'error accured', error:err});
    }
    
    
}

const viewBlog = async(req, res) => {
    try{
        const blogId = req.params.blogId;
        const blog = await Blog.find({
            _id: blogId, 
            deleted: { $ne: true } 
        });
        res.json({blog: blog});
    }catch(err){
        console.log(error);
        res.json({msg: 'error accured', error:error});
    }
}   

const viewMyBlogs = async(req, res) => {
    try{
        const token = req.headers['authorization'].split(' ')[1];
        const userDoc = jwt.verify(token, secret);
        const userId = userDoc.id
        const data = await Blog.find({
            createdBy: userId, 
            deleted: { $ne: true } 
        })
        res.json({data: data});
    }catch(err){
        console.log(err);
        res.json({msg: 'error accured', error:err});
    }
}

const deleteBlog = async(req, res) => {
    try{
        const id = req.params.blogId;
        const usersId = await Blog.findOne({_id:id}, 'createdBy');

        const token = req.headers['authorization'].split(' ')[1];
        const userDoc = jwt.verify(token, secret);

        if(String(usersId.createdBy) == userDoc.id){
            const blog = await Blog.findOneAndUpdate({_id: id, deleted: { $ne: true } }, { deleted: true }, { new: true });
            if(blog){
                res.json({msg: `blog ${blog.title} is deleted`});
            }else{
                res.json({msg: `blog dose not found`});
            }
            
        }else{
            res.json({msg: `you do not have permisions to remove this blog ${blog.title}`});
        }
    }catch(err){
        console.log(err);
        res.json({msg: 'error accured', error:err});
    }
    
    
}


module.exports = {blogProfile, createBlog, viewMyBlogs, viewBlog, deleteBlog, updateBlog}



