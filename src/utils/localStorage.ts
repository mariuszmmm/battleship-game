export const setLocalStorage = <ValueType>(key: string, value: ValueType) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = <ItemType>(key: string): ItemType | null => {
	const item = localStorage.getItem(key);
	if (item === null) return null;

	return JSON.parse(item) as ItemType;
};