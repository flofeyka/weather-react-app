import { Settings } from "react-slick";

export const SLIDER_DEFAULT_SETTINGS: Settings = {
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
        {
            breakpoint: 1690,
            settings: {
                slidesToShow: 5
            }
        },
        {
            breakpoint: 1366,
            settings: {
                slidesToShow: 4,
            },
        },
        {
            breakpoint: 868,
            settings: {
                slidesToShow: 2,
                draggable: true,
            },
        },
    ],
}