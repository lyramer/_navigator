import React from "react";
const colors = [
  { val: 0.158489319246111, rgb: "rgb(144, 0, 111)" },
  { val: 0.192526180904482, rgb: "rgb(87, 0, 168)" },
  { val: 0.244205309454866, rgb: "rgb(51, 0, 204)" },
  { val: 0.29665037246411, rgb: "rgb(9, 0, 246)" },
  { val: 0.345111303193609, rgb: "rgb(0, 96, 254)" },
  { val: 0.410261935421287, rgb: "rgb(0, 202, 255)" },
  { val: 0.477282499286605, rgb: "rgb(0, 255, 239)" },
  { val: 0.592451851739179, rgb: "rgb(0, 255, 175)" },
  { val: 0.719685673001152, rgb: "rgb(0, 255, 119)" },
  { val: 0.837253829941663, rgb: "rgb(0, 255, 47)" },
  { val: 1.0170608536466, rgb: "rgb(48, 255, 0)" },
  { val: 1.18320834628868, rgb: "rgb(200, 255, 0)" },
  { val: 1.37649776383357, rgb: "rgb(255, 235, 0)" },
  { val: 1.9877755616314, rgb: "rgb(255, 175, 0)" },
  { val: 2.99733092033801, rgb: "rgb(255, 135, 0)" },
  { val: 4.14525279122888, rgb: "rgb(255, 95, 0)" },
  { val: 6.25055192527396, rgb: "rgb(255, 15, 0)" },
  { val: 9.63104627135738, rgb: "rgb(215, 0, 0)" },
  { val: 14.8398178896756, rgb: "rgb(175, 0, 0)" },
  { val: 20.9716525103165, rgb: "rgb(140, 0, 0)" },
  { val: 31.6227766016831, rgb: "rgb(115, 0, 0)" }
];

const ColorItem = props => (
  <div className="item">
    <div className="color" style={{ backgroundColor: props.rgb }} />
    <div className="value">{props.val.toFixed(3)}</div>
  </div>
);

const ColorBar = props => (
  <div className="colorbar">
    <img
      src="/images/chl_colorbar.png"
      alt="Color Scale"
      className="colorscale"
    />
  </div>
);

export default ColorBar;
