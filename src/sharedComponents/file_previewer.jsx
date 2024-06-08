import React from "react";

// app component
function main(props) {
  const { input_unique } = props
  const c_content = {
    //   all: "initial",
    //   position: "fixed",
    position: "relative",


    //  top: "0px",
    //  left: "300px",
    //  bottom: "25px",
    // width: "40%",
    background: "black",
    width: "145px",
    height: "165px",

  }
  const c_iframe = {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    height: "100%",
    width: "100%"
  }

  const { url } = props
  return <div id={"frame_container" + input_unique} style={c_content}>

    <iframe
      style={c_iframe}
      src={url}
      name={"frame_" + input_unique}
      id={"frame_" + input_unique}
      frameBorder={0}
      marginWidth={0}
      marginHeight={0}
      scrolling="auto"
    />
  </div>

}
export default main


