declare module 'react-component-export-image' {
    import { Options } from 'html2canvas';
    import { RefObject, ReactInstance } from 'react';

    type PDFOptions = {
        x: number;
        y: number;
        orientation: string;
    }

    type ExportComponentArgs = [
        node: RefObject<ReactInstance>,
        params: {
            fileName?: string,
            html2CanvasOptions?: Partial<Options>,
            pdfOptions?: Partial<PDFOptions>,
        }
    ];

    type ExportComponentReturn = Promise<(canvas: HTMLCanvasElement) => void>;

    export function exportComponentAsJPEG(
        ...args: ExportComponentArgs
    ): ExportComponentReturn;

    export function exportComponentAsPDF(
        ...args: ExportComponentArgs
    ): ExportComponentReturn;

    export function exportComponentAsPNG(
        ...args: ExportComponentArgs
    ): ExportComponentReturn;
}
