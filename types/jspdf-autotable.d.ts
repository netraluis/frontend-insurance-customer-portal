import "jspdf";
declare module "jspdf" {
  interface jsPDF {
    lastAutoTable?: { finalY?: number };
    internal: {
      getNumberOfPages: () => number;
      pageSize: {
        getWidth: () => number;
        getHeight: () => number;
      };
      [key: string]: any;
    };
  }
} 