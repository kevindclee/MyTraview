import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ArticleSubListPage from '../../pages/ArticleSubListPage'
import BestArticles from '../../pages/BestArticles'
import EventPage from '../../pages/EventPage'
import Section from './Section'
import SeventeenDistrict from './SeventeenDistrict'


const SinglePage = () => {


    return (
        <div className="slider" style={{width: "100%", height: "100vh"}}>
            
                {/* <div style={{ height: "100vh", width: "100%", display: "vertical" }}> */}

                <div id="s1" style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
                    <Section />
                </div>

                <div id="s2" style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
                    <SeventeenDistrict />
                </div>

                <div id="s3" style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
                    <BestArticles />
                </div>

                <div id="s4" style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
                    <EventPage />
                </div>

            
        </div>
    )
}

export default SinglePage