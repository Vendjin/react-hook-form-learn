import { IGroup } from "./transferList";

export const filterData = (query: string, data: IGroup[]) => {
	if (!query) {
		return data;
	} else {
		return data.filter((d) => d.name.toLowerCase().includes(query));
	}
};

export function not(a: readonly IGroup[], b: readonly IGroup[]) {
	return a.filter(value => b.indexOf(value) === -1);
}

export function intersection(a: readonly IGroup[], b: readonly IGroup[]) {
	return a.filter(value => b.indexOf(value) !== -1);
}

export function union(a: readonly IGroup[], b: readonly IGroup[]) {
	return [...a, ...not(b, a)];
}
