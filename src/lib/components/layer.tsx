import { useEffect, useRef, useState } from "react";
import { useLayerContext } from "../hooks/use-layer-context";
import { ILayerTransition, StackableLayer } from "../interfaces/layer";
import { LayerTransitions } from "../enums/layer";

// Define las props para Layer
export interface LayerProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	layerId: string;
	layerTransition?: ILayerTransition;
}

export const Layer: React.FC<LayerProps> = (props) => {
	const ref = useRef<HTMLDivElement>();
	const context = useLayerContext();
	const navigationController = context?.navigationController;
	const stack = navigationController?.stack;
	const stackSize = stack.size();
	const current = navigationController?.currentLayer;
	const currentIndex = navigationController?.currentLayerIndex;
	const prevIndex = navigationController?.currentLayerIndex - 1;
	const prev = navigationController?.getLayerByIndex(prevIndex);
	const isPrev = prev?.id === props?.layerId;
	console.log("history", stack, "size", stackSize, "curr", current, "prev", prev);
	const isCurrent = current?.id === props?.layerId;
	const [transitionMode, setTransitionMode] = useState<"in" | "out">("in");
	const [backCurrent, setBackCurrent] = useState<StackableLayer>();
	const transition: ILayerTransition = props?.layerTransition || {
		in: LayerTransitions.horizontalSlide,
		out: LayerTransitions.horizontalSlide,
	};

	useEffect(() => {
		navigationController?.addEventListener("onPush", () => {
			setTransitionMode("in");
		});
		navigationController?.addEventListener("onForward", () => {
			setTransitionMode("in");
		});
		navigationController?.addEventListener("onBack", () => {
			setTransitionMode("out");
		});
		navigationController?.addEventListener("onGo", () => {
			setTransitionMode("in");
		});
	}, []);

	const zIndexManager = () => {
		if (!ref.current) return;

		if (isCurrent) {
			ref.current.style.zIndex = "9999";
		} else {
			if (backCurrent?.id === props?.layerId) {
				ref.current.style.zIndex = "9998";
			} else {
				ref.current.style.zIndex = "-1";
			}
		}
	};

	useEffect(() => {
		zIndexManager();
		return () => {
			console.log("back current", current);
			setBackCurrent(current);
		};
	}, [ref.current, isCurrent, isPrev, current, currentIndex]);

	return (
		<div
			ref={ref as never}
			className={`rel-layer ${
				isCurrent && stackSize > 1
					? `${transitionMode === "in" ? `${transition.in}-in` : `${transition.out}-out`}`
					: ""
			}`}
		>
			{<div {...props}>{props.children}</div>}
		</div>
	);
};
