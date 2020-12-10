declare module 'react-component-export-image' {
    import { Options } from 'html2canvas';
    import { RefObject, ReactInstance } from 'react';

    type PDFOptions = {
        x: number;
        y: number;
        w: number;
        h: number;
        unit: "pt" | "mm" | "cm" | "m" | "in" | "px";
        orientation: 'l' | 'p';
        pdfFormat: string | Array<number>;
    }

    type Params = {
        fileName?: string,
        html2CanvasOptions?: Partial<Options>,
        pdfOptions?: Partial<PDFOptions>,
    }

    type ExportComponentReturn = Promise<(canvas: HTMLCanvasElement) => void>;

    export function exportComponentAsJPEG(
        node: RefObject<ReactInstance>,
        params?: Params
    ): ExportComponentReturn;

    export function exportComponentAsPDF(
        node: RefObject<ReactInstance>,
        params?: Params
    ): ExportComponentReturn;

    export function exportComponentAsPNG(
        node: RefObject<ReactInstance>,
        params?: Params
    ): ExportComponentReturn;
}