import { useState } from "react";
import './FAQAccordion.css'

function Accordion() {
    const [selected, setselected] = useState(null)
    const toggle = (i) => {
        if (selected === i) {
            return setselected(null);
        }
        setselected(i);
    }

    return (
        <div style={{ marginTop: "12%" }} id="FAQs">
            <h1 className='faq-heading'  >Frequently Asked Questions</h1>
            <hr
                style={{
                    marginTop: "1%", background: "#DF8A71", height: "5px", border: "none", width: "30%", marginLeft: "auto", marginRight: "auto", marginBottom: "0%"
                }}
            />
            <div className="wrapper">

                <div className="accordion">
                    {data.map((items, i) => (
                        <div className="item" key={i}>
                            <div className="title" onClick={() => toggle(i)}>
                                <h4>{items.question}</h4>
                                <span>{selected === i ? '-' : '+'}</span>
                            </div>
                            <div className={selected === i ? 'content show' : 'content'}>{items.answer}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const data = [
    {
        "id": 1,
        "question": "What is EduPulse, and how does it work?",
        "answer": "EduPulse is a software application designed to streamline and automate various administrative and academic tasks within an educational institution. It works by centralizing student and staff data, automating processes like attendance tracking, grade management, and providing a user-friendly interface for teachers, administrators, parents, and students to access relevant information."
    },
    {
        "id": 2,
        "question": "What are the key features of EduPulse interface ?",
        "answer": "Key features of the EduPulse interface typically include student profiles, attendance management, grade generation, communication tools (such as announcements) and user account management for teachers, students, and administration."
    },
    {
        "id": 3,
        "question": "Can parents and students access their academic records through the EduPulse interface ?",
        "answer": "Yes, parents and students can typically access academic records through the EduPulse interface. This includes viewing grades and exam results."
    },
    {
        "id": 4,
        "question": "How can teachers use the EduPulse interface to manage student attendance ?",
        "answer": "Teachers can use the EduPulse interface to mark and track student attendance for each class. They can take attendance digitally, view attendance reports, and generate attendance records. Students and parents may also have access to their attendance records through the interface."
    },
    {
        "id": 5,
        "question": "How to Login in the EduPulse system ?",
        "answer": "There are 2 ways to login in the EduPulse System : 1. Login Button 2. From the Navigation Bar. You have to click one of the buttons and then enter your userID and password. If its a valid combination, you will be redirected to a dashboard dedicated to your needs."
                  
    }
];

export default Accordion
