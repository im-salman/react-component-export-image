declare module 'react-component-export-image' {
    import { Options } from 'html2canvas';
    import { RefObject, ReactInstance } from 'react';

    type ExportComponentArgs = [
        node: RefObject<ReactInstance>,
        fileName?: string,
        backgroundColor?: string,
        type?: string,
        options?: Partial<Options>,
        pdfOrientation?: string,
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
