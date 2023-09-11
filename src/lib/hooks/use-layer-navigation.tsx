import { ReactElement, useEffect, useState } from "react";
import { LayerNavigationController, LayersNavigationProps } from "../interfaces/navigation";
import { StackableLayerEventTypes } from "../types/layer";
import { StackableLayer, StackableLayerEventListener } from "../interfaces/layer";
import { LayerStack } from "../classes/layer-stack";

export const useLayersNavigation = (props: LayersNavigationProps): LayerNavigationController => {
	const [staticLayers, setStaticLayers] = useState<LayerStack>(new LayerStack());
	const [stack, setStack] = useState<LayerStack>(new LayerStack());
	const [currentLayer, setCurrentLayer] = useState<StackableLayer>();
	const [currentLayerIndex, setCurrentLayerIndex] = useState(-1);
	const defaultLayerId = props?.defaultLayerId;
	const [suscribers, setSubscribers] = useState<StackableLayerEventListener[]>([]);

	useEffect(() => {
		const hasLayer = staticLayers.has(defaultLayerId);
		if (hasLayer) {
			push(defaultLayerId);
		}
	}, [defaultLayerId, staticLayers]);

	useEffect(() => {
		const size = stack.size();
		if (size === 1) {
			setCurrentLayer(stack.toArray()[0]);
		} else {
			// setCurrentLayer(stack.toArray().find((layer) => layer.type === LayerType.current));
		}
	}, [stack]);

	useEffect(() => {
		if (currentLayerIndex >= 0) {
			setCurrentLayer(stack.toArray()[currentLayerIndex]);
		}
	}, [currentLayerIndex]);

	const goBack = () => {
		const size = stack.size();
		if (size <= 1) {
			setCurrentLayerIndex(0);
			notifyOnBack();
			return;
		} else {
			const _index = currentLayerIndex - 1;
			if (_index >= 0) {
				setCurrentLayerIndex(_index);
				notifyOnBack();
			}
		}
	};
	const goForward = () => {
		const size = stack.size();
		if (size <= 1) {
			setCurrentLayerIndex(0);
			notifyOnForward();
			return;
		} else {
			const _index = currentLayerIndex + 1;
			if (_index <= size - 1) {
				setCurrentLayerIndex(_index);
				notifyOnForward();
			}
		}
	};
	const go = (layerId: string) => {
		const has = stack.has(layerId);
		if (has === false) return;
		const _stack = [...stack.toArray()];
		const latest = _stack.reduce((acc, curr, i) => {
			if (curr.id === layerId) {
				if (i > acc) {
					acc = i;
				}
			}
			return acc;
		}, -1);
		if (latest >= 0) {
			setCurrentLayerIndex(latest);
			notifyOnGo();
		}
	};

	const getLayerByIndex = (index: number) => {
		return stack.toArray()?.[index];
	};

	const notifyOnPush = () => {
		suscribers.forEach((sub) => {
			if (sub.event === "onPush") {
				sub.callback();
			}
		});
	};

	const notifyOnBack = () => {
		suscribers.forEach((sub) => {
			if (sub.event === "onBack") {
				sub.callback();
			}
		});
	};

	const notifyOnForward = () => {
		suscribers.forEach((sub) => {
			if (sub.event === "onForward") {
				sub.callback();
			}
		});
	};
	const notifyOnGo = () => {
		suscribers.forEach((sub) => {
			if (sub.event === "onGo") {
				sub.callback();
			}
		});
	};

	const push = (layerId: string) => {
		if (currentLayer?.id === layerId) {
			go(layerId);
			return;
		}
		const _stack = new LayerStack(stack.toArray());
		_stack.push({ id: layerId });
		setCurrentLayerIndex(_stack.size() - 1);
		setStack(_stack);
		notifyOnPush();
	};

	const clear = () => {
		const _stack = new LayerStack([{ id: defaultLayerId }]);
		setStack(_stack);
	};

	const register = (layers: ReactElement[] | ReactElement) => {
		const _staticLayersStack = new LayerStack();
		if (Array.isArray(layers) && layers.length > 0) {
			layers.forEach((layer) => {
				_staticLayersStack.push({ id: layer?.props?.layerId });
			});
			setStaticLayers(_staticLayersStack);
		} else {
			setStaticLayers(_staticLayersStack);
		}
	};

	const addEventListener = (event: StackableLayerEventTypes, callback: () => void): void => {
		setSubscribers((value) => {
			const _subscribers = [...value];
			_subscribers.push({
				event: event,
				callback: callback,
			});
			return _subscribers;
		});
	};

	return {
		goBack,
		goForward,
		go,
		push,
		register,
		stack,
		currentLayer,
		currentLayerIndex,
		clear,
		getLayerByIndex,
		addEventListener,
	};
};
