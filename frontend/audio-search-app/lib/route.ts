
const API = (target: string) => `http://127.0.0.1:8000${target}`

export const audioQuery = async (file: File) => {
    const formData = new FormData();
	formData.append("file", file);
    console.log(formData)
    try {
		const response = await fetch(API("/audio_query"), {
			method: "POST",
			body: formData
		});

		if (!response.ok) {
			throw new Error(
				`Error sending file URL to Python: ${response.statusText}`
			);
		} else {
            console.log(response)
        }
	} catch (error) {
		console.error("Error sending file URL to Python:", error);
	}
}




const sendFileUrlToPython = async (fileUrl: string) => {
	try {
		const response = await fetch(API("/audio_query"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ fileUrl }),
		});

		if (!response.ok) {
			throw new Error(
				`Error sending file URL to Python: ${response.statusText}`
			);
		}

		const blob = await response.blob();
		const filename = fileUrl.split("/").pop(); // Extract filename from URL

		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `${filename}`);
		link.click();
		// Handle the response from the Python backend (e.g., display success message)
	} catch (error) {
		console.error("Error sending file URL to Python:", error);
		// Handle errors gracefully (e.g., display an error message to the user)
	}
};

export const downloadFile = async (fileUrl: string) => {
	const file = await sendFileUrlToPython(fileUrl);
	return;
};
