import {sendPostRequest} from "./sendPostRequest.js";
import UsernamePasswordForm from "./UsernamePasswordForm.jsx";
import { useNavigate } from "react-router";

export default function RegisterPage(props) {
	const navigate = useNavigate(); // Hook for redirection

	async function handleRegister(username, password) {
		try {
			const response = await sendPostRequest("http://localhost:3000/auth/register", {
				username: username,
				password: password
			});
			if (response.success) {
				props.setAuthToken(response.token);
				navigate("/");
			} else {
				console.error("Invalid login response:", response);
			}
			return response.success;
		} catch (error) {
			console.error("Login failed:", error);
			return response.error;
		}
	}

	return (
		<>
			<h1>Register a New Account</h1>
			<UsernamePasswordForm onSubmit={handleRegister} />
		</>
	);
}
