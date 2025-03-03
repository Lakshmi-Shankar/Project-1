const Express = require("express");
const mongoose = require("mongoose")
const router = Express.Router();
const postSchema = require("../model/postSchema");

router.post("/posting", async(req, res)=>{
    try{
        const { posts } = req.body;
        if (!posts){
            return res.status(400).json({
                Message: "Post field can't be empty"
            })
        }
        const newPost = new postSchema({
            posts,
            like: 0
        });
        await newPost.save();
    }
    catch(err){
        res.status(500).json({
            Message : "Internal server error",
            Error: err
        })
    }
});

router.get("/allposts", async(req,res)=>{
    try{
        const allPosts = await postSchema.find();
        if(allPosts.length === 0){
            return res.status(404).json({
                Message: "No data found"
            })
        }
        return res.status(200).json({
            Posts: allPosts
        })
    }
    catch(err){
        return res.status(500).json({
            Message: "Internal server error",
            Error: err
        })
    }
})

router.put('/like/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        console.log("Received Like Request for Post ID:", postId);

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            console.error("Invalid Object ID:", postId);
            return res.status(400).json({ message: "Invalid Post ID" });
        }

        const post = await postSchema.findById(postId);
        if (!post) {
            console.error("Post not found:", postId);
            return res.status(404).json({ message: "Post not found" });
        }

        post.like = (post.like || 0) + 1;
        await post.save();

        console.log("Updated Likes:", post.like);
        res.json({ success: true, updatedLikes: post.like });

    } catch (err) {
        console.error("Error updating likes:", err.message);
        res.status(500).json({ message: "Error updating likes", error: err.message });
    }
});



module.exports = router;