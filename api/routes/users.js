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
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
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
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { following: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  });



//follow
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { following: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });

router.get("/friends/:userId",async (req,res)=>{
    try {
        const user=await User.findById(req.params.userId);
        const friends=await Promise.all(
            user.following.map((friendId)=>{
                return User.findById(friendId);
    })
);
        let friendList=[];
        friends.map((friend)=>{
            const {_id,username,profilePicture}=friend;
            friendList.push({_id,username,profilePicture});
        });
        res.status(200).json(friendList)
    } catch (error) {
        res.status(500).json(error);
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