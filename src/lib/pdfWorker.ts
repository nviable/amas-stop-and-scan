import { pdfjs } from "react-pdf";

/** Served from public/ — copied on install/build to match react-pdf's pdfjs-dist version */
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
