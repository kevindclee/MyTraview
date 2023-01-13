import React, { useEffect } from 'react'

const KakaoTest = () => {


    const API_KEY = "KakaoAK c7cef9ee92577782a14980afa1b746c6"
    let headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": "KakaoAK c7cef9ee92577782a14980afa1b746c6",

    })  
     
const query = encodeURI("전북 삼성동 100")

  const options = {
    method: 'GET',
    headers: headers
    // body: JSON.stringify
  }

  useEffect(() => {
    
    fetch(`https://dapi.kakao.com/v2/local/search/address?query=전북 삼성동`, options)
    .then((res) => {
        console.log(res.json());
    })

    // fetch(`https://dapi.kakao.com/v2/local/search/address?query=${query}`, {
    //     headers:{
    //         Authorization :  "KakaoAK c7cef9ee92577782a14980afa1b746c6"
    //     }
    // })
    // .then((res) => {
    //     console.log(res.json());
    // })

    // axios({
    //     method: "GET",
    //     url: `https://cors-anywhere/herokuapp.com/https://dapi.kakao.com/v2/local/search/address?query=${query}`,
    //     headers : headers
    // })
    // .then((res) => console.log(res))
    // .catch((err) => console.log("에러는"+err))
    
  }, [])
  

  return (
    <div>KakaoTest</div>
  )
}

export default KakaoTest