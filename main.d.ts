declare module 'react-component-export-image' {
    import { Options } from 'html2canvas';
    import { RefObject } from 'react';

    type ExportComponentArgs = [
        node: RefObject<HTMLAllCollection>,
        fileName?: string,
        backgroundColor?: string,
        type?: string,
        options?: Partial<Options>,
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
