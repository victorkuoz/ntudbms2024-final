import { ResultItem } from "./definitions";

const API = (target: string) => `http://127.0.0.1:8000${target}`

// const API = (target: string) => `http://140.112.28.129:8000${target}`;

export const audioQuery = async (file: File) => {
    const formData = new FormData();
	formData.append("audio", file);
    console.log(formData)
    try {
		const response = await fetch(API("/search_by_audio"), {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error(
				`Error sending file URL to Python: ${response.statusText}`
			);
		} else {
            const result = await response.json();
			if (result !== undefined) {
				console.log("result");
				return result.result;
            }
        }
        console.log("no results found");
		return [];
        
	} catch (error) {
		console.error("Error sending file URL to Python:", error);
	}
}

export const fileQuery = async (filename: string) => {
	try {
		const response = await fetch(API(`/query_file/${filename}`), {
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
		const response = await fetch(API(`/query_file/${filename}`), {
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

export const moreAudioQuery = async (filename: string): Promise<ResultItem[]> => {
	try {
		
		const response = await fetch(API(`/search_by_filename/${filename}`), {
			method: "GET",
		});

		if (!response.ok) {
			throw new Error(
				`Error sending file URL to Python: ${response.statusText}`
			);
		}
        const result = await response.json();   
        console.log(result)
        if (result !== undefined) {
            console.log("not undefined")
            return result.result;
        }
        console.log("no results found")
		return [] as ResultItem[];
	} catch (error) {
		console.error("Error sending file URL to Python:", error);
        return [] as ResultItem[];
	}
};