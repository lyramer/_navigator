import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import App from "./App";
import { layerDefs } from "../mapConfig";
import { updateLayers } from "../helpers";


const layerRoutes = Object.keys(layerDefs).map(layerID => {
  let layers = updateLayers(true, "display", layerID, layerDefs);
  return (
    <Route key={layerID} exact path={"/"+layerID}
      render={(props) => (
        <App {...props} layers={layers} showPanel={false}/>
      )}
    />
  )
});


const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={(props) => (
                <App {...props} layers={{...layerDefs}} showPanel={true}/>
              )} />
      {layerRoutes}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
