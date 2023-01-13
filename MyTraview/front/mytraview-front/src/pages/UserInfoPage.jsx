
import { useEffect, useState } from 'react';



const UserInfoPage = () => {
  const [user, setUser] = useState("");
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN")

  console.log("이메일 "+ accessToken);

  const secessionFun = () => {
    window.location.href ="/UserUpdateMyPage ";
  }




  useEffect(() => {
    fetch(`http://localhost:8100/users/find`, {
    method: "GET",
    headers: {
     "Content-Type": "application/json",
     "Authorization": "Bearer "+accessToken,
    }
   })
   .then((res) => res.json())
   .then((res) => setUser(res))
  } , 

    [])

  return (
    <>
    <h1>MyPage</h1>
    <p>이메일 : {user.email}</p>
    <p>연락처: {user.phone}</p>
    <p>이름: {user.name}</p>
    <p>권한: {user.role}</p>
    
      <button type='modify' onClick={()=>{console.log("테스트"); secessionFun()}} className='float-right px-5 py-2 font-bold text-gray-800 border-2 rounded-lg hover:bg-sky-300'>회원정보 수정</button>

</>

  )
}

export default UserInfoPage
