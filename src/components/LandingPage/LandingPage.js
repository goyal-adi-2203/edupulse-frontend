import React from "react";
// import { Link } from "react-router-dom";
import "./LandingPage.css";
import NavBar from "../NavBar/Navbar";
import { useNavigate } from "react-router-dom";

function LandingPage() {
	const navigate = useNavigate();

	return (
		<div>
			<NavBar Logintext="Login" />
			<div className=" w-full h-screen Landing-page">
				<div className="landing-page-text-div">
					<h2 className="main-head-landing-page-welcome">
						Welcome to{" "}
					</h2>
					<span className="main-head-landing-page">EduPulse</span>
					<div className="main-body-landing-page">
						<span className="main-body-span-landing-page">
							A one stop solution where you can track all of your
							child's progress and ensure their safety in real
							time.
						</span>
					</div>
					<div className="button-div">
						<button
							className="button2"
							onClick={() => {
								navigate("/login");
							}}
						>
							Login
						</button>
						<button
							className="button2"
							onClick={() => {
								const anchor =
									document.querySelector("#About-Us");
								anchor.scrollIntoView({
									behavior: "smooth",
									block: "center",
								});
							}}
						>
							About Us
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
