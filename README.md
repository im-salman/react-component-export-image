# react-component-export-image

## Demo [Codesandbox](https://codesandbox.io/s/nostalgic-poincare-7xfrl?file=/src/App.js)

## Introduction

- Export component as jpeg, png or pdf
- Each export expect a {React.RefObject} node, optional fileName, and optional html2CanvasOptions object which you wish to pass it to html2Canvas
- exportComponentAsPDF also accepts an optional pdfOptions object with these optional fields {w, h, x, y, unit, orientation, pdfFormat}
```js
w = 100 (Width in pixels - defaults to the width of the element)

h = 50 (Height in pixels - defaults to the height of the element)

x = 0 (X Coordinate in pixels against left edge of the page - defaults to 0)

y = 0 (Y Coordinate in pixels against left edge of the page - defaults to 0)

unit = 'px' (Measurement unit (base unit) to be used when coordinates are specified.
Possible values are "pt" (points), "mm", "cm", "m", "in" or "px". - defaults to 'mm')
    - if you are trying to get the pdf to fill up the exact space, try setting unit to "px"

orientation = 'p' (portrait) OR 'l' (landscape) - defaults: 
    - landscape if width > height
     or 
    - portrait if height > width

The format of the PDF. Can be:

    a0 - a10
    b0 - b10
    c0 - c10
    dl
    letter
    government-letter
    legal
    junior-legal
    ledger
    tabloid
    credit-card

    Default is "a4". If you want to use your own format just pass instead of one of the above predefined formats the size as an number-array, e.g. [595.28, 841.89]
```

## How to Upgrade
The previous way of using an export looked like this: 
> exportComponentAsJPEG(node, fileName, type, backgroundColor, options)

The new way: pass node & an optional object with only the fields you need. 
- backgroundColor is no longer accepted in this main object, but is accepted in the "html2CanvasOptions" object, which is passed directly to html2canvas
- type is no longer accepted - JPG will always produce JPG, PNG => PNG, PDF => PDF

> exportComponentAsJPEG(node, {fileName, html2CanvasOptions})

- exportComponentAsPDF also accepts an additional pdfOptions object (see introduction)

> exportComponentAsPDF(node, {fileName, html2CanvasOptions, pdfOptions})

## Code Samples

### Component
 ```jsx
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import React from 'react';

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
      </React.Fragment>
    );
  }
}
```
### Function component
```jsx
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import React, { useRef } from 'react';

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref}>Hello World</div>
));

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
    </React.Fragment>
  );
};

export default MyComponent;
```

## Installation

```bash
npm i react-component-export-image
or
yarn add react-component-export-image
```
