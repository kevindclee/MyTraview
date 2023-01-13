import React from 'react'
// import Nav from '../components/main/Nav';
import ArticleCreateButton from '../components/main/ArticleCreateButton';
import Nav from '../components/main/Nav';
import NavAfter from '../components/main/NavAfter';
import SinglePage from '../components/main/SinglePage';


const MainPage = () => {

  const accessToken = sessionStorage.getItem("ACCESS_TOKEN")

  
  return (
    <>
  {accessToken === null ? <Nav /> : <NavAfter />}
    <SinglePage />
    {accessToken === null ? <></> : <ArticleCreateButton />}
    </>
  )
}

export default MainPage