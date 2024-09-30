/* eslint-disable no-unused-vars */
import React from "react";
import "./Profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function Profile(props) {
	const user = props.Person;
	// console.log("User:" + user);

	let userProfile;
	if (user === "Admin") {
		// console.log("admin");
		userProfile = <AdminProfile />;
	} else if (user === "Student") {
		// console.log("student");
		userProfile = <StudentProfile />;
	} else if (user === "Teacher") {
		// console.log("teacher");
		userProfile = <TeacherProfile />;
	}

	return <>{userProfile}</>;
}

function AdminProfile() {
	const [adminCount, setAdminCount] = useState();
	const [teacherCount, setTeacherCount] = useState();
	const [studentCount, setStudentCount] = useState();

	const token = localStorage.getItem("token");
	const decodedToken = jwtDecode(token);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const values = {
		user_id: decodedToken.username,
		userType: decodedToken.userType,
	};

	const [userInfo, setUserInfo] = useState(["Admin"]);
	const [error, setError] = useState("");

	// console.log("herrrrreee");

	useEffect(() => {
		axios
			.post("http://localhost:4000/getData", values)
			.then((res) => {
				if (res.data.Status === "Success") {
					// console.log([...res.data.data], 'wjdbvjhwb');
					setUserInfo([...res.data.data]);
				} else {
					console.log(res.data.Error);
					setError(res.data.Error);
				}
			})
			.catch((err) => console.log(err));

		axios
			.get("http://localhost:4000/adminCount")
			.then((res) => {
				setAdminCount(res.data[0].admin);
			})
			.catch((err) => console.log(err));

		axios
			.get("http://localhost:4000/teacherCount")
			.then((res) => {
				setTeacherCount(res.data[0].teacher);
			})
			.catch((err) => console.log(err));

		axios
			.get("http://localhost:4000/studentCount")
			.then((res) => {
				setStudentCount(res.data[0].student);
			})
			.catch((err) => console.log(err));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<section
				class="w-100"
				style={{
					"background-color": "#f4f5f7",
					minHeight: "100vh",
					height: "100%"
				}}
			>
				<div class="container py-5 h-100 bigcard">
					<div
						class="row d-flex justify-content-center align-items-center"
						style={{ minHeight: "100vh", height: "100%" }}
					>
						<div class="col col-lg-6 mb-4 mb-lg-0 w-100 admin h-100">
							<div
								class="card mb-3 h-100"
								style={{
									borderRadius: ".5rem",
									height: "100%",
									margin: "0",
								}}
							>
								<div class="row g-0 h-100">
									<div
										class="col-md-4 gradient-custom text-center text-white"
										style={{
											"border-top-left-radius": ".5rem",
											"border-bottom-left-radius":
												".5rem",
										}}
									>
										<img
											src="https://www.transparentpng.com/thumb/user/black-male-icon-clipart-png-Uc8rbw.png"
											alt="Avatar"
											class="img-fluid my-5"
											// style={{ width: "100px" }}
										/>
										<h5>Administrator</h5>
										<p>Little Flower School</p>
									</div>
									<div class="col-md-8">
										<div class="card-body p-4">
											<h6>Information</h6>
											<hr class="mt-0 mb-4" />
											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>Name</h6>
													<p class="text-muted">
														{userInfo[0].first_name}{" "}
														{userInfo[0].last_name}
													</p>
												</div>
												<div class="col-6 mb-3">
													<h6>Role</h6>
													<p class="text-muted">
														Administrator
													</p>
												</div>
											</div>

											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>Email</h6>
													<p class="text-muted">
														{userInfo[0].email}
													</p>
												</div>
												<div class="col-6 mb-3">
													<h6>Phone</h6>
													<p class="text-muted">
														{userInfo[0].phone_no}
													</p>
												</div>
											</div>

											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>Flat No.</h6>
													<p class="text-muted">
														{userInfo[0].flat_no}
													</p>
												</div>
												<div class="col-6 mb-3">
													<h6>Colony</h6>
													<p class="text-muted">
														{userInfo[0].colony}
													</p>
												</div>
											</div>

											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>District</h6>
													<p class="text-muted">
														{userInfo[0].district}
													</p>
												</div>
												<div class="col-6 mb-3">
													<h6>Pincode</h6>
													<p class="text-muted">
														{userInfo[0].pin_code}
													</p>
												</div>
											</div>
										</div>
										<div className="p-3 d-flex justify-content-around mt-3">
											<div className="px-3 pt-2 pb-3 border shadow-sm w-25">
												<div className="text-center pb-1">
													<h4>Admin</h4>
												</div>
												<hr />
												<div className="">
													<h5>
														Total: {adminCount + 1}
													</h5>
												</div>
											</div>
											<div className="px-3 pt-2 pb-3 border shadow-sm w-25">
												<div className="text-center pb-1">
													<h4>Teacher</h4>
												</div>
												<hr />
												<div className="">
													<h5>
														Total: {teacherCount}
													</h5>
												</div>
											</div>

											<div className="px-3 pt-2 pb-3 border shadow-sm w-25">
												<div className="text-center pb-1">
													<h4>Student</h4>
												</div>
												<hr />
												<div className="">
													<h5>
														Total: {studentCount}
													</h5>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

function StudentProfile() {
	const token = localStorage.getItem("token");
	const decodedToken = jwtDecode(token);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const values = {
		user_id: decodedToken.username,
		userType: decodedToken.userType,
	};

	const [userInfo, setUserInfo] = useState(["Student"]);
	const [error, setError] = useState("");

	useEffect(() => {
		axios
			.post("http://localhost:4000/getData", values)
			.then((res) => {
				if (res.data.Status === "Success") {
					console.log([...res.data.data], "wjdbvjhwb");
					setUserInfo([...res.data.data]);
				} else {
					console.log(res.data.Error);
					setError(res.data.Error);
				}
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log(userInfo);
	return (
		<>
			<section
				class="w-100"
				style={{
					"background-color": "#f4f5f7",
					minHeight: "100vh",
					height: "100%",
				}}
			>
				<div class="container py-5 h-100 bigcard">
					<div
						class="row d-flex justify-content-center align-items-center"
						style={{ minHeight: "100vh", height: "100%" }}
					>
						<div class="col col-lg-6 mb-4 mb-lg-0 w-100 admin h-100">
							<div
								class="card mb-3 h-100"
								style={{
									borderRadius: ".5rem",
									height: "100%",
									margin: "0",
								}}
							>
								<div class="row g-0 h-100">
									<div
										class="col-md-4 gradient-custom text-center text-white"
										style={{
											"border-top-left-radius": ".5rem",
											"border-bottom-left-radius":
												".5rem",
										}}
									>
										<img
											src="https://www.transparentpng.com/thumb/user/black-male-icon-clipart-png-Uc8rbw.png"
											alt="Avatar"
											class="img-fluid my-5"
											style={{ width: "80px;" }}
										/>
										<h5>Student</h5>
										<p>Little Flower School</p>
									</div>
									<div class="col-md-8">
										<div class="card-body p-4">
											<h6>Information</h6>
											<hr class="mt-0 mb-4" />
											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>Student Id</h6>
													<p class="text-muted">
														{userInfo[0].student_id}
													</p>
												</div>
												<div class="col-6 mb-3">
													<h6>Name</h6>
													<p class="text-muted">
														{userInfo[0].first_name}{" "}
														{userInfo[0].last_name}
													</p>
												</div>
											</div>

											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>Gender</h6>
													<p class="text-muted">
														{userInfo[0].gender}
													</p>
												</div>
												<div class="col-6 mb-3">
													<h6>Role</h6>
													<p class="text-muted">
														Student
													</p>
												</div>
											</div>

											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>Father's Name</h6>
													<p class="text-muted">
														{
															userInfo[0]
																.Father_name
														}
													</p>
												</div>
												<div class="col-6 mb-3">
													<h6>Mother's Name</h6>
													<p class="text-muted">
														{
															userInfo[0]
																.Mother_name
														}
													</p>
												</div>
											</div>

											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>Phone No.</h6>
													<p class="text-muted">
														{userInfo[0].phone_no}
													</p>
												</div>
												<div class="col-6 mb-3">
													<h6>Email</h6>
													<p class="text-muted">
														{userInfo[0].email_id}
													</p>
												</div>
											</div>

											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>Flat No.</h6>
													<p class="text-muted">
														{userInfo[0].flat_no}
													</p>
												</div>
												<div class="col-6 mb-3">
													<h6>Colony</h6>
													<p class="text-muted">
														{userInfo[0].colony}
													</p>
												</div>
											</div>

											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>District</h6>
													<p class="text-muted">
														{userInfo[0].district}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

function TeacherProfile() {
	const token = localStorage.getItem("token");
	const decodedToken = jwtDecode(token);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const values = {
		user_id: decodedToken.username,
		userType: decodedToken.userType,
	};

	const [userInfo, setUserInfo] = useState(["Teacher"]);
	const [error, setError] = useState("");

	useEffect(() => {
		axios
			.post("http://localhost:4000/getData", values)
			.then((res) => {
				if (res.data.Status === "Success") {
					// console.log([...res.data.data], 'wjdbvjhwb');
					setUserInfo([...res.data.data]);
				} else {
					console.log(res.data.Error);
					setError(res.data.Error);
				}
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<section
				class="w-100"
				style={{
					"background-color": "#f4f5f7",
					minHeight: "100vh",
					height: "100%"
				}}
			>
				<div class="container py-5 h-100 bigcard">
					<div
						class="row d-flex justify-content-center align-items-center"
						style={{ minHeight: "100vh", height: "100%" }}
					>
						<div class="col col-lg-6 mb-4 mb-lg-0 w-100 admin h-100">
							<div
								class="card mb-3 h-100"
								style={{
									borderRadius: ".5rem",
									height: "100%",
									margin: "0",
								}}
							>
								<div class="row g-0 h-100">
									<div
										class="col-md-4 gradient-custom text-center text-white"
										style={{
											"border-top-left-radius": ".5rem",
											"border-bottom-left-radius":
												".5rem",
										}}
									>
										<img
											src="https://www.transparentpng.com/thumb/user/black-male-icon-clipart-png-Uc8rbw.png"
											alt="Avatar"
											class="img-fluid my-5"
											style={{ width: "80px;" }}
										/>
										<h5>Teacher</h5>
										<p>Little Flower School</p>
									</div>
									<div class="col-md-8">
										<div class="card-body p-4">
											<h6>Information</h6>
											<hr class="mt-0 mb-4" />
											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>Name</h6>
													<p class="text-muted">
														{userInfo[0].first_name}{" "}
														{userInfo[0].last_name}
													</p>
												</div>
												<div class="col-6 mb-3">
													<h6>Role</h6>
													<p class="text-muted">
														Teacher
													</p>
												</div>
											</div>

											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>Email</h6>
													<p class="text-muted">
														{userInfo[0].email}
													</p>
												</div>
												<div class="col-6 mb-3">
													<h6>Phone</h6>
													<p class="text-muted">
														{userInfo[0].phone_no}
													</p>
												</div>
											</div>
											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>Gender</h6>
													<p class="text-muted">
														{userInfo[0].gender}
													</p>
												</div>
												<div class="col-6 mb-3">
													<h6>Class Teacher Of</h6>
													<p class="text-muted">
														{
															userInfo[0]
																.class_teacher_flag
														}
													</p>
												</div>
											</div>

											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>Flat No.</h6>
													<p class="text-muted">
														{userInfo[0].flat_no}
													</p>
												</div>
												<div class="col-6 mb-3">
													<h6>Colony</h6>
													<p class="text-muted">
														{userInfo[0].colony}
													</p>
												</div>
											</div>

											<div class="row pt-1">
												<div class="col-6 mb-3">
													<h6>District</h6>
													<p class="text-muted">
														{userInfo[0].district}
													</p>
												</div>
												{/* <div class="col-6 mb-3">
                                                    <h6>Pincode</h6>
                                                    <p class="text-muted">{userInfo[0].pin_code}</p>
                                                </div> */}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Profile;

/* <h6>Projects</h6>
    <hr class="mt-0 mb-4"/>
    <div class="row pt-1">
        <div class="col-6 mb-3">
            <h6>Recent</h6>
            <p class="text-muted">Lorem ipsum</p>
        </div>
        <div class="col-6 mb-3">
            <h6>Most Viewed</h6>
            <p class="text-muted">Dolor sit amet</p>
        </div>
*/
