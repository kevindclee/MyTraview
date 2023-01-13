import { Close } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

const MenuItemsAfter = ({showMenu, active}) => {

  const logOut = () => {
    if(window.confirm("로그아웃 하시겠습니까?")){
    sessionStorage.removeItem("ACCESS_TOKEN")
    window.location.href ="/"
    }else{
      alert("취소 되었습니다.")
    }
  }

  return (
    <div>
        <ul className={active ? 'flex-col flex items-center fixed inset-0 uppercase p-8 backdrop-blur-lg bg-black/40 gap-8 justify-center left-1/4 md:hidden' : 'hidden'}>
          <Close onClick={showMenu} className='cursor-pointer'/>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/SeventeenDistrict'>17도</Link></li>
          <li><Link to='/BestArticles'>Best Reviews</Link></li>
          <li><Link to='/viewAllArticles'>Event Sale</Link></li>
          <li><Link to='/MyPage'>MyPage</Link></li>
          <li><button onClick={logOut}>Sign Out</button></li>
        </ul>
    </div>
  )
}

export default MenuItemsAfter