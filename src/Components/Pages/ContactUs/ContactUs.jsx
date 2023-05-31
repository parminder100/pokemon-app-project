import contactus from "../../../Assets/img/contactus.jpg";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import "../ContactUs/ContactUs.css";
import { useState } from "react";

const ContactUs = () =>{
    const [changeColor, setChangeColor] = useState(true);

    const handleChangeColor = () =>{
        setChangeColor(!changeColor);
    }
    return(
        <>
            <div className="contactus-header">
                <Header includeScrollFunctionality={false} changeColor={changeColor} handleChangeColor={handleChangeColor} />
            </div>
            <section className="contactus-content">
                <div className="container">
                    <div className="row">
                        <div className={`col-sm-6 ${changeColor ? "aboutus-dark-theme" : "light-theme"}`}>
                            <img className="w-100" src={contactus} alt="contactus.jpg" />
                            <h3 className="mt-3">Let's have a cup of Tea and Discuss the requirement</h3>
                            <ul className="social-media-icons">
                                <li><i className="fa fa-facebook"></i></li>
                                <li><i className="fa fa-instagram"></i></li>
                                <li><i className="fa fa-twitter"></i></li>
                            </ul>
                        </div>
                        <div className="col-sm-6">
                            <form>
                                <div class={`form-group ${changeColor ? "aboutus-dark-theme" : "light-theme"}`}>
                                    <div className="row">
                                        <div className="col-sm-6 mb-3">
                                            <label for="exampleInputEmail1">Name</label>
                                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your name" />
                                        </div>
                                        <div className="col-sm-6 mb-3">
                                            <label for="exampleInputEmail1">Phone Number</label>
                                            <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your phone number" />
                                        </div>
                                        <div className="col-sm-12 mb-3">
                                            <label for="exampleInputEmail1">Email</label>
                                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email" />
                                        </div>
                                        <div className="col-sm-12 mb-3">
                                            <label for="exampleInputEmail1">Subject</label>
                                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your subject" />
                                        </div>
                                        <div className="col-sm-12">
                                            <label for="exampleFormControlTextarea1">Message</label>
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="submit_btn">
                                    <button className="submit-btn">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <div className="contactus-footer">
                <Footer />
            </div>
        </>
    )
}
export default ContactUs;