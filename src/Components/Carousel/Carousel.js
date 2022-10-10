import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../Config/config";
import "./Carousel.css";
import moviedbClient from "../../API/moviedb";

const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ id, media_type }) => {
    const [credits, setCredits] = useState([]);

    const items = credits.map((c) => (
        <div className="carouselItem">
            <img
                src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
                alt={c?.name}
                onDragStart={handleDragStart}
                className="carouselItem__img"
            />
            <b className="carouselItem__txt">{c?.name}</b>
        </div>
    ));

    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    };

    const fetchCredits = async () => {
        const { data } = await moviedbClient.get(
            `/${media_type}/${id}/credits`
        );
        setCredits(data.cast);
    };

    useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
    }, []);

    return (
        <AliceCarousel
            animationType="fadeout"
            mouseTracking
            infinite="false"
            disableDotsControls
            disableButtonsControls
            animationDuration="8000"
            responsive={responsive}
            items={items}
            autoPlay
        />
    );
};

export default Gallery;