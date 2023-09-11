import React from "react";
import { LayerNavigationController } from "../interfaces/navigation";
import { LayerContainerContext } from "./layer-container-context";

export interface LayersNavigationProviderProps {
	navigationController: LayerNavigationController;
	children: React.ReactNode;
}
export const Provider: React.FC<LayersNavigationProviderProps> = ({
	children,
	navigationController,
}) => {
	return (
		<LayerContainerContext.Provider value={{ navigationController }}>
			{children}
		</LayerContainerContext.Provider>
	);
};
