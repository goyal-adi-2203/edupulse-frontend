/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./EditTeacher.css";

function EditTeacher() {
	const [data, setData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		phone_no: "",
		gender: "",
		colony: "",
		teacher_id: "",
		flat_no: "",
		district: "",
	});
	const navigate = useNavigate();
	const { teacher_id } = useParams();
    // console.log(data);

	useEffect(() => {
		axios
			.get(`http://localhost:4000/get/${teacher_id}`)
			.then((res) => {
				if (
					res.data.Status === "Success" &&
					res.data.Result.length > 0
				) {
					const teacherData = res.data.Result[0];
                    // console.log(teacherData, "teacherData");
					setData({
						first_name: teacherData.first_name,
						last_name: teacherData.last_name,
						email: teacherData.email,
						phone_no: teacherData.phone_no,
						gender: teacherData.gender,
						colony: teacherData.colony,
						teacher_id: teacherData.teacher_id,
						district: teacherData.district,
						flat_no: teacherData.flat_no,
					});
				} else {
					alert("Teacher not found");
					navigate("admin/manageTeacher");
				}
			})
			.catch((err) => {
				console.error(err);
				alert("Error fetching teacher data");
			});
	}, [teacher_id, navigate]);

	const handleSubmit = (event) => {
		event.preventDefault();

		axios
			.put("http://localhost:4000/update/" + teacher_id, data)
			.then((res) => {
				if (res.data.Status === "Success") {
					alert("Teacher updated successfully");
					navigate("/admin/manageTeacher");
				} else {
					alert("Failed to update teacher");
				}
			})
			.catch((err) => {
				console.error(err);
				alert("Error updating teacher");
			});
	};

	return (
		<div id="editTeacher" style={{ display: "flex" }}>
			<ProSidebarProvider>
				<AdminSidePanel />
			</ProSidebarProvider>
			<div className="d-flex flex-column align-items-center pt-4">
				<h2>Update Teacher</h2>
				<form className="row g-3 w-50" onSubmit={handleSubmit}>
					<div className="col-12">
						<label htmlFor="inputID" className="form-label">
							Teacher ID
						</label>
						<input
							disabled={true}
							type="text"
							className="form-control"
							id="inputID"
							placeholder="Teacher ID"
							autoComplete="off"
							value={data.teacher_id}
							onChange={(e) =>
								setData({ ...data, teacher_id: e.target.value })
							}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="inputName" className="form-label">
							First Name
						</label>
						<input
							type="text"
							className="form-control"
							id="inputName"
							placeholder="Enter First Name"
							autoComplete="off"
							value={data.first_name}
							onChange={(e) =>
								setData({ ...data, first_name: e.target.value })
							}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="inputName" className="form-label">
							Last Name
						</label>
						<input
							type="text"
							className="form-control"
							id="inputName"
							placeholder="Enter Last Name"
							autoComplete="off"
							value={data.last_name}
							onChange={(e) =>
								setData({ ...data, last_name: e.target.value })
							}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="inputEmail" className="form-label">
							Email
						</label>
						<input
							type="email"
							className="form-control"
							id="inputEmail"
							placeholder="Enter Email"
							autoComplete="off"
							value={data.email}
							onChange={(e) =>
								setData({ ...data, email: e.target.value })
							}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="inputPhone" className="form-label">
							Phone Number
						</label>
						<input
							type="text"
							className="form-control"
							id="inputPhone"
							placeholder="Enter Phone Number"
							autoComplete="off"
							value={data.phone_no}
							onChange={(e) =>
								setData({ ...data, phone_no: e.target.value })
							}
						/>
					</div>

					<div className="col-12">
						<label htmlFor="inputGender" className="form-label">
							Gender
						</label>
						<select
							className="form-select"
							id="inputGender"
							value={data.gender || ""}
							onChange={(e) =>
								setData({ ...data, gender: e.target.value })
							}
						>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</div>
					<div className="col-12">
						<label htmlFor="inputFlatNO." className="form-label">
							Flat Number
						</label>
						<input
							type="text"
							className="form-control"
							id="inputFlat"
							placeholder="Flat"
							autoComplete="off"
							value={data.flat_no}
							onChange={(e) =>
								setData({ ...data, flat_no: e.target.value })
							}
						/>
					</div>

					<div className="col-12">
						<label htmlFor="inputAddress" className="form-label">
							Colony
						</label>
						<input
							type="text"
							className="form-control"
							id="inputAddress"
							placeholder="Address"
							autoComplete="off"
							value={data.colony}
							onChange={(e) =>
								setData({ ...data, colony: e.target.value })
							}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="inputDistrict" className="form-label">
							District
						</label>
						<input
							type="text"
							className="form-control"
							id="inputDistrict"
							placeholder="District"
							autoComplete="off"
							value={data.district}
							onChange={(e) =>
								setData({ ...data, district: e.target.value })
							}
						/>
					</div>
					<div className="buttons-div-editTeacher">
						<div className="col-10">
							<button
								onSubmit={handleSubmit}
								className="btn btn-primary"
							>
								Update
							</button>
						</div>
						<div className="col-10">
							<button
								className="btn btn-info"
								onClick={(e) => {
									navigate("/admin/manageTeacher");
								}}
							>
								Go Back
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default EditTeacher;
