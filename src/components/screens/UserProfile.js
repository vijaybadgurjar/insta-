import React,{useEffect,useState,useContext}  from "react";
import { Param,useParams } from "react-router-dom";
import { UserContext } from "../../App";
const Profile=()=>{
    const [UserProfile,setProfile]=useState(null)
     const [mypics,setPics]=useState([])
     const {state,dispatch} = useContext(UserContext)
     const {userid}=useParams()
     const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           console.log(result)
           setProfile(result)
        }) 

    },[])

    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
        })
    }
    return (
        <>
        {UserProfile ?   <div style={{maxWidth:"550px",margin:"0px auto"}}>

<div  style={{  //for upper div(dp and name)
   display:"flex",
   justifyContent:"space-around",
   margin:"20px 0px",
  
}}>

{/* dp part */}
<div>  
    <img style={{width:"160px",height:"160px",borderRadius:"80px", margin:"0px 0px"}} 
        src="https://images.newindianexpress.com/uploads/user/imagelibrary/2022/8/21/w600X390/Hrithik_Roshan_PTI.jpg"
    />

    {/* name part */}
    </div>  
    <div> 
    <h4>{UserProfile.user.name}</h4>
    <h4>{UserProfile.user.email}</h4>
      <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}> 
         <h5>{UserProfile.posts.length} </h5>
         <h6>{UserProfile.user.followers.length} followers</h6>
         <h6>{UserProfile.user.following.length} following</h6>
         <button className="btn waves-effect waves-light #64b5f6 blue darken-1 " 
        onClick={()=>followUser()}>
             follow
                 </button>
      </div>
    </div>
</div>


{/* for pic uploaded part */}
<div className="gallery">
{
UserProfile.posts.map(item=>{
return (
<img key={item._id} className="item" src={item.photo} alt={item.title} />
)
})
}


</div>


</div> : <h2>loading</h2>}
      
        </>
    )
}

export default Profile;