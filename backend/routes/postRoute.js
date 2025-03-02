const Express = require("express");
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
            posts
        });
        newPost.save();
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


module.exports = router;