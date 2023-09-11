import {} from "react";
import {Layer, LayerContainer, LayerTransitions, useLayersNavigation } from "./lib";

function App() {
	const layersNavigationController = useLayersNavigation({ defaultLayerId: "layer1" });
	console.log(
		"navigation controller",
		layersNavigationController.currentLayer,
		layersNavigationController.stack.toArray()
	);

	return (
		<div>
			<LayerContainer
				className="example-container"
				navigationController={layersNavigationController}
			>
				<Layer
					className="layer1"
					layerId="layer1"
					layerTransition={{
						in: LayerTransitions.verticalSlide,
						out: LayerTransitions.verticalSlide,
					}}
				>
					<h1>Layer 1</h1>
					<input />
				</Layer>
				<Layer
					className="layer2"
					layerId="layer2"
					layerTransition={{
						in: LayerTransitions.horizontalSlide,
						out: LayerTransitions.horizontalSlide,
					}}
				>
					<h1>Layer 2</h1>
					<input />
				</Layer>
				<Layer
					className="layer3"
					layerId="layer3"
					layerTransition={{
						in: LayerTransitions.verticalSlide,
						out: LayerTransitions.horizontalSlide,
					}}
				>
					<h1>Layer 3</h1>
					<input />
				</Layer>
				<Layer
					className="layer4"
					layerId="layer4"
					layerTransition={{
						in: LayerTransitions.scale,
						out: LayerTransitions.verticalSlide,
					}}
				>
					<h1>Layer 4</h1>
				</Layer>
				<Layer
					className="layer"
					layerId="layer5"
					layerTransition={{
						in: LayerTransitions.scale,
						out: LayerTransitions.scale,
					}}
				>
					<h1>Layer 5</h1>
				</Layer>
				<Layer
					className="layer"
					layerId="layer6"
					layerTransition={{
						in: LayerTransitions.scale,
						out: LayerTransitions.verticalSlide,
					}}
				>
					<h1>Layer 6</h1>
				</Layer>
			</LayerContainer>

			<div>
				<button onClick={() => layersNavigationController.push("layer1")}>Layer 1</button>
				<button onClick={() => layersNavigationController.push("layer2")}>Layer 2</button>
				<button onClick={() => layersNavigationController.push("layer3")}>Layer 3</button>
				<button onClick={() => layersNavigationController.push("layer4")}>Layer 4</button>
				<button onClick={() => layersNavigationController.push("layer5")}>Layer 5</button>
				<button onClick={() => layersNavigationController.push("layer6")}>Layer 6</button>
				<button onClick={() => layersNavigationController.goForward()}>Forward</button>
				<button onClick={() => layersNavigationController.goBack()}>Back</button>
				<button onClick={() => layersNavigationController.clear()}>Clear</button>
				<button onClick={() => layersNavigationController.go("layer1")}>
					go to layer 1
				</button>
				<button onClick={() => layersNavigationController.go("layer2")}>
					go to layer 2
				</button>
				<button onClick={() => layersNavigationController.go("layer3")}>
					go to layer 3
				</button>
				<button onClick={() => layersNavigationController.go("layer4")}>
					go to layer 4
				</button>
				<button onClick={() => layersNavigationController.go("layer5")}>
					go to layer 5
				</button>
				<button onClick={() => layersNavigationController.go("layer6")}>
					go to layer 6
				</button>
			</div>
		</div>
	);
}

export default App;
