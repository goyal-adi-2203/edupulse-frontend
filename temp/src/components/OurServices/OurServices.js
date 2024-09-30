import React from "react";
import photo from './photo.avif'
import './OurServices.css'


function OurServices() {
    return (
        <div className="services-main-div" id="About-Us">
            <div className="services-heading">
                <h1>About Us</h1>
                <hr
                    style={{
                        marginTop: "0", background: "#DF8A71", height: "5px", border: "none", width: "30%", marginLeft: "auto", marginRight: "auto", marginBottom: "5%"
                    }}
                />
            </div>
            <div className="services-container">
                <section className="service">
                    <div className="service-image">
                        <img src={photo} alt="services" />
                    </div>
                    <div className="service-content">
                        <h2>Who we are...</h2>
                        <p>
                            Little Flower School is a co-educational institution run by the Catholic Diocese of Indore. It was established in the year 1972, managed by a committee with the Bishop of the diocese as the Chairman. It's a minority educational institution situated at Khajrana Main Road, Pushpa Nagar, Indore.
                        </p>
                        <p>
                            Apart from imparting academic education, the institution aims to provide a holistic value based education, which enables to develop the personality of students. It tries to provide excellent teaching standards and tries to instil in its student values like discipline, justice and responsibility that can help to shape a better future for the students.
                        </p>
                        <p>
                            This school has ever remained as a school of excellence providing education conducive to the modern times.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default OurServices;