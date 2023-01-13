import React, { useState } from 'react'
// import {
//     Tabs,
//     TabsHeader,
//     TabsBody,
//     Tab,
//     TabPanel,
// } from "@material-tailwind/react"; // 메터리얼-테일윈드
import ListTable from './ListTable';
import { Tab, Tabs } from '@mui/material';
import MapList from '../map/MapList';

const CategoryTabs = (props) => {
    // console.log('TagTabs', props.areaCode);
    const [response, setResponse] = useState([]);

    const test = () => {
        console.log(response);
    }
    const text = '';

    // const [openTab, setOpenTab] = useState(1);

    const data = [
        //숙박, 먹거리, 교통, 관광지, 레저, 테마별 코스
        { category: "숙박", },
        { category: "먹거리", },
        { category: "교통", },
        { category: "관광지", },
        { category: "레저", },
        { category: "테마별 코스", },
        { category: "전체", },
    ];

    function headerOnClick(category) {
        console.log(props.areaCode, category);
        if (category === '전체') {
            fetch(`http://localhost:8100/article`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setResponse(data);
                }
                )
                .then(res => {
                    text.concat(res);
                }
                )
                .catch(error => console.error(error))
        } else {
            fetch(`http://localhost:8100/article/list/${props.areaCode}/${category}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                }
                )
                .then(res => {
                    text.concat(res);
                }
                )
                .catch(error => console.error(error))
        }

    }

    return (
        <>
            <div>{props.areaCode}</div>
                        <div><ListTable areaCode = {props.areaCode}/></div>
            {/* <div>카카오 지도</div> */}
                            <MapList areaCode = {props.areaCode}/>
                        <div>{text}</div>
                        {/* <ListTable tag={category} /> */}
            {/* <div className="container mx-auto">
                <div className="flex justify-center max-w-xl">
                    <div className="flex space-x-2">
                        {data.map(({ category }) => (
                            <div key={category} value={category} onClick={() => { headerOnClick(category) }} className="inline-block px-4 py-2 text-gray-600 bg-white rounded shadow">
                                {category}
                            </div>
                        ))}
                    </div>
                    <div>
                        {data.map(({ category }) => (
                            <div key={category} value={category}> */}
                                {/* 카카오 지도 추가 */}
                                {/* <div>카카오 지도</div> */}
                                {/* <Map />
                                <ListTable tag={category} />
                            </div>
                        ))}
                    </div>

                </div>
            </div> */}
            {/* <div >
            <div>
                {data.map(({ category }) => (
                    <div key={category} value={category} onClick={() => { headerOnClick(category) }}>
                        {category}
                        
                    </div>

                ))}
            </div>
            <div>
                {data.map(({ category }) => (
                    <div key={category} value={category}>
                    
                        <div>카카오 지도</div>
                            <Map />
                        <div>{text}</div>
                        <ListTable tag={category} />
                    </div>
                ))}
            </div>
            </div> */}
        </>
    );
}

export default CategoryTabs