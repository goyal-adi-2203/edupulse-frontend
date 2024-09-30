import React from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBRipple
} from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './AboutUs.css'
import attendace from './attendance1.jpg'
import marks from './mark2.jpg'
import announcement from './announcement2.jpg';


function AboutUs() {
    return (
        <MDBContainer fluid style={{ marginTop: "10%" }} id="OurServices">
            <h1 className="aboutus-heading">Our Services</h1>
            <hr
                style={{
                    marginTop: "0", background: "#DF8A71", height: "5px", border: "none", width: "30%", marginLeft: "auto", marginRight: "auto", marginBottom: "5%"
                }}
            />

            <MDBRow className='row-cols-1 row-cols-md-4 aboutus-row g-5'>
                <MDBCol>
                    <MDBCard className='h-100 aboutus-card'>
                        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                            <MDBCardImage
                                src={attendace}
                                alt='...'
                                position='top'
                            />
                        </MDBRipple>
                        <MDBCardBody>
                            <MDBCardTitle>Live Attendance Record</MDBCardTitle>
                            <MDBCardText>
                                Worried if your child reached school today? Now parents can view their child's attendace in real-time.
                                Attendance of every student is updated daily by class teacher.
                            </MDBCardText>
                        </MDBCardBody>

                    </MDBCard>
                </MDBCol>
                <MDBCol>
                    <MDBCard className='h-100 aboutus-card'>
                        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                            <MDBCardImage
                                src={marks}
                                alt='...'
                                position='top'
                            />
                        </MDBRipple>
                        <MDBCardBody>
                            <MDBCardTitle>Real-Time Marks Updation</MDBCardTitle>
                            <MDBCardText>
                                Difficult to remember marks of every subject in every test?
                                We have built a system where student and their parents can check their marks in every test and every subject
                                to track their overall progress.
                            </MDBCardText>
                        </MDBCardBody>

                    </MDBCard>
                </MDBCol>
                <MDBCol>
                    <MDBCard className='h-100 aboutus-card'>
                        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                            <MDBCardImage
                                src={announcement}
                                alt='...'
                                position='top'
                            />
                        </MDBRipple>
                        <MDBCardBody>
                            <MDBCardTitle>Announcements Section</MDBCardTitle>
                            <MDBCardText>
                                Forgot important homework and assignments? Here, you can view assignments and homeworks give to you in
                                any of your subject by your subject teachers.
                            </MDBCardText>
                        </MDBCardBody>

                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default AboutUs;