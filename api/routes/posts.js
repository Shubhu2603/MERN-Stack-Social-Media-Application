const router=require("express").Router();
const Post=require("../models/Post");
const User=require("../models/User");
//create
router.post("/create",async(req,res)=>{
    const newPost=new Post(req.body);
    try{
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
});

//update
router.put("/:id/update",async (req,res)=>{
    try{
    const post= await Post.findById(req.params.id);
    if(post.userId===req.body.userId){
        await post.updateOne({$set:req.body});
        res.status(200).json("Updated Successfully");
    }else{
        res.status(403).json("You can only update your post");
    }
    }catch(err){
        res.status(500).json(err);
    }

});

//delete
router.delete("/:id/delete",async (req,res)=>{
    try{
    const post= await Post.findById(req.params.id);
    if(post.userId===req.body.userId){
        await post.deleteOne();
        res.status(200).json("Deleted Successfully");
    }else{
        res.status(403).json("You can only delete your post");
    }
    }catch(err){
        res.status(500).json(err);
    }

});

//like
router.put("/:id/like",async (req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("Liked Successfully");
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("Unliked Successfully");
        }
        
    }
    catch(err){
        res.status(500).json(err);
    }

});
//get
router.get("/:id/get",async (req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});

//get timeline posts
router.get("/timeline/:userId",async (req,res)=>{

    try{console.log("Got In");
        console.log(req.params.userId);
        const currentUser=await User.findById(req.params.userId);
        console.log("Got Users");
        const userPosts=await Post.find({userId:currentUser._id});
        console.log("Got User Posts");
        const friendsPosts=await Promise.all(
            currentUser.following.map((friendId)=>{
                return Post.find({userId:friendId});
            })
        );
        console.log("Got Friends' Posts");
        res.status(200).json(userPosts.concat(...friendsPosts));
    }catch(err){
        res.status(500).json(err);
    }
});


//get all user posts
router.get("/profile/:username",async (req,res)=>{

    try{
        const user=await User.findOne({username:req.params.username});
        const posts=await Post.find({userId:user._id});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports=router;