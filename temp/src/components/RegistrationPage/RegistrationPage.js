/* eslint-disable no-unused-vars */
import * as React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import Select from "react-select";
import DatePicker from "react-date-picker";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import jwtDecode from "jwt-decode";
import {
	MDBBtn,
	MDBContainer,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBRow,
	MDBCol,
	MDBInput,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegistrationPage.css";

function RegistrationPage() {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		userType: "",
		username: "",
		password: "",
		First_name: "",
		Last_name: "",
		gender: "",
		class_teacher: "",
		class1: "",
		subject1: "",
		class2: "",
		subject2: "",
		class3: "",
		subject3: "",
		flatno: "",
		colony: "",
		district: "",
		state: "",
		mobile: "",
		email: "",
		student_class: "",
		Father_name: "",
		Mother_name: "",
		age: "",
		dob: "",
	});

	const [value, setValue] = React.useState(dayjs("2022-04-17"));

	const token = localStorage.getItem("token");
	const decodedToken = jwtDecode(token);
	const id = decodedToken.username;
	const [error, setError] = useState("");
	const handleRegister = (e) => {
		e.preventDefault();
		console.log(values);

		axios
			.post(`http://localhost:4000/admin/${id}/register`, values)
			.then((res) => {
				// alert("Register");
				if (res.data.Status === "Success") {
					if (values.username[0] === "a") {
						alert("Registration Succesful for Admin");
						// navigate('/admin/dashboard');
					} else if (values.username[0] === "s") {
                        alert("Registration Succesful for Student");
						// navigate('/admin/dashboard');
					} else if (values.username[0] === "t") {
                        alert("Registration Succesful for Teacher");
						// navigate('/admin/dashboard');
					}
                    navigate("/Admin/dashboard");
				} else {
					setError(res.data.Error);
					console.log(error);
				}
			})
			.catch((err) => console.log(err));
		// alert("Registration Successful");
	};

	const [selectedClass, setSelectedClass] = useState();
	function handleSelectClass(data) {
		setSelectedClass(data);
	}
	const [selectedSubject, setSelectedSubject] = useState();
	function handleSelectSubject(data) {
		setSelectedSubject(data);
	}

	const selectedDropDown = (event) => {
		console.log(event.target.value);
		console.log({ ...values, userType: event.target.value });
		setValues({ ...values, userType: event.target.value });
	};

	return (
		<MDBContainer fluid style={{ backgroundColor: "#8fc4b7" }}>
			<MDBRow className="d-flex justify-content-center align-items-center register-container">
				<MDBCol lg="8">
					<MDBCard className="my-5 rounded-3 registration-container-inner">
						<MDBCardImage
							src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
							className="w-100 rounded-top"
						/>

						<MDBCardBody className="px-5">
							<MDBRow>
								<h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
									Registration Info
								</h3>
							</MDBRow>
							<MDBRow style={{ marginBottom: "20px" }}>
								<MDBCol md="6">
									<select
										value={values.userType}
										onChange={selectedDropDown}
										class="form-select"
										aria-label="Default select example"
									>
										<option selected>Select Role</option>
										<option value="Student">Student</option>
										<option value="Teacher">Teacher</option>
									</select>
								</MDBCol>
							</MDBRow>
							{values.userType === "Student" && (
								<div>
									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="First Name"
												id="form1"
												type="text"
												value={values.First_name}
												onChange={(e) => {
													setValues({
														...values,
														First_name:
															e.target.value,
													});
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Last Name"
												id="form1"
												type="text"
												value={values.Last_name}
												onChange={(e) => {
													setValues({
														...values,
														Last_name:
															e.target.value,
													});
												}}
											/>
										</MDBCol>
									</MDBRow>
									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Father Name"
												id="form1"
												type="text"
												value={values.Father_name}
												onChange={(e) => {
													setValues({
														...values,
														Father_name:
															e.target.value,
													});
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Mother Name"
												id="form1"
												type="text"
												value={values.Mother_name}
												onChange={(e) => {
													setValues({
														...values,
														Mother_name:
															e.target.value,
													});
												}}
											/>
										</MDBCol>
									</MDBRow>

									<MDBRow>
										<MDBCol md="6" className="mb-4">
											<select
												className="form-select"
												aria-label="Default select example"
												value={null}
												onChange={(e) => {
													setValues({
														...values,
														gender: e.target.value,
													});
												}}
											>
												<option selected>Gender</option>
												<option value="Male">
													Male
												</option>
												<option value="Female">
													Female
												</option>
												<option value="Other">
													Other
												</option>
											</select>
										</MDBCol>
										<MDBCol md="6" className="mb-4">
											<select
												className="form-select"
												aria-label="Default select example"
												value={null}
												onChange={(e) => {
													setValues({
														...values,
														student_class:
															e.target.value,
													});
												}}
											>
												<option selected>
													Select Class
												</option>
												<option value="1">
													Class I
												</option>
												<option value="2">
													Class II
												</option>
												<option value="3">
													Class III
												</option>
												<option value="4">
													Class IV
												</option>
												<option value="5">
													Class V
												</option>
												<option value="6">
													Class VI
												</option>
												<option value="7">
													Class VII
												</option>
												<option value="8">
													Class VIII
												</option>
											</select>
										</MDBCol>
									</MDBRow>
									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Flat No./House No."
												id="form3"
												type="text"
												value={values.flatno}
												onChange={(e) => {
													setValues({
														...values,
														flatno: e.target.value,
													});
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Street/Colony"
												id="form3"
												type="text"
												value={values.colony}
												onChange={(e) => {
													setValues({
														...values,
														colony: e.target.value,
													});
												}}
											/>
										</MDBCol>
									</MDBRow>
									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="City"
												id="form3"
												type="text"
												value={values.district}
												onChange={(e) => {
													setValues({
														...values,
														district:
															e.target.value,
													});
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="State"
												id="form3"
												type="text"
												value={values.state}
												onChange={(e) => {
													setValues({
														...values,
														state: e.target.value,
													});
												}}
											/>
										</MDBCol>
									</MDBRow>
									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Mobile No."
												id="form3"
												type="number"
												value={values.mobile}
												onChange={(e) => {
													setValues({
														...values,
														mobile: e.target.value,
													});
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Email"
												id="form3"
												type="email"
												value={values.email}
												onChange={(e) => {
													setValues({
														...values,
														email: e.target.value,
													});
												}}
											/>
										</MDBCol>
									</MDBRow>
									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Enrollment ID"
												id="form3"
												type="text"
												value={values.username}
												onChange={(e) => {
													setValues({
														...values,
														username:
															e.target.value,
													});
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Password"
												id="form3"
												type="text"
												value={values.password}
												onChange={(e) => {
													setValues({
														...values,
														password:
															e.target.value,
													});
												}}
											/>
										</MDBCol>
									</MDBRow>
								</div>
							)}
							{values.userType === "Teacher" && (
								<div>
									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="First Name"
												id="form1"
												type="text"
												value={values.First_name}
												onChange={(e) => {
													setValues({
														...values,
														First_name:
															e.target.value,
													});
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Last Name"
												id="form1"
												type="text"
												value={values.Last_name}
												onChange={(e) => {
													setValues({
														...values,
														Last_name:
															e.target.value,
													});
												}}
											/>
										</MDBCol>
									</MDBRow>

									<MDBRow>
										<MDBCol md="6" className="mb-4">
											<select
												class="form-select"
												aria-label="Default select example"
												value={null}
												onChange={(e) => {
													setValues({
														...values,
														gender: e.target.value,
													});
												}}
											>
												<option selected>Gender</option>
												<option value="Male">
													Male
												</option>
												<option value="Female">
													Female
												</option>
												<option value="Other">
													Other
												</option>
											</select>
										</MDBCol>
										<MDBCol md="6" className="mb-4">
											<select
												class="form-select"
												aria-label="Default select example"
												value={null}
												onChange={(e) => {
													setValues({
														...values,
														class_teacher:
															e.target.value,
													});
												}}
											>
												<option selected>
													If class teacher, Select
													Class else 0
												</option>
												<option value="0">0</option>
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
												<option value="6">6</option>
												<option value="7">7</option>
												<option value="8">8</option>
											</select>
										</MDBCol>
									</MDBRow>
									<MDBRow>
										<MDBCol md="6" className="mb-4">
											<select
												required
												class="form-select"
												aria-label="Default select example"
												onChange={(e) => {
													setValues({
														...values,
														class1: e.target.value,
													});
												}}
											>
												<option selected>
													Select Class
												</option>
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
												<option value="6">6</option>
												<option value="7">7</option>
												<option value="8">8</option>
											</select>
										</MDBCol>
										<MDBCol md="6" className="mb-4">
											<select
												required
												class="form-select"
												aria-label="Default select example"
												value={null}
												onChange={(e) => {
													setValues({
														...values,
														subject1:
															e.target.value,
													});
												}}
											>
												<option selected>
													Select Subject
												</option>
												<option value="English">
													English
												</option>
												<option value="Hindi">
													Hindi
												</option>
												<option value="Maths">
													Maths
												</option>
												<option value="Science">
													Science
												</option>
												<option value="Social">
													Social
												</option>
											</select>
										</MDBCol>
									</MDBRow>
									<MDBRow>
										<MDBCol md="6" className="mb-4">
											<select
												class="form-select"
												aria-label="Default select example"
												onChange={(e) => {
													setValues({
														...values,
														class2: e.target.value,
													});
												}}
											>
												<option selected>
													Select Class
												</option>
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
												<option value="6">6</option>
												<option value="7">7</option>
												<option value="8">8</option>
											</select>
										</MDBCol>
										<MDBCol md="6" className="mb-4">
											<select
												class="form-select"
												aria-label="Default select example"
												value={null}
												onChange={(e) => {
													setValues({
														...values,
														subject2:
															e.target.value,
													});
												}}
											>
												<option selected>
													Select Subject
												</option>
												<option value="English">
													English
												</option>
												<option value="Hindi">
													Hindi
												</option>
												<option value="Maths">
													Maths
												</option>
												<option value="Science">
													Science
												</option>
												<option value="Social">
													Social
												</option>
											</select>
										</MDBCol>
									</MDBRow>
									<MDBRow>
										<MDBCol md="6" className="mb-4">
											<select
												class="form-select"
												aria-label="Default select example"
												onChange={(e) => {
													setValues({
														...values,
														class3: e.target.value,
													});
												}}
											>
												<option selected>
													Select Class
												</option>
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
												<option value="6">6</option>
												<option value="7">7</option>
												<option value="8">8</option>
											</select>
										</MDBCol>
										<MDBCol md="6" className="mb-4">
											<select
												class="form-select"
												aria-label="Default select example"
												value={null}
												onChange={(e) => {
													setValues({
														...values,
														subject3:
															e.target.value,
													});
												}}
											>
												<option selected>
													Select Subject
												</option>
												<option value="English">
													English
												</option>
												<option value="Hindi">
													Hindi
												</option>
												<option value="Maths">
													Maths
												</option>
												<option value="Science">
													Science
												</option>
												<option value="Social">
													Social
												</option>
											</select>
										</MDBCol>
									</MDBRow>
									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Flat No./House No."
												id="form3"
												type="text"
												value={values.flatno}
												onChange={(e) => {
													setValues({
														...values,
														flatno: e.target.value,
													});
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Street/Colony"
												id="form3"
												type="text"
												value={values.colony}
												onChange={(e) => {
													setValues({
														...values,
														colony: e.target.value,
													});
												}}
											/>
										</MDBCol>
									</MDBRow>
									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="City"
												id="form3"
												type="text"
												value={values.district}
												onChange={(e) => {
													setValues({
														...values,
														district:
															e.target.value,
													});
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="State"
												id="form3"
												type="text"
												value={values.state}
												onChange={(e) => {
													setValues({
														...values,
														state: e.target.value,
													});
												}}
											/>
										</MDBCol>
									</MDBRow>
									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Mobile No."
												id="form3"
												type="number"
												value={values.mobile}
												onChange={(e) => {
													setValues({
														...values,
														mobile: e.target.value,
													});
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Email"
												id="form3"
												type="email"
												value={values.email}
												onChange={(e) => {
													setValues({
														...values,
														email: e.target.value,
													});
												}}
											/>
										</MDBCol>
									</MDBRow>
									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Teacher ID"
												id="form3"
												type="text"
												value={values.username}
												onChange={(e) => {
													setValues({
														...values,
														username:
															e.target.value,
													});
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Password"
												id="form3"
												type="text"
												value={values.password}
												onChange={(e) => {
													setValues({
														...values,
														password:
															e.target.value,
													});
												}}
											/>
										</MDBCol>
									</MDBRow>
								</div>
							)}
							<div className="registration-buttons">
								<MDBBtn
									color="success"
									className="mb-4"
									size="lg"
									onClick={handleRegister}
								>
									Submit
								</MDBBtn>
								<MDBBtn
									color="info"
									className="mb-4"
									size="lg"
									onClick={() => {
										navigate(`/Admin/dashboard`);
									}}
								>
									<Link style={{ color: "#fff" }}>
										Go Back
									</Link>
								</MDBBtn>
							</div>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
}

export default RegistrationPage;
