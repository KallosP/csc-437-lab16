
export async function sendPostRequest(url, payload) {
        // Add your fetch code here...
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)

        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                return {success: true, token: data.token}
            }
            else if(response.status === 400 || response.status === 401) {
                throw new Error("Something went wrong with your username or password");
            }
        }).catch((e) => {
            return {error: e.message}
        })
}