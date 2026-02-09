// Throw an error as an expression
export const yeet =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(error: any): never => {
		throw error;
	};

export default yeet;
