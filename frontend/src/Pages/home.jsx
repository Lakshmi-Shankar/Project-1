import React, { useState } from 'react';
import User from '../assets/User-avatar.png'
import Like from '../assets/likeImg.jpg'

const Home = () => {
    const name = localStorage.getItem("Username")
    const [posts, setPosts] = useState([]);
    const [newPost, setNewpost] = useState("")

    const handleAdding = async (e)=>{
        if(!newPost){
            console.log("It is empty")
        }
        try{
            const response = await fetch("http://localhost:5000/posts/posting", {
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
            await handlePost();
            setNewpost("");
        }
    }

    const handlePost = async (e)=>{
        try{
            const response = await fetch("http://localhost:5000/posts/allposts", {
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
                {posts.map((p,i)=>(
                    <div key={p._id}>
                        <p>{p.posts}</p>
                        <p className='like'>{p.like}</p>
                        <img src={Like} alt='likes'></img>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
