import {useActionState} from "react";

const UsernamePasswordForm = (props) => {
	const [result, submitAction, isPending] = useActionState(async (previousState, formData) => {
		const username = formData.get("username");
		const password = formData.get("password");

		if (!username || !password) {
			return {
				type: "error",
				message: `Please fill in your username and password.`
			};
		}

        const submitResult = await props.onSubmit(username, password)
		if(submitResult) {
			return {
				type: "success",
				message: `You have succesfully signed in!`
			};
		}
		else {
			return {
				type: "error",
				message: `Something went wrong with your username or password.`
			};
		}


	}, null);

	return (
		<>
			{result && (
				<p
					className={`message ${result.type}`}
					style={result.type === "error" ? {color: "red"} : {color: "black"}}>
					{result.message}
				</p>
			)}
			{isPending && <p className="message loading">Loading ...</p>}
			<form action={submitAction}>
				<label htmlFor="username">
					Username <input disabled={isPending} type="text" id="username" name="username" />
				</label>
				<label htmlFor="password">
					Password <input disabled={isPending} type="password" id="password" name="password" />
				</label>
				<button type="submit" disabled={isPending}>Sign in</button>
			</form>
		</>
	);
};

export default UsernamePasswordForm;
