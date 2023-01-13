
import { useLocation } from 'react-router-dom'
import NavOthers from '../components/main/NavOthers'
import NavOthersAfter from '../components/main/NavOthersAfter'
import MapList from '../components/map/MapList'
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import curBoardAtom from '../components/atoms/curBoardAtom';
import Pagination from '../components/article/Pagination';

const ArticleMainListPage = (props) => {
  const location = useLocation()
  const { from } = location.state
  const areaCode = from.areaCode;
  const [articles, setArticles] = useState([]);
  const [_, setCurBoard] = useAtom(curBoardAtom);
  // const [auth, setAuth] = useAtom(authAtom); 
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  let [postNum, setPostNum] = useState(1)

  // const [areaCode, setAreaCode] = useState(props.areaCode);

  const accessToken = sessionStorage.getItem("ACCESS_TOKEN")
  

  return (
    <>
    {accessToken == null ? <NavOthers /> : <NavOthersAfter />}
    <div className="bg-[url('/public/images/starSky.jpg')] bg-cover opacity-95" style={{height: "100%"}}>
      <br /><br /><br /><br />
      {window.scrollTo(0, 0)}
      <div className='mx-72'>
      
      <MapList areaCode={areaCode} />
      <div onClick={() => console.log(areaCode)}></div>
      </div>
    
      </div>
    </>
  )
}

export default ArticleMainListPage