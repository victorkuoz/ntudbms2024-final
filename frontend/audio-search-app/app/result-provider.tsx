import { ResultItem } from "@/lib/definitions";
import { moreAudioQuery } from "@/lib/route";
import { createContext, useContext, useState } from "react";

interface ReusltContextType {
	resultHandler: (res: ResultItem[]) => void;
	result: ResultItem[];
	isLoaded: boolean;
    setIsLoaded: (loading: boolean) => void; 
}

const ResultContext = createContext<ReusltContextType>({
	result: [], // set a default value
	resultHandler: () => {},
    isLoaded: false,
    setIsLoaded: () => {}
});

export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
	const [result, setResult] = useState<ResultItem[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const resultHandler = (res: ResultItem[]) => {
		console.log(res);
		setResult(res);
	};

	return (
		<ResultContext.Provider value={{ resultHandler, result, isLoaded, setIsLoaded }}>
			{children}
		</ResultContext.Provider>
	);
};

export const useResultContext = () => useContext(ResultContext);
