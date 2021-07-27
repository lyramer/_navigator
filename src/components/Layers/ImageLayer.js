import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import {Image as OLImageLayer} from "ol/layer";
import RasterSource from 'ol/source/Raster';

const ImageLayer = ({ source, style, zIndex = 1 }) => {
	const { map } = useContext(MapContext);

    console.log("ImageLayer");
	useEffect(() => {
		if (!map) return;

		let ImageLayer = new OLImageLayer({
			source,
			style
		});

		map.addLayer(ImageLayer);
		ImageLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				map.removeLayer(ImageLayer);
			}
		};
	}, [map]);

	return null;
};

export default ImageLayer;