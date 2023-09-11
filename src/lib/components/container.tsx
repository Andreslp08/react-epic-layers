import React, { useEffect } from "react";
import { Provider } from "../context/provider";
import { Layer, LayerProps } from "./layer";
import { LayerNavigationController } from "../interfaces/navigation";

// Define las props para LayerContainer
export interface LayerContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactElement<LayerProps> | React.ReactElement<LayerProps>[];
	navigationController: LayerNavigationController;
}

export const LayerContainer = (props: LayerContainerProps) => {
	const children = props.children;
	const navigationController = props?.navigationController;

	useEffect(() => {
		const areChildrenValid = React.Children.toArray(children).every((child) => {
			if (React.isValidElement(child)) {
				const childType = child.type as React.ComponentType;
				return childType === Layer || (childType && childType.name === "Layer");
			}
			return false;
		});

		if (!areChildrenValid) {
			throw new Error('React Epic Layers "LayerContainer" only must have "Layer" components.');
		}
	}, [children]);

	useEffect(() => {
		if (navigationController.register) {
			navigationController.register(children);
		}
	}, []);

	return (
		<div {...props} className={`react-epic-layers ${props.className}`}>
			<Provider navigationController={props?.navigationController}>
				<div className="rel-container">{props.children}</div>
			</Provider>
		</div>
	);
};
