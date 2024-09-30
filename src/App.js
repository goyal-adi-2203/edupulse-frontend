import React from "react";
import Login from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import ContactUs from "./components/ContactUs/ContactUs";
import Website from "./components/Website/Website";
import "./App.css";
import AboutUs from "./components/AboutUs/AboutUs";
import OurServices from "./components/OurServices/OurServices";
import Accordion from "./components/FAQAccordion/FAQAccordion";
import Dashboard from "./components/Dashboard/Dashboard";
import ViewMarks from "./components/ViewMarks/viewMarks";
import ViewAttendance from "./components/ViewAttendance/viewAttendance";
import UpdateMarks from "./components/UpdateMarks/updateMarks";
import Teacher from "./components/Teacher/teacher";
import EditTeacher from "./components/Teacher/EditTeacher";
import UpdateAttendance from "./components/UpdateAttendance/updateAttendance";
import AnnLandingPage from "./components/Announcement/AnnLandingPage";
import { LeaveReqList } from "./components/Leave/LeaveReqList";
import Student from "./components/Student/student";
import EditStudent from "./components/Student/EditStudent";

function App() {
	return (
		<>
			<Routes>
				<Route index exact element={<Website />} />
				{["/", "/home"].map((path, key) => (
					<Route path={path} element={<Website />} key={key} />
				))}
				<Route path="/home" element={<LandingPage />} />
				<Route path="/login" element={<Login />} />
				<Route
					path="/admin/:id/register"
					element={<RegistrationPage />}
				/>
				<Route path="/contactus" element={<ContactUs />} />
				<Route path="/services" element={<AboutUs />} />
				<Route path="/aboutus" element={<OurServices />} />
				<Route path="/faq" element={<Accordion />} />
				<Route
					path="/admin/dashboard"
					element={<Dashboard Person="Admin" />}
				/>
				<Route
					path="/student/dashboard"
					element={<Dashboard Person="Student" />}
				/>
				<Route
					path="/teacher/:id/dashboard"
					element={<Dashboard Person="Teacher" />}
				/>

				<Route path="/student/marks" element={<ViewMarks />} />
				<Route
					path="/student/attendance"
					element={<ViewAttendance />}
				/>
				<Route
					path="/teacher/updateAttendance"
					element={<UpdateAttendance />}
				/>
				<Route path="/teacher/updateMarks" element={<UpdateMarks />} />
				<Route path="/admin/manageTeacher" element={<Teacher />} />
				<Route
					path="/admin/editTeacher/:teacher_id"
					element={<EditTeacher />}
				/>
				<Route path="/admin/manageStudent" element={<Student />} />
				<Route
					path="/admin/editStudent/:student_id"
					element={<EditStudent />}
				/>
				<Route path="/announcements" element={<AnnLandingPage />} />
				<Route
					path="/teacher/:id/leaveReqs"
					element={<LeaveReqList />}
				/>
			</Routes>
		</>
	);
}

export default App;
