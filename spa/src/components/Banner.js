import React from "react";
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/Queries';
import moment from 'moment';

import '.././css/Banner.css';

export default function Banner() {
    const {data} = useQuery(
        GET_POSTS,
        { 
          variables: {pagination: {
            offset: 0,
            limit: 3
          }},
          fetchPolicy: "network-only",
          notifyOnNetworkStatusChange: false
        });

    return (
        <div className="carousel">
            <ul className="slides">
                {data?.posts.map((banner, i) => {
                    return getBanner(banner, i)
                })}
                <div className="carousel-dots">
                    <label htmlFor="img-1" className="carousel-dot" id="img-dot-1" />
                    <label htmlFor="img-2" className="carousel-dot" id="img-dot-2" />
                    <label htmlFor="img-3" className="carousel-dot" id="img-dot-3" />
                </div>
            </ul>
        </div>
    )
}

function getBanner(banner, key) {
    let prev = 0;
    let next = 0;
    let i = key + 1;
    switch(i) {
        case 1:
            prev = i + 2;
            next = i + 1;
            break;
        case 2:
            prev = i - 1;
            next = i + 1;
            break;
        case 3:
            prev = i - 1;
            next = i - 2;
            break;
        default:
    }
    return (
        <React.Fragment key={i}>
            {i === 1 && <input type="radio" name="radio-buttons" id={`img-${i}`} defaultChecked/>}
            {i !== 1 && <input type="radio" name="radio-buttons" id={`img-${i}`}/>}
            <li className="slide-container">
                <div className="slide-image">
                    <div className="container-img">
                        <img alt="" src={banner.image} />
                        <div className="container-title flex flex-column">
                            <span className="bg-black f-60 ff-2 fw-bold">{banner.title}</span>
                            <span className="f-28 mt-19">{moment(banner.createdAt).format('yyyy.MM.DD')}</span>
                        </div>
                    </div>
                </div>
                <div className="carousel-controls">
                    <label htmlFor={`img-${prev}`} className="prev-slide">
                        <span><i className="arrow left"></i></span>
                    </label>
                    <label htmlFor={`img-${next}`} className="next-slide">
                        <span><i className="arrow right"></i></span>
                    </label>
                </div>
            </li>
        </React.Fragment>
    );
}