import { ReactElement } from "react";
import { StackableLayerEventTypes } from "../types/layer";
import { StackableLayer } from "./layer";
import { LayerStack } from "../classes/layer-stack";

export interface LayerNavigationController {
	push: (layerId: string) => void;
	goBack: () => void;
	goForward: () => void;
	go: (layerId: string) => void;
	getLayerByIndex: (index: number) => StackableLayer;
	register: (layers: ReactElement[] | ReactElement) => void;
	clear: () => void;
	stack: LayerStack;
	currentLayer: StackableLayer | undefined;
	currentLayerIndex: number;
	addEventListener: (event: StackableLayerEventTypes, callback: () => void) => void;
}

export interface LayersNavigationProps {
	defaultLayerId: string;
}
