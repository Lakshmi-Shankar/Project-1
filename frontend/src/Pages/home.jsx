import React, { useState } from 'react';
import User from '../assets/User-avatar.png'
import Like from '../assets/likeImg.jpg'

const Home = () => {
    const name = localStorage.getItem("Username")
    const [posts, setPosts] = useState([]);
    const [newPost, setNewpost] = useState("")

    const handleLikes = async (postId) => {
        console.log("Sending Like Request for Post ID:", postId); 
        try {
            const response = await fetch(`https://project-1-backend-ur4w.onrender.com/posts/like/${postId}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' }
            });
    
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to update likes");
            }
    
            setPosts(posts.map(p => p._id === postId ? { ...p, like: data.updatedLikes } : p));
        } catch (err) {
            console.log("Error updating likes:", err);
        }
    };
    
    

    const handleAdding = async (e)=>{
        if(!newPost){
            console.log("It is empty")
        }
        try{
            const response = await fetch("https://project-1-backend-ur4w.onrender.com/posts/posting", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({posts: newPost})
            });
            if (response.ok) {
                var data = await response.json();
                setPosts([...posts, data]); 
            }
            console.log(data)
        }catch(err){
            console.log("Error",err)
        }
    }

    const handlePostI = async(e)=>{
        if (e.key=== "Enter"){
            e.preventDefault();
            console.log(name);
            handleAdding();
            handlePost();
            setNewpost("");
        }
    }

    const handlePost = async (e)=>{
        try{
            const response = await fetch("https://project-1-backend-ur4w.onrender.com/posts/allposts", {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log(data.Posts)
            setPosts(data.Posts)
        }
        catch{
            console.log(".Error.")
        }
    }
    return (
        <>
            <div className='profile'>
                <div className='fis'>Dashboard</div>
                <div className='sec'>Project-1</div>
                <div className='las'>{name}</div>
            </div>
            <br />
            <div className='user-det'>
                <img src={User} alt='User profile' onLoad={handlePost}></img>
                <p>{name}</p>
            </div>
            <div className='posting'>
                <textarea value={newPost} placeholder="Something's on your mind...." onKeyDown={handlePostI} onChange={(e)=>setNewpost(e.target.value)}></textarea>
            </div>
            <div className='post'>
                {posts?.map((p,i)=>(
                    <div key={p._id}>
                        <p>{p.posts}</p>
                        <label>
                            <img src={Like} alt='likes' className='likes'onClick={() => handleLikes(p._id)}></img>
                            <p className='likeNumber'>{p.like}</p>
                        </label>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;