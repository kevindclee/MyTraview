import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import curBoardAtom from '../atoms/curBoardAtom'
import ColouredHeartImg from "../assets/coloured_heart.png"
import VacantHeartImg from "../assets/empty_heart.png"
import { call } from '../../api_config/ApiService'


const CountHeart = (props) => {

    const [heartCount, setHeartCount] = useState("")
    const [curBoard, setCurBoard] = useState(props.articleId)
    const [heartFlag, setHeartFlag] = useState(false)

    const flagHandler = () => {
        setHeartFlag(!heartFlag);
    }

    const heartHandler = () => {

        if (heartFlag === true) {
            setHeartCount((res) => res - 1 )
            flagHandler()
            const req = {
                articleId: curBoard
            }
            call(`/heart`, 'DELETE', req)
                .then((res) => {
                    { console.log("좋아요 취소"); }
                })
                .then((res) => {
                    console.log(res);
                })
        } else {
            setHeartCount((res) => res + 1 )
            flagHandler()
            const req = {
                articleId: curBoard,
                flag: true
            }
            call("/heart", "POST", req)
                .then((res) => { setHeartFlag(res.flag);console.log("현재 heartFlag 값" + heartFlag); })
                .catch((res) => { console.log(res); })
        }
    }

      useEffect(() => {
        call(`/heart/articleId=${curBoard}`,'GET')
        .then((res) => {setHeartFlag(res.flag); console.log(res)})
        .catch((res) => {console.log(res);})
      }, [])

      useEffect(() => {
        call(`/heart/countHeart=${curBoard}`,'GET')
        .then( (res) => {setHeartCount(res.articleId); console.log(res)})
        .catch((res) => {console.log(res);})
      }, [])


    return (

        <div className='flex'>
            {/* img src="./public/images/coloured_heart.png" or img src="./assets/coloured_heart.png" 이렇게 가져오면 사진을 읽지 못함 */}
            {/* <img src={flag2 === true?ColouredHeartImg:VacantHeartImg} img className='object-scale-down w-6 h-4 pt-[5px] mx-2 my-2' onClick={() => {setFlag2(!flag2)}} /> */}
            <button onClick={heartHandler} className='object-scale-down w-4 h-4 pt-[5px] mx-2 my-2'>
                <img src={heartFlag === true ? ColouredHeartImg : VacantHeartImg} />
            </button>
            <div className='my-2 mr-2'>({heartCount})</div>
        </div>

    )
}

export default CountHeart
