import { useContext } from "react";
import { ILayerContainerContext, LayerContainerContext } from "../context/layer-container-context";

export  const useLayerContext = (): ILayerContainerContext => {
	return useContext(LayerContainerContext);
};

