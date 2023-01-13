import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const Carousel = () => {

    const data = [
        //서울, 부산, 대구, 인천, 광주, 대전, 울산, 세종특별자치시, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주특별자치도
        { areaCode: "서울", },
        { areaCode: "부산", },
        { areaCode: "대구", },
        { areaCode: "인천", },
        { areaCode: "광주", },
        { areaCode: "대전", },
        { areaCode: "울산", },
        { areaCode: "세종특별자치시", },
        { areaCode: "경기", },
        { areaCode: "강원", },
        { areaCode: "충북", },
        { areaCode: "충남", },
        { areaCode: "전북", },
        { areaCode: "전남", },
        { areaCode: "경북", },
        { areaCode: "경남", },
        { areaCode: "제주특별자치도", },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,

    };

    return (
        <>
            <div>
                <Slider {...settings}>
                    {data.map(({ areaCode }) => (
                        <Link to="/ArticleListPage" state={{ from: { areaCode } }} key={areaCode}>
                            <button className="px-5 py-2 font-bold text-blue-500 border-2 rounded-lg border-sky-500 hover:bg-sky-300">{areaCode}</button>
                        </Link>
                    ))}
                </Slider>
            </div>

        </>
    )
}

export default Carousel