/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AdminSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";
import jwtDecode from "jwt-decode";

function Student() {
	const [data, setData] = useState([]);
	const token = localStorage.getItem("token");
	const decodedToken = jwtDecode(token);
	console.log(decodedToken);
	const username = decodedToken.username;
	useEffect(() => {
		axios
			.get("http://localhost:4000/getStudent")
			.then((res) => {
				if (res.data.Status === "Success") {
					setData(res.data.Result);
				} else {
					alert("Error");
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const handleDelete = (student_id) => {
		axios
			.delete(`http://localhost:4000/delete/${student_id}`)
			.then((res) => {
				if (res.data.Status === "Success") {
					alert("Student Sucessfully Deleted");
					window.location.reload(true);
				} else {
					alert("Error");
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div id="manageStudent" style={{ display: "flex" }}>
			<ProSidebarProvider>
				<AdminSidePanel />
			</ProSidebarProvider>

			<div className="container px-5 py-3">
				<div className="row">
					<div className="d-flex justify-content-center">
						<h3>Student List</h3>
					</div>
					<div>
						<Link
							to={`/admin/${username}/register`}
							className="btn btn-success"
						>
							Add Student
						</Link>
					</div>
				</div>
				<div className="mt-3">
					<table className="table">
						<thead>
							<tr>
								<th>Student ID</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Class</th>
								<th>Gender</th>
								<th>Address</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{data.map((student, index) => {
								return (
									<tr key={index}>
										<td>{student.student_id}</td>
										<td>{student.first_name}</td>
										<td>{student.last_name}</td>
										<td>{student.class_id}</td>
										<td>{student.gender}</td>
										<td>
											{student.flat_no +
												" " +
												student.colony +
												" " +
												student.district}
										</td>
										<td className="action-btns">
											<Link
												to={`/admin/editStudent/${student.student_id}`}
												className="btn btn-primary btn-sm me-2"
											>
												edit
											</Link>
											<button
												onClick={() =>
													handleDelete(
														student.student_id
													)
												}
												className="btn btn-sm btn-danger"
											>
												delete
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Student;
