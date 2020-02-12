# react-component-export-image

## Introduction

> react-component-export-image

## Code Samples

 ```
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";
import React from "react";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }

  render() {
    return 
    <React.Fragment>
        <ComponentToPrint ref={this.componentRef} />
        <button onClick={() => exportComponentAsJPEG(this.componentRef)}>
            Export As JPEG
        </button>
        <button onClick={() => exportComponentAsPDF(this.componentRef)}>
            Export As PDF
        </button>
        <button onClick={() => exportComponentAsPNG(this.componentRef)}>
            Export As PNG
        </button>
    </React.Fragment>
  }
}

```

## Installation

```
npm i react-component-export-image
or
yarn add react-component-export-image
```