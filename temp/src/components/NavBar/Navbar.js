import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function NavBar(props) {
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	// const [active, setActive] = useState(false);
	// const style = {
	// 	color: "#E5D2CB",
	// 	// Adding media query..
	// 	"@media only screen and (max-width: 768px)": {
	// 		color: "red",
	// 	},
	// };

	useEffect(() => {
        function simulateNetworkRequest() {
            return new Promise((resolve) => setTimeout(resolve, 1000));
		}

		if (isLoading) {
			simulateNetworkRequest().then(() => {
				setLoading(false);
			});
		}
	}, [isLoading]);

	const handleClick = () => {
		setLoading(true);
		setTimeout(function () {
            navigate("/login");
            window.scrollTo(0, 0);
		}, 1000);
	};

	return (
		<>
			<Navbar
				fixed="top"
				key="md"
				expand="md"
				className="bg-body-tertiary mb-5 navbar Navbar-main"
			>
				<Container fluid>
					<Navbar.Brand href="/home">
						<h1 className="navbar-heading">EduPulse</h1>
					</Navbar.Brand>

					<Navbar.Toggle
						aria-controls={`offcanvasNavbar-expand-$md`}
						className="navbar-toggle"
					/>
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-$md`}
						aria-labelledby={`offcanvasNavbarLabel-expand-$md`}
						placement="end"
						className="offcanvas-background"
					>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title
								id={`offcanvasNavbarLabel-expand-$md`}
								style={{ color: "#E5D2CB" }}
							>
								EduPulse
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body style={{height: "100%"}}>
							<Nav className="justify-content-end flex-grow-1 pe-3">
								<Nav.Link
									style={{ color: "#E5D2CB" }}
									className="offcavas-panel"
									onClick={() => {
										navigate("/home");
									}}
								>
									Home
								</Nav.Link>
								<Nav.Link
									style={{ color: "#E5D2CB" }}
									onClick={() => {
										const anchor =
											document.querySelector("#About-Us");
										anchor.scrollIntoView({
											behavior: "smooth",
											block: "center",
										});
									}}
									className="offcavas-panel"
								>
									About Us
								</Nav.Link>
								<NavDropdown
									title="More"
									id="collasible-nav-dropdown"
									className="navbar-dropdown navbar-more offcanvas-panel"
									style={{ color: "white"}}
								>
									<NavDropdown.Item
										href=""
										onClick={() => {
											const anchor =
												document.querySelector(
													"#OurServices"
												);
											anchor.scrollIntoView({
												behavior: "smooth",
												block: "center",
											});
										}}
										className="offcanvas-panel"
									>
										Our Services
									</NavDropdown.Item>
									<NavDropdown.Item
										href=""
										onClick={() => {
											const anchor =
												document.querySelector(
													"#ContactUs"
												);
											anchor.scrollIntoView({
												behavior: "smooth",
												block: "center",
											});
										}}
										className="offcanvas-panel"
									>
										Contact Us
									</NavDropdown.Item>
									<NavDropdown.Item
										href=""
										onClick={() => {
											const anchor =
												document.querySelector("#FAQs");
											anchor.scrollIntoView({
												behavior: "smooth",
												block: "center",
											});
										}}
									>
										FAQs
									</NavDropdown.Item>
								</NavDropdown>
								<Nav.Link href="#Login">
									<Button
										style={{ color: "#383C53" }}
										disabled={isLoading}
										onClick={() => {
											if (!isLoading) handleClick();
										}}
										className="navbar-button navbar-login"
									>
										{isLoading
											? "Loading.."
											: props.Logintext}
									</Button>
								</Nav.Link>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</>
	);
}

// const mediaMatch = window.matchMedia('(min-width: 500px)');
// const [matches, setMatches] = useState(mediaMatch.matches);

// useEffect(() => {
//     const handler = e => setMatches(e.matches);
//     mediaMatch.addListener(handler);
//     return () => mediaMatch.removeListener(handler);
// });

// return (
//     <div style={styles.container(matches)}>
//         <div>First item</div>
//         <div>Second item</div>
//     </div>);
// };

// const styles = {
//     container: isRowBased => ({
//         display: 'flex',
//         flexDirection: isRowBased ? 'row' : 'column',
//         justifyContent: 'space-around'
//     })
