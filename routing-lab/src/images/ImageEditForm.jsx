import { useState } from "react";

export function ImageEditForm() {
    const [imageId, setImageId] = useState("");
    const [imageName, setImageName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
        setIsLoading(true);
        // Add your fetch code here...
        fetch(`http://localhost:3000/api/images/${imageId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: imageName })

        }).then((response) => {
            if (response.ok) {
                console.log("Image updated");
            }
            else {
                console.log("Image update failed");
            }
        }).catch((e) => {
            console.log(e);
        })

        setImageId("");
        setImageName("");
        setIsLoading(false);
    }

    return (
        <div>
            <label style={{ display: "block" }}>
                Image ID
                <input
                        value={imageId}
                        disabled={isLoading}
                        onChange={(e) => setImageId(e.target.value)}
                />
            </label>
            <label style={{ display: "block" }}>
                New image name
                <input
                        value={imageName}
                        disabled={isLoading}
                        onChange={(e) => setImageName(e.target.value)}
                />
            </label>
            <button onClick={handleSubmit} disabled={isLoading}>Send request</button>
        </div>
    );
}