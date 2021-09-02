import React, { useState } from "react"
import { Button, Input } from 'reactstrap';
import "./Panel.scss";

const Panel = (props) => {
	return (
		<div className="panel-container">
			<div className="panel">
				<h1>Polaris</h1>
				<h5>Data Layers</h5>
				<div className="layer-container">
					{LayerList(props.layerList, props.onLayerToggle)}
					{/* <div className="active-layers">
						<ul>
						{ActiveLayerList(props.layerList, props.onLayerToggle)}
						</ul>
					</div>
					<div className="inactive-layers">
						<ul>
						{InactiveLayerList(props.layerList, props.onLayerToggle)}
						</ul>
					</div> */}
				</div>
			</div>
		</div>
	)
}
export default Panel;

const ActiveLayerList = (layers, onToggle) => {
	let activeLayerIDList = Object.keys(layers).filter((layerID) => layers[layerID].display);
	return activeLayerIDList.map((id) => 
					LayerItem({id, ...layers[id]}, onToggle)
	  			 );
}

const InactiveLayerList = (layers, onToggle) => {
	let activeLayerIDList = Object.keys(layers).filter((layerID) => !layers[layerID].display);
	return activeLayerIDList.map((id) => 
					LayerItem({id, ...layers[id]}, onToggle)
	  			 );
}
const LayerList = (layers, onToggle) => {
	return Object.keys(layers).map((id) => 
		LayerItem({id, ...layers[id]}, onToggle)
	);
}

const LayerItem = (layer, onToggle) => {
	return (
		<li key={layer.id} className="layer-item">
			<span className="layer-label">{layer.label}</span>
			<Button 				
				className="info" 
				color="white" 
				id={"info_" + layer.id} 
				onClick={(layer) => console.log(layer)}
			>
				<i className='far fa-question-circle'></i>
			</Button>
			<Input 
				className="toggle" 
				type="checkbox" 
				id={"toggle_" + layer.id} 
				checked={layer.display}
				onChange={(e) => onToggle(layer.id, e.target.checked)}/>
			{/* <Button className="toggle" color="white" id={"toggle_" + layer.id} onClick={(e) => console.log(e)}>
				{layer.display && <i className='fas fa-times-circle'></i> || <i className='fas fa-plus-circle'></i>}
			</Button> */}

		</li>
	)
}
	