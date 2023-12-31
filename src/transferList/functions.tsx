import { IGroup } from "./transferList";

export const filterData = (query: string, data: IGroup[]) => {
	if (!query) {
		return data;
	} else {
		return data.filter((d) => d.name.toLowerCase().includes(query));
	}
};

export function not(a: IGroup[], b: IGroup[]) {
	return a.filter(value => b.indexOf(value) === -1);
}

export function intersection(a: IGroup[], b: IGroup[]) {
	// console.log('left', a)
	// console.log('right', b)
	// console.log(a.filter(value => b.indexOf(value) !== -1))
	return a.filter(value => b.indexOf(value) !== -1);
}

export function union(a: IGroup[], b: IGroup[]) {
	return [...a, ...not(b, a)];
}
