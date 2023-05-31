import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slider1 from "../../Assets/img/slider1.mp4";
import slider2 from "../../Assets/img/slider2.png";
import slider3 from "../../Assets/img/slider3.jpg";
import "../Slider/Slider.css";

const Slider = () =>{
    return(
        <>
            <div id='slider'>
                <Carousel autoPlay infiniteLoop>
                    <div>
                        <video width={"100%"} autoPlay loop muted>
                            <source src={slider1} type="video/mp4" />
                        </video>
                    </div>
                    <div>
                        <img src={slider2} height={758} alt="slider2.png" />
                    </div>
                    <div>
                        <img src={slider3} alt="slider3.jpg" />
                    </div>
                </Carousel>
            </div>
        </>
    )
}
export default Slider;