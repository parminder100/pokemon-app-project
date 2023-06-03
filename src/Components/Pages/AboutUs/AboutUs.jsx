import aboutus1 from "../../../Assets/img/aboutus1.jpg";
import aboutus2 from "../../../Assets/img/aboutus2.jpg";
import aboutus3 from "../../../Assets/img/aboutus3.jpg";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import "../AboutUs/AboutUs.css";
import { useState } from "react";

const AboutUs = () =>{
    const [changeColor, setChangeColor] = useState(true);
    const handleChangeColor = () =>{
        setChangeColor(!changeColor);
    }
    return(
        <>
            <div className="aboutus-header">
                <Header includeScrollFunctionality={false} changeColor={changeColor} handleChangeColor={handleChangeColor} />
            </div>
            <div className="container aboutus-content">
                <div className="row">
                    <div className="col-sm-12 aboutus-first-column">
                        <div className="about-image">
                            <img src={aboutus1} alt="aboutus1.jpg" />
                            <div className="about-gradient"></div>
                            <div className="about-heading">
                                <h1>Bringing the world together through Pokémon</h1>
                                <h2 className="mt-4">Our Mission</h2>
                                <p className="about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Quisque efficitur massa at luctus rutrum. Nullam tristique,
                                    mauris sodales volutpat vulputate, risus mauris pellentesque 
                                    urna, at consequat tortor dolor ut ante. Donec non sodales nibh. 
                                    Integer mollis tellus nec posuere finibus.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={`col-sm-6 welcome-content ${changeColor ? "aboutus-dark-theme" : "light-theme"}`}>
                        <div>
                        <p className="company-name"><span>Welcome</span> to Pokedex</p>
                        <p>Donec ac molestie elit. Vestibulum ante ipsum primis in 
                            faucibus orci luctus et ultrices posuere cubilia curae; 
                            Aliquam magna velit, scelerisque a feugiat eget, fringilla 
                            eu magna. Vivamus in sagittis sapien. Suspendisse eget arcu 
                            est. Curabitur ante mauris, lacinia ut semper porta, suscipit 
                            rutrum arcu.
                        </p>
                        <p className="mb-1">Sed non sodales quam. In facilisis augue a luctus pretium. 
                            Suspendisse aliquet sapien at ex ultrices, ac aliquet neque 
                            pulvinar. Curabitur a sem ultrices, lacinia ligula sit amet, 
                            sodales mauris. Pellentesque habitant morbi tristique senectus 
                            et netus et malesuada fames ac turpis egestas. Etiam tincidunt 
                            commodo molestie.
                        </p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <img className="aboutus2-image" src={aboutus2} alt="aboutus2.jpg" />
                    </div>
                    <div className="col-sm-6 core-values">
                        <img className="w-100" src={aboutus3} alt="aboutus3.jpg" />
                    </div>
                    <div className={`col-sm-6 core-values ${changeColor ? "aboutus-dark-theme" : "light-theme"}`}>
                        <h1 className="mb-4">Our Core Values</h1>
                        <p>Morbi mattis ut dui ac ultrices. Mauris nulla est, lacinia eu
                            arcu eget, maximus imperdiet sapien. Donec nibh elit, laoreet 
                            non sollicitudin in, ornare non risus. Quisque ipsum diam, 
                            dignissim at posuere nec, convallis in magna. Morbi aliquam 
                            sem sed magna scelerisque tempor. Phasellus aliquam, leo 
                            vehicula vehicula feugiat, mauris neque vehicula massa, 
                            quis bibendum risus tellus quis diam. Curabitur tellus lacus, 
                            iaculis ac sapien nec, tempor vulputate nibh. Nunc tempus dapibus 
                            tristique. Sed ac purus id dui facilisis iaculis. Duis 
                            sollicitudin a urna eu laoreet. In nec justo sit amet lectus 
                            imperdiet cursus. Aliquam ullamcorper feugiat eros, eget 
                            tincidunt leo aliquam in. Aenean pretium, neque a dignissim 
                            rutrum, nisl nibh tempus eros, quis suscipit enim tellus sit 
                            amet elit.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default AboutUs;