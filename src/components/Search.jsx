import React,{useContext, useState} from 'react';
import { collection, query, where, getDocs,
   setDoc, updateDoc, serverTimestamp,doc,getDoc } from "firebase/firestore";

import {db} from "../firebase";
import { AuthContext } from "../context/AuthContext";



const Search = () => {
  const [username,setUsername] = useState("");
  const [user,setUser] = useState(null);
  const [err,setErr] = useState(false);
  const {currentUser} = useContext(AuthContext);

  const handleSearch = async () =>{
    const q = query(collection(db,"users"),// eslint-disable-next-line
    where("displayName","==",username));

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        
        setUser(doc.data())

      });

    }catch(err){
      setErr(true);
    } 
  };  

  const handleKey = (e) =>{ // eslint-disable-next-line
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the grp(chats in firestore) exists or not, if not create
    const combinedId = currentUser.uid > user.uid 
      ? currentUser.uid + user.uid 
      : user.uid + currentUser.uid;

      try{
        const res = await getDoc(doc(db,"chats",combinedId));

        if(!res.exists()){
          //create chat in chats collection
          await setDoc(doc(db,"chats", combinedId), {messages: [] });

          //Create user chat
          await updateDoc(doc(db,"userChat",currentUser.uid),{
            [combinedId + ".userInfo"]: {
              uid:user.uid,
              displayName:user.displayName,
              photoURL:user.photoURL,
            },
            [combinedId + ".date"]:serverTimestamp(),
          });

          await updateDoc(doc(db,"userChat",user.uid),{
            [combinedId + ".userInfo"]: {
              uid:currentUser.uid,
              displayName:currentUser.displayName,
              photoURL:currentUser.photoURL,
            },
            [combinedId + ".date"]:serverTimestamp(),
          });
        }
      }catch(err){}

        setUser(null);
        setUsername("");
    
  };
  return (
    <div className='search'>
      <div className='searchForm'>
          <input type="text" 
          placeholder = "Find a user" 
          onKeyDown={handleKey} 
          onChange={ (e) => setUsername(e.target.value)}
          value={username}
           />
      </div>
      {err && <span>User not found</span> }
      {user && (
          <div className="userChat" onClick={handleSelect} >
          <img src={user.photoURL} alt="" />
          <div className='userChatInfo'>
            <span>{user.displayName}</span>

          </div>
      </div>
      )}
    </div>
  );
}
export default Search;