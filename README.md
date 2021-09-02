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

*Note that this has changed to simply providing the image path (which does not use a symlink) in the [src/mapConfig file](src/mapConfig.js). We may want to implement an automatic processing pipeline for new images, so I am leaving this particular quirk in place for the moment. If you want to add a new image manually, see the [Updating With New Map Data](#updating-with-new-map-data) section.*


We had lots of issues with node and npm versions, and ended up having to include [nvm](https://github.com/nvm-sh/nvm) in order to address these properly. This project was built using NodeJS 14.17.6 and npm 6.14.14 and if you too find it a nightmare to try to get those installed on Ubuntu 20.04 despite them being the current LTS versions, here's what we did:

**[In your terminal (Linux):]**

Download nvm script and run it:

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`

The script should have edited your ~/.bashrc profile; if you're not using Terminal on Ubuntu, it may have instead popped it in your `~/.bash_profile`, `~/.zshrc`, or `~/.profile`. 
`source ~/.bashrc`

You can check if it worked properly by typing `command -v nvm`.

Now, install the LTS version of NodeJS (which automatically includes the correct version of npm).
`nvm install 'lts/*' --reinstall-packages-from=current`

Alternatively, you can install the precise version if the LTS has changed and it's breaking things:
`nvm install 14.17.6`

Now, navigate to the project root and run `npm install` and it should work perfectly. Note that you still need to choose between `npm run local-build` and `npm run server-build` as `npm build` doesn't work. As it stands, I don't believe there's any meaningful difference between the two scripts, but if we use the symlinks again to pick up new imagery as it becomes available, they will diverge in use cases.

## Deployment

Server deployment consists of sync'ing the project on the server, then running server-build as above. The next step is to add a proxy-pass statement to your nginx server block for each route in the API on the server side. http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass

The nginx server block can simply point to the build folder for the client side, but the server side will have to be explicitly started. Just with the command "node server.js" for testing purposes, but for long-term deployment the use of pm2 or some other task runner is advised. This will allow the server to survive reboots.

make sure libnetcdf-dev is on the server per instructions here: https://www.npmjs.com/package/netcdf4

## Updating With New Map Data

#### Background
Due to the need for A/B testing between different types of visualizations, all of the layers are defined in a dictionary-style object found in [src/mapConfig.js](src/mapConfig.js). This layerDef object consists of key/value pairs, where the key is the id for the map layer type (eg osm, sdi, etc), and the value is an object which contains the properties:

```
    [yourIDGoesHere]
      type: ['Raster'|'Tile'],
      label: ['yourHumanReadableLabel'],
      source: ['/path/to/img.png'],
      display: [boolean],
      colorbar: [boolean], // would need to become a link to a file if we get fancy
      projection [raster type only]: [options.projection| your custom proj4 projection],
      extent [raster type only]: [minx, miny, maxx, maxy]
```

When a new layer is added to the layerDefs dictionary, [the router](src/components/Router.js) will automatically add a new link to the routes, in the format of [yourdomain.com]/[key]. Note that as a result, keys should ideally not include characters that might be misinterpreted by the browser, which is good practice anyways. In addition, a new layer visibility toggle will show up in the Panel if you visit the base url, using the label you provided in the dictionary definition.

#### Implementation

Add another entry to the layerDefs dictionary in [src/mapConfig.js](src/mapConfig.js), following the object format of the existing layers. Note that Raster type layers must have a projection and an extent defined in addition to the other properties. 

If you're doing an API call to an external resource like a WMTS server, you're best off doing that in the App's componentDidMount so that the layer re-renders properly upon that external resource's response to your request.


## To Do

- Add in another (proper) image for the FCSS definition in the layerDefs dictionary.
- Develop a system for symlinking to new imagery as it becomes available
- Fix proxy definition in the package.json
- I'm sure there are more things but I can't think of much at the moment.


## Notes

on windows concurrently does not always work from a git shell. You may need to remove the $ in node_modules/spawn-default-shell/src/get-shell.js per this issue: https://github.com/angular/quickstart/issues/359

to run navigate to the server directory and execute "npm start" from there so that both server and client are started.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Please go see their documentation if you have any questions regarding this.

#### For Andy (how to connect to the server)
```
ssh -p 10197 ubuntu@206.12.92.18
cd /mnt/data/frams/navigator
```
