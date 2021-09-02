## Table of Contents

- [Overview](#overview)
- [Build Notes](#build-notes)
- [Deployment](#Deployment)
- [Updating With New Map Data](#updating-with-new-map-data)
- [To Do](#to-do)
- [Notes](#notes)

## Overview

This project was built off the backbone of AlgaeExplorer \([Github](https://github.com/derekja/coaxmap), [Website](https://algaeexplorer.ca/)\). This current version was built and is maintained by [Andy Wynden](https://www.andywynden.com). The heavy data lifter is Derek Jacoby, who has taken visualization scripts developed by [The Surreal Lab](https://www.surreallab.org/) at UVic, and has made these image products palatable to web applications. 

We used [OpenLayers](https://openlayers.org/) as the backbone of this project. Many thanks to the lovely folks at [OSM](https://www.openstreetmap.org) without which our project and OpenLayers would not be possible. [ReactStrap](https://reactstrap.github.io/) made it pretty. Special shout out to [Matthew Brown's article on using OL in React](https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744]).

## Build Notes

~~Because the data we get from the ? quarterly ? processing of images from Compute Canada is in a seperate folder, I've created a script which re-creates the symlink to this folder inside the build folder. This means that **during deployment on the server, use npm run server-build**. On your local machine, running npm run build is just fine as you'll need to import a handful of overlays so that map data shows up properly.~~

*Note that this has changed to simply providing the image path (which does not use a symlink) in the src/mapConfig file. We may want to implement an automatic processing pipeline for new images, so I am leaving this particular quirk in place for the moment. If you want to add a new image manually, see the [Updating With New Map Data](#updating-with-new-map-data) section.*


## Deployment

server deployment consists of sync'ing the project on the server, then running server-build as above. The next step is to add a proxy-pass statement to your nginx server block for each route in the API on the server side. http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass

The nginx server block can simply point to the build folder for the client side, but the server side will have to be explicitly started. Just with the command "node server.js" for testing purposes, but for long-term deployment the use of pm2 or some other task runner is advised. This will allow the server to survive reboots.

make sure libnetcdf-dev is on the server per instructions here: https://www.npmjs.com/package/netcdf4

## Updating With New Map Data

#### Background
Due to the need for A/B testing between different types of visualizations, all of the layers are defined in a dictionary-style object found in src/mapConfig.js. This layerDef object consists of key/value pairs, where the key is the id for the map layer type (eg osm, sdi, etc), and the value is an object which contains the properties:

```
    [*yourID*]
      type: ['Raster'|'Tile'],
      label: ['Label'],
      source: ['/path/to/img.png'],
      display: [true|false],
      colorbar: [true|false], // would need to become a link to file if we get fancy
      projection [raster type only]: [options.projection | custom proj4 projection],
      extent [raster type only]: [minx, miny, maxx, maxy]
```



#### Implementation
simply add another entry to the layerDefs dictionary in src/mapConfig.js and a link to that layer [yourdomain.com]/[key] will automatically be created. Similarly, a new checkbox toggle for that layer will show up in Panel, if it is enabled. More info on this structure in the [Updating With New Map Data](#updating-with-new-map-data) section.


## To Do

-Pinging the server to check if the image exists so we don't have a big fat nothing to display (with no error) if for some reason the imagery isn't found.

-Make ModSquad png smaller. Jeez.

## Notes

on windows concurrently does not always work from a git shell. You may need to remove the $ in node_modules/spawn-default-shell/src/get-shell.js per this issue: https://github.com/angular/quickstart/issues/359

to run navigate to the server directory and execute "npm start" from there so that both server and client are started.

-

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Please go see their documentation if you have any questions regarding this.
