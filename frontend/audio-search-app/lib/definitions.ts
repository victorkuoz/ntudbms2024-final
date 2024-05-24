export type Query = {
	title: string;
	file: FormData;
};
export type ResultItem = {
	id: number;
	title: string;
	url: string;
	similarity: number;
};
export type Result = {
	id: number;
	results: Array<ResultItem>;
};