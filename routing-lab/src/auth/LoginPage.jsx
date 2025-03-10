import UsernamePasswordForm from "./UsernamePasswordForm.jsx";
import { Link, useNavigate } from "react-router";
import { sendPostRequest } from "./sendPostRequest.js";

export default function LoginPage(props) {
	const navigate = useNavigate(); // Hook for redirection

    async function handleLogin(username, password) {
        try {
            const response = await sendPostRequest("http://localhost:3000/auth/login", {
                username,
                password,
            });

            if (response.success) { 
                props.setAuthToken(response.token); // Store only the token
                navigate("/"); // Redirect to the homepage
            } else {
                console.error("Invalid login response:", response);
            }
			return response.success
        } catch (error) {
            console.error("Login failed:", error);
			return response.error
        }
    }
	return (
		<>
			<h1>Login</h1>
			<UsernamePasswordForm onSubmit={handleLogin}/>
            <p>Don't have an account? <Link href="/register">Register here</Link></p>
		</>
	);
}