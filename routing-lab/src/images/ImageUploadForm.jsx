import {useId, useState, useActionState} from "react";

export function ImageUploadForm({authToken}) {
	const id = useId();
	const [dataUrl, setDataUrl] = useState(null);

	function readAsDataURL(file) {
		return new Promise((resolve, reject) => {
			const fr = new FileReader();
			fr.onload = () => resolve(fr.result);
			fr.onerror = (err) => reject(err);
			fr.readAsDataURL(file);
		});
	}

	function handleChange(event) {
		readAsDataURL(event.target.files[0]).then((dataUrl) => {
			if (dataUrl) {
				setDataUrl(dataUrl);
			}
		});
	}

	const [result, submitAction, isPending] = useActionState(async (previousState, formData) => {
		const image = formData.get("image");
		const name = formData.get("name");

		if (!image || !name) {
			return {
				type: "error",
				message: "Please select an image and enter a title."
			};
		}

        try {
            console.log("TOKEN", authToken)
            const response = await fetch("/api/images", {
                method: "POST",
                body: formData,
                headers: {
				    "Authorization": `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                return {
                    type: "error",
                    message: "Failed to upload image. Please try again."
                };
            }

            return {
                type: "success",
                message: "Image uploaded successfully!"
            };
        } catch (error) {
            console.error(error);
            return {
                type: "error",
                message: "Network error. Please try again later."
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
			{isPending && <p className="message loading">Uploading...</p>}
			<form action={submitAction}>
				<div>
					<label>Choose image to upload: </label>
					<input
						id={id}
						htmlFor={id}
						onChange={handleChange}
						name="image"
						type="file"
						disabled={isPending}
						accept=".png,.jpg,.jpeg"
					/>
				</div>
				<div>
					<label>
						<span>Image title: </span>
						<input name="name" />
					</label>
				</div>

				<div>
					{" "}
					{/* Preview img element */}
					<img style={{maxWidth: "20em"}} src={dataUrl} alt="uploaded-image" />
				</div>

				<button type="submit" disabled={isPending}>
					Confirm upload
				</button>
			</form>
		</>
	);
}
