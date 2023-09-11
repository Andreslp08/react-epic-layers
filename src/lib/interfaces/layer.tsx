import { LayerTransitions } from "../enums/layer";
import { StackableLayerEventTypes } from "../types/layer";

export interface StackableLayer {
	id: string;
}

export interface ILayerTransition {
	in: LayerTransitions;
	out: LayerTransitions;
}

export interface StackableLayerEventListener {
	event: StackableLayerEventTypes;
	callback: () => void;
}
