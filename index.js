import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import ReactDOM from 'react-dom';

const fileType = {
    PNG: 'image/png',
    JPEG: 'image/jpeg',
    PDF: 'application/pdf'
};

/**
 * @param  {string} uri
 * @param  {string} filename
 */
const saveAs = (uri, filename) => {
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
};

/**
 * @param  {React.RefObject} node
 * @param  {string} fileName
 * @param  {string} type
 * @param  {object} html2CanvasOptions={}
 */

const getPDF = (canvas, {w, h, orientation}) => {
    const width = w || canvas.width
    const height = h || canvas.height

    if(orientation === 'l') {
        return new JsPDF('l', 'px', [width, height])
    } else if(orientation === 'p') {
        return new JsPDF('p', 'px', [height, width]);
    } else {
        return canvas.width > canvas.height
        ? new JsPDF('l', 'px', [width, height])
        : new JsPDF('p', 'px', [height, width]);
    }
}

const exportComponent = (node, {
    fileName, 
    type, 
    html2CanvasOptions, 
    pdfOptions
}) => {
    if(!node.current) {
        throw new Error("'node' must be a RefObject")
    }

    const element = ReactDOM.findDOMNode(node.current);
    return html2canvas(element, {
        scrollY: -window.scrollY,
        useCORS: true,
        ...html2CanvasOptions
    }).then(canvas => {
        if (type === fileType.PDF) {
            const pdf = getPDF(canvas, pdfOptions)
            pdf.addImage(
                canvas.toDataURL(fileType.PNG, 1.0), 
                'PNG', 
                pdfOptions.x || 0, 
                pdfOptions.y || 0,
                pdfOptions.w || canvas.width,
                pdfOptions.h || canvas.height
            );
            pdf.save(fileName);
        } else {
            saveAs(canvas.toDataURL(type, 1.0), fileName);
        }
    });
};

/**
 * @param  {React.RefObject} node
 * @param  {string} fileName='component.png'
 * @param  {object} html2CanvasOptions={}
 */
const exportComponentAsPNG = (node, {
    fileName = 'component.png',
    html2CanvasOptions = {}
} = {}) => {
    return exportComponent(node, {
        fileName, 
        type: fileType.PNG, 
        html2CanvasOptions
    });
};

/**
 * @param  {React.RefObject} node
 * @param  {string} fileName='component.jpeg'
 * @param  {string} type=fileType.JPEG
 * @param  {object} html2CanvasOptions={}
 */
const exportComponentAsJPEG = (node, {
    fileName = 'component.jpg', 
    html2CanvasOptions = {}
} = {}) => {
    return exportComponent(node, {
        fileName, 
        type: fileType.JPG, 
        html2CanvasOptions
    });
};

/**
 * @param  {React.RefObject} node
 * @param  {string} fileName='component.pdf'
 * @param  {string} type=fileType.PDF
 * @param  {object} html2CanvasOptions={}
 * @param  {string} pdfOptions={}
 */
const exportComponentAsPDF = (node, {
    fileName = 'component.pdf', 
    html2CanvasOptions = {}, 
    pdfOptions = {}
} = {}) => {
    return exportComponent(node, {
        fileName, 
        type: fileType.PDF, 
        html2CanvasOptions, 
        pdfOptions
    });
};

export { 
    exportComponentAsJPEG,
    exportComponentAsPDF,
    exportComponentAsPNG
};