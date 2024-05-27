import { ResultItem } from "@/lib/definitions";
import { moreAudioQuery } from "@/lib/route";
import { createContext, useContext, useState } from "react";

interface ReusltContextType {
	resultHandler: (res: ResultItem[]) => void;
	result: ResultItem[];
}

const ResultContext = createContext<ReusltContextType>({
	result: [], // set a default value
	resultHandler: () => {},
});

export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
	const [result, setResult] = useState<ResultItem[]>([]);
	const resultHandler = (res: ResultItem[]) => {
		//const res = await moreAudioQuery(filename);
		console.log(res);
		setResult(res);
	};

	return (
		<ResultContext.Provider value={{ resultHandler, result }}>
			{children}
		</ResultContext.Provider>
	);
};

export const useResultContext = () => useContext(ResultContext);
