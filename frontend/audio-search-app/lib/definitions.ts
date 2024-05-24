export type ResultItem = {
	title: string;
	filename: string;
	similarity: number;
};
export type Result = {
	results: Array<ResultItem>;
};