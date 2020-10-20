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
 * @param  {string} backgroundColor
 * @param  {string} type
 * @param  {object} options=null
 */
const exportComponent = (node, fileName, backgroundColor, type, options) => {
    const element = ReactDOM.findDOMNode(node.current);
    return html2canvas(element, {
        backgroundColor: backgroundColor,
        scrollY: -window.scrollY,
        useCORS: true,
        ...options
    }).then(canvas => {
        if (type === fileType.PDF) {
            const pdf = canvas.width > canvas.height
                ? new JsPDF('l', 'mm', [canvas.width, canvas.height])
                : new JsPDF('p', 'mm', [canvas.height, canvas.width]);
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
 * @param  {string} backgroundColor=null
 * @param  {string} type=fileType.PNG
 * @param  {object} options=null
 */
const exportComponentAsPNG = (node, fileName = 'component.png', backgroundColor = null, type = fileType.PNG, options = null) => {
    return exportComponent(node, fileName, backgroundColor, type, options);
};
/**
 * @param  {React.RefObject} node
 * @param  {string} fileName='component.jpeg'
 * @param  {string} backgroundColor=null
 * @param  {string} type=fileType.JPEG
 * @param  {object} options=null
 */
const exportComponentAsJPEG = (node, fileName = 'component.jpeg', backgroundColor = null, type = fileType.JPEG, options = null) => {
    return exportComponent(node, fileName, backgroundColor, type, options);
};
/**
 * @param  {React.RefObject} node
 * @param  {string} fileName='component.pdf'
 * @param  {string} backgroundColor=null
 * @param  {string} type=fileType.PDF
 * @param  {object} options=null
 */
const exportComponentAsPDF = (node, fileName = 'component.pdf', backgroundColor = null, type = fileType.PDF, options = null) => {
    return exportComponent(node, fileName, backgroundColor, type, options);
};

export { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG };
