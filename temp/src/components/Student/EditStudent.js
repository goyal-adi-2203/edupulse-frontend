/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./EditStudent.css";

function EditStudent() {
	const [data, setData] = useState({
		first_name: "",
		last_name: "",
		gender: "",
		address: "",
		flat_no: "",
		district: "",
		student_id: "",
	});
	const navigate = useNavigate();
	const { student_id } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:4000/getStu/${student_id}`)
			.then((res) => {
				if (
					res.data.Status === "Success" &&
					res.data.Result.length > 0
				) {
					const studentData = res.data.Result[0];
					setData({
						first_name: studentData.first_name,
						last_name: studentData.last_name,
						gender: studentData.gender,
						address: studentData.colony,
						flat_no: studentData.flat_no,
						district: studentData.district,
						student_id: studentData.student_id,
					});
				} else {
					alert("Student not found");
					navigate("/admin/manageStudent");
				}
			})
			.catch((err) => {
				console.error(err);
				alert("Error fetching student data");
			});
	}, [student_id, navigate]);

	const handleSubmit = (event) => {
		event.preventDefault();

		axios
			.put("http://localhost:4000/updateStu/" + student_id, data)
			.then((res) => {
				if (res.data.Status === "Success") {
					alert("Student updated successfully");
					navigate("/admin/manageStudent");
				} else {
					alert("Failed to update student");
				}
			})
			.catch((err) => {
				console.error(err);
				alert("Error updating student");
			});
	};

	return (
		<div id="editStudent" style={{ display: "flex" }}>
			<ProSidebarProvider>
				<AdminSidePanel />
			</ProSidebarProvider>
			<div className="d-flex flex-column  align-items-center pt-5 ms-5">
				<h2>Update Student</h2>
				<form className="row g-3 w-50" onSubmit={handleSubmit}>
					<div className="col-12">
						<label htmlFor="inputID" className="form-label">
							Student ID
						</label>
						<input
							disabled={true}
							type="text"
							className="form-control"
							id="inputID"
							placeholder="Student ID"
							autoComplete="off"
							value={data.student_id}
							onChange={(e) =>
								setData({ ...data, student_id: e.target.value })
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
						<label htmlFor="inputFlatNo." className="form-label">
							Flat
						</label>
						<input
							type="text"
							className="form-control"
							id="inputFlatNo."
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
							value={data.address}
							onChange={(e) =>
								setData({ ...data, address: e.target.value })
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
					<div className="buttons-div-editStudent">
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
									navigate("/admin/manageStudent");
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

export default EditStudent;
