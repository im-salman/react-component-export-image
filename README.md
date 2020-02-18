# react-component-export-image

## Introduction

> Export component as jpeg, png or pdf

## Code Samples

## Component
 ```
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";
import React from "react";
class ComponentToPrint extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}
export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }

  render() {
    return (
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
    </React.Fragment>);
  }
}

```
### Function component
```
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";
import React, { useRef } from "react";

const ComponentToPrint = React.forwardRef((props, ref) => ( 
    <div ref={ref}>Hello World</div>));

const MyComponent = () => {
    const componentRef = useRef();

      return (
      <React.Fragment>
          <ComponentToPrint ref={componentRef} />
          <button onClick={() => exportComponentAsJPEG(componentRef)}>
              Export As JPEG
          </button>
          <button onClick={() => exportComponentAsPDF(componentRef)}>
              Export As PDF
          </button>
          <button onClick={() => exportComponentAsPNG(componentRef)}>
              Export As PNG
          </button>
      </React.Fragment>);
    }

export default MyComponent;
```

## Installation

```
npm i react-component-export-image
or
yarn add react-component-export-image
```