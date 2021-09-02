import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLTileLayer from "ol/layer/Tile";

const TileLayer = ({ source, zIndex = 0 }) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		console.log("useEffect called", source)
		
		if (!map) return;
		console.log("tile layer created")

		let tileLayer = new OLTileLayer({
			source,
			zIndex,
		});

		map.addLayer(tileLayer);
		tileLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				console.log("tilelayer removed")
				map.removeLayer(tileLayer);
			}
		};
	}, [map, source]);

	return null;
};

export default TileLayer;