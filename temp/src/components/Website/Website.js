import React, { useEffect } from "react";
import LandingPage from "../LandingPage/LandingPage";
import ContactUs from "../ContactUs/ContactUs";
import AboutUs from "../AboutUs/AboutUs";
import OurServices from "../OurServices/OurServices";
import Accordion from "../FAQAccordion/FAQAccordion";


function Website(){
    useEffect(() => {

        window.scrollTo(0, 0);
    });

    return(
        <div>
            <LandingPage />
            <OurServices />
            <AboutUs />
            <Accordion />
            <ContactUs />
        </div>
    );
}

export default Website;