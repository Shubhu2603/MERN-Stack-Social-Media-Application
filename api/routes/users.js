const router=require("express").Router();
const User=require("../models/User");

//update user
router.put("/:id/update",async (req,res)=>{
    if(req.body.userId===req.params.id || req.user.isAdmin){

        if(req.body.password){
            try{
                const salt=await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(req.body.password,salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user=await User.findByIdAndUpdate(req.params.id,{$set:req.body,});
            res.status(200).json("Account updated");
        }
        catch(err){
            return res.status(500).json(err);
        }

    }else{
        return res.status(403).json("You can only update your account");
    }
});

//get user
router.get("/:id/getUser",async (req,res)=>{

    if(req.body.userId===req.params.id ||User.findById(req.params.id).isAdmin){

        try{
            const user=await User.findById(req.params.id);
            res.status(200).json("User Found");
        }
        catch(err){
            return res.status(500).json(err);
        }

    }
    else{
        return res.status(403).json("User not found");
    }

});

//delete user
router.delete("/:id/delete",async (req,res)=>{

    if(req.body.userId===req.params.id ||User.findById(req.params.id).isAdmin){

        try{
            const user=await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User Deleted");
        }
        catch(err){
            return res.status(500).json(err);
        }

    }
    else{
        return res.status(403).json("You can only delete your account");
    }

});

//follow
router.put("/:id/follow",async (req,res)=>{
    

    try{
        const sourceUser=await User.findById(req.body.sourceID);
        const targetUser= await User.findById(req.body.targetID);
        if(req.body.sourceID===req.body.targetID){
            return res.status(403).json("Cannot follow yourself");
        }
        if(req.body.sourceID===req.params.id || User.findById(req.params.id).isAdmin){

            
            if(!sourceUser.following.includes(req.body.targetID)){
                await sourceUser.updateOne({$push:{following:req.body.targetID}});
                await targetUser.updateOne({$push:{followers:req.body.sourceID}});

                return res.status(200).json("Successfully followed the user");
            }
            else{
                return res.status(200).json("Already following User");
            }
        }
    }
    catch(err){
        console.log("User not found");
        return res.status(404).json("User not Found");
    }

});

//unfollow
router.put("/:sourceID/:targetID/unfollow",async (req,res)=>{
    
    if(req.body.userId===req.params.id ||User.findById(req.params.id).isAdmin){

        try{
            const user=await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User Deleted");
        }
        catch(err){
            return res.status(500).json(err);
        }

    }
    else{
        return res.status(403).json("You can only delete your account");
    }

});

//follow
router.put("/:id/unfollow",async (req,res)=>{

    try{
        const sourceUser=await User.findById(req.body.sourceID);
        const targetUser= await User.findById(req.body.targetID);
        if(req.body.sourceID===req.body.targetID){
            return res.status(403).json("Cannot unfollow yourself");
        }
        if(req.body.sourceID===req.params.id || User.findById(req.params.id).isAdmin){

            
            if(sourceUser.following.includes(req.body.targetID)){
                await sourceUser.updateOne({$pull:{following:req.body.targetID}});
                await targetUser.updateOne({$pull:{followers:req.body.sourceID}});

                return res.status(200).json("Successfully unfollowed the user");
            }
            else{
                return res.status(200).json("Not following User");
            }
        }
    }
    catch(err){
        console.log("User not found");
        return res.status(404).json("User not Found");
    }

});

//getMutuals
router.get("/:id/getMutuals",async (req,res)=>{


    try{
        const sourceUser=await User.findById(req.body.sourceID);
        const targetUser= await User.findById(req.body.targetID);
        if(req.body.sourceID===req.body.targetID){
            return res.status(403).json("Cannot get own mutuals");
        }
        if(req.body.sourceID===req.params.id || User.findById(req.params.id).isAdmin){

            const allUsers=await User.find();
            console.log(allUsers);
            let MutualList=[];

            allUsers.forEach(user => {
                if(user._id!==req.body.sourceID && user._id!==req.body.targetID)
                    if(user.following.includes(req.body.targetID)&& sourceUser.following.includes(user._id)){
                        MutualList.push(user._id);
                    }
              });
            if(MutualList.length===0){
                return res.status(200).json("No Mutuals");
            }
            const mutualUsers = await User.find({_id: { $in: MutualList }});
            console.log(mutualUsers);
            return res.status(200).json(mutualUsers);
        }
    }
    catch(err){
        console.log("User not found");
        return res.status(404).json("User not Found");
    }

});

module.exports=router;