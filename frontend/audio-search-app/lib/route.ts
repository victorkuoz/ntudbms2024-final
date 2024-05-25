
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

export const fileQuery = async (filename: string) => {
	try {
		const response = await fetch(API(`/file_query/${filename}`), {
			method: "GET"
		});

		if (!response.ok) {
			throw new Error(
				`Error sending file URL to Python: ${response.statusText}`
			);
		} 

        const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", filename);
		document.body.appendChild(link);
		link.click();
		link.remove();

	} catch (error) {
		console.error("Error sending file URL to Python:", error);
	}
};

export const audioFetch = async (filename: string) => {
	try {
		const response = await fetch(API(`/file_query/${filename}`), {
			method: "GET",
		});

		if (!response.ok) {
			throw new Error(
				`Error sending file URL to Python: ${response.statusText}`
			);
		}

		const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		return url
	} catch (error) {
		console.error("Error sending file URL to Python:", error);
	}
};

export const moreAudioQuery = async (filename: string) => {
	try {
		const response = await fetch(API(`/more_audio_query/${filename}`), {
			method: "GET",
		});

		if (!response.ok) {
			throw new Error(
				`Error sending file URL to Python: ${response.statusText}`
			);
		}
        const result = await response.json();   
		return result.result
	} catch (error) {
		console.error("Error sending file URL to Python:", error);
	}
};