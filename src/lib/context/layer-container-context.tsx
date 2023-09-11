import React from "react";
import { LayerNavigationController } from "../interfaces/navigation";

export interface ILayerContainerContext {
	navigationController: LayerNavigationController | undefined;
}

export const LayerContainerContext = React.createContext<ILayerContainerContext>({
	navigationController: undefined,
});
