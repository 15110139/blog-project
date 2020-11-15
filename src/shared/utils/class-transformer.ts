export function stringToList(str: any): string[] {
	if (typeof str !== 'string') {
		return str;
	}
	if (!str) {
		return [];
	}
	return str.split(',').map((s: string) => s.trim());
}
