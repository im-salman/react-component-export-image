import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import ReactDOM from 'react-dom';

const fileType = {
    PNG: 'image/png',
    JPEG: 'image/jpeg',
    PDF: 'application/pdf'
};

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

const exportComponent = (node, fileName, backgroundColor, type) => {
    const element = ReactDOM.findDOMNode(node.current);
    return html2canvas(element, {
        backgroundColor: backgroundColor,
        scrollY: -window.scrollY,
        useCORS: true,
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

const exportComponentAsPNG = (node, fileName = 'component.png', backgroundColor = null, type = fileType.PNG) => {
    exportComponent(node, fileName, backgroundColor, type);
};

const exportComponentAsJPEG = (node, fileName = 'component.jpeg', backgroundColor = null, type = fileType.JPEG) => {
    exportComponent(node, fileName, backgroundColor, type);
};

const exportComponentAsPDF = (node, fileName = 'component.pdf', backgroundColor = null, type = fileType.PDF) => {
    exportComponent(node, fileName, backgroundColor, type);
};

export { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG };
