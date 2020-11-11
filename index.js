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
 * @param  {object} html2CanvasOptions=null
 */

const getPDF = (type, {x, y, orientation}) => {
    if(orientation === 'l') {
        return new JsPDF('l', 'mm', [canvas.width, canvas.height])
    } else if(orientation === 'p') {
        return new JsPDF('p', 'mm', [canvas.height, canvas.width]);
    } else {
        return canvas.width > canvas.height
        ? new JsPDF('l', 'mm', [canvas.width, canvas.height])
        : new JsPDF('p', 'mm', [canvas.height, canvas.width]);
    }
    
}

const exportComponent = ({node, fileName, type, html2CanvasOptions, pdfOptions}) => {
    if(!node.current) {
        throw new Error("'node' must be a RefObject")
    }
    const element = ReactDOM.findDOMNode(node.current);
    return html2canvas(element, {
        backgroundColor: backgroundColor,
        scrollY: -window.scrollY,
        useCORS: true,
        ...html2CanvasOptions
    }).then(canvas => {
        if (type === fileType.PDF) {
            const pdf = getPDF(type, pdfOptions)
            pdf.addImage(canvas.toDataURL(fileType.PNG, 1.0), 'PNG', 0, 0);
            pdf.save(fileName);
        } else {
            saveAs(canvas.toDataURL(type, 1.0), fileName);
        }
    });
};
/**
 * @param  {React.RefObject} node
 * @param  {string} fileName='component.png'
 * @param  {string} type=fileType.PNG
 * @param  {object} html2CanvasOptions=null
 */
const exportComponentAsPNG = ({node, fileName = 'component.png', type = fileType.PNG, html2CanvasOptions = null}) => {
    return exportComponent({node, fileName, type, html2CanvasOptions});
};
/**
 * @param  {React.RefObject} node
 * @param  {string} fileName='component.jpeg'
 * @param  {string} type=fileType.JPEG
 * @param  {object} html2CanvasOptions=null
 */
const exportComponentAsJPEG = ({node, fileName = 'component.jpg', type = fileType.JPG, html2CanvasOptions = null}) => {
    return exportComponent({node, fileName, type, html2CanvasOptions});
};
/**
 * @param  {React.RefObject} node
 * @param  {string} fileName='component.pdf'
 * @param  {string} type=fileType.PDF
 * @param  {object} html2CanvasOptions=null
 * @param  {string} pdfOptions=null
 */
const exportComponentAsPDF = ({node, fileName = 'component.pdf', type = fileType.PDF, html2CanvasOptions = null, pdfOptions = null}) => {
    return exportComponent({node, fileName, type, html2CanvasOptions, pdfOptions});
};

export { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG };