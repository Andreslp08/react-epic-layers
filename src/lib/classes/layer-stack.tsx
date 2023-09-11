import { StackableLayer } from "../interfaces/layer";

export  class LayerStack {
	private arr: StackableLayer[];
	constructor(arr?: StackableLayer[]) {
		if (arr) {
			this.arr = arr;
		} else {
			this.arr = [];
		}
	}

	push(element: StackableLayer) {
		this.arr.push(element);
	}

	pop() {
		return this.arr.pop();
	}

	replace(layerId: string, element: StackableLayer) {
		const findIndex = this.arr.findIndex((el) => el.id === layerId);
		if (findIndex >= 0) {
			this.arr[findIndex] = element;
		} else {
			this.push(element);
		}
	}

	clear() {
		this.arr = [];
	}

	has(layerId: string) {
		return this.arr.find((lay) => lay.id === layerId) ? true : false;
	}

	get(layerId: string) {
		return this.arr.find((lay) => lay.id === layerId);
	}

	toArray() {
		return this.arr;
	}

	size() {
		return this.arr.length;
	}
}
