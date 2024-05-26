import { formatDate } from "@angular/common";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Gasto } from "../../interfaces/app/gastos-module/gasto";
import { Alignment, Margins, PageSize } from "pdfmake/interfaces";
import { GastoDetalle } from "../../interfaces/app/gastos-module/gasto-detalle";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

function myFormatDate(date: string | Date): string {
    if (date === '') {
        return '';
    } else {
        return formatDate(date, 'dd-MM-yyyy', 'es')
    }
}

function convertArea(area: string): string {
    let val = '';
    switch (area) {
        case 'LAB':
            val = 'LABORATORIO';
            break;

        case 'ADM':
            val = 'ADMINISTRACIÓN';
            break;
    }

    return val;
}

const color_text = '#000000'; //#374151

const colorbg1 = '#15a08c';
const colorbg2 = '#1571a0';
const colorWhite = '#ffffff'
const colorbg3 = '#fff432';


export function pdfGastos(
    type: string,
    objGasto: Gasto,
    image64: string
) {
    var pdfCreation = {
        pageSize: 'Letter' as PageSize,
        //pageOrientation: 'landscape' as PageOrientation,
        //pageMargins: [25, 25, 25, 25] as Margins,
        //watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
        /*pageSize: {
            width: 595.28,
            height: 'auto'
        },*/
        info: {
            title: 'INGENIALAB ' + objGasto.codigo_gasto,
            author: 'INGENIALAB',
            subject: 'GASTOS',
            keywords: objGasto.area,
        },
        content: [
            {
                table: {
                    widths: ['auto', '*', 'auto', '*'],
                    body: [
                        // Cabecera
                        [
                            {
                                text: 'Código: ' + objGasto.codigo_gasto,
                                fontSize: 8
                            },
                            {
                                text: 'REGISTRO', colSpan: 2,
                                alignment: 'center' as Alignment,
                                bold: true,
                            },
                            {},
                            {
                                image: image64,
                                width: 110,
                                rowSpan: 4,
                                alignment: 'center' as Alignment,
                            }
                        ],
                        [
                            {
                                text: 'Versión: ' + objGasto.version,
                                fontSize: 8
                            },
                            {
                                text: 'ORDEN DE COMPRA', colSpan: 2, rowSpan: 3,
                                alignment: 'center' as Alignment,
                                bold: true,
                                margin: [0, 10, 0, 10] as Margins
                            },
                            {},
                            {}
                        ],
                        [
                            {
                                text: 'Vigencia desde: ' + objGasto.fec_vigencia,
                                fontSize: 8
                            },
                            {},
                            {},
                            {}
                        ],
                        [
                            {
                                text: 'Registro: ' + objGasto.registro,
                                fontSize: 8
                            },
                            {},
                            {},
                            {}
                        ],
                        [
                            { text: ' ', border: [false] }, { text: '', border: [false] }, { text: '', border: [false] }, { text: '', border: [false] }
                        ],
                        [
                            {
                                text: 'ÁREA', bold: true
                            },
                            {
                                text: convertArea(objGasto.area), alignment: 'center' as Alignment
                            },
                            {
                                text: 'FECHA DE EMISIÓN', bold: true
                            },
                            {
                                text: myFormatDate(objGasto.fec_emision), alignment: 'center' as Alignment
                            },
                        ],
                        [
                            {
                                text: 'PROVEEDOR', bold: true
                            },
                            {
                                text: objGasto.proveedor.razon.toUpperCase(), alignment: 'center' as Alignment, colSpan: 3
                            },
                            {}, {}
                        ],
                        [
                            {
                                text: 'NIT PROVEEDOR', bold: true
                            },
                            {
                                text: objGasto.proveedor.nit, alignment: 'center' as Alignment
                            },
                            {
                                text: 'TIPO DE CAMBIO', bold: true
                            },
                            {
                                text: String(objGasto.tipo_cambio), alignment: 'center' as Alignment
                            },
                        ],
                        [
                            {
                                text: 'TIPO DE PAGO', bold: true
                            },
                            {
                                text: objGasto.tipo_pago, alignment: 'center' as Alignment
                            },
                            {
                                text: 'TIEMPO DE CRÉDITO', bold: true
                            },
                            {
                                text: objGasto.tiempo_credito, alignment: 'center' as Alignment
                            },
                        ],
                        [
                            {
                                text: 'DESCRIPCION', bold: true
                            },
                            {
                                text: objGasto.descripcion, alignment: 'center' as Alignment
                            },
                            {
                                text: 'FECHA DE ENTREGA', bold: true
                            },
                            {
                                text: myFormatDate(objGasto.fec_entrega), alignment: 'center' as Alignment
                            },
                        ],
                        [
                            { text: ' ', border: [false] }, { text: '', border: [false] }, { text: '', border: [false] }, { text: '', border: [false] }
                        ],
                        [
                            { text: 'II.- DATOS DE COMPRA ', bold: true, colSpan: 4, color: colorWhite, fillColor: colorbg1 }, {}, {}, {}
                        ],
                        [
                            { text: ' ', border: [false] }, { text: '', border: [false] }, { text: '', border: [false] }, { text: '', border: [false] }
                        ]
                    ]
                },
                layout: {
                    defaultBorder: true,
                    hLineWidth: function (i: any, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                    },
                    vLineWidth: function (i: any, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
                    },
                    hLineColor: function (i: any, node: any) {
                        return (i === 0 || i === node.table.body.length) ? color_text : color_text;
                    },
                    vLineColor: function (i: any, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? color_text : color_text;
                    }
                },
                color: color_text, fontSize: 9
            },
            {
                table: {
                    widths: ['auto', '*', 'auto', '*', 'auto', 'auto'],
                    body: generateTableData(objGasto)
                },
                layout: {
                    defaultBorder: true,
                    hLineWidth: function (i: any, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                    },
                    vLineWidth: function (i: any, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
                    },
                    hLineColor: function (i: any, node: any) {
                        return (i === 0 || i === node.table.body.length) ? color_text : color_text;
                    },
                    vLineColor: function (i: any, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? color_text : color_text;
                    }
                },
                color: color_text, fontSize: 9,
                margin: [0, 0, 0, 0] as Margins // posiblemente agregar el margin bottom de 160
            }
        ],
        footer: (currentPage: any, pageCount: any) => {
            if (currentPage === pageCount) {
                return {
                    margin: [40, -160, 40, 0] as Margins,
                    stack: [
                        {
                            table: {
                                widths: [90, '*'],
                                body: [
                                    [{ text: 'III.- DATOS BANCARIOS', bold: true, colSpan: 2, color: colorWhite, fillColor: colorbg1 }, {}],
                                    [{ text: 'NRO DE CUENTA', bold: true }, { text: objGasto.proveedor.nro_cuenta, alignment: 'center' as Alignment }],
                                    [{ text: 'BANCO', bold: true }, { text: objGasto.proveedor.banco, alignment: 'center' as Alignment }],
                                    [{ text: 'BENEFICIARIO', bold: true }, { text: objGasto.proveedor.beneficiario, alignment: 'center' as Alignment }],
                                    [{ text: 'MONEDA', bold: true }, { text: objGasto.proveedor.moneda, alignment: 'center' as Alignment }],
                                    [
                                        { text: ' ', border: [false] }, { text: '', border: [false] }
                                    ]
                                ]
                            },
                            layout: {
                                defaultBorder: true,
                                hLineWidth: function (i: any, node: any) {
                                    return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                                },
                                vLineWidth: function (i: any, node: any) {
                                    return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
                                },
                                hLineColor: function (i: any, node: any) {
                                    return (i === 0 || i === node.table.body.length) ? color_text : color_text;
                                },
                                vLineColor: function (i: any, node: any) {
                                    return (i === 0 || i === node.table.widths.length) ? color_text : color_text;
                                }
                            },
                            color: color_text, fontSize: 9
                        },
                        {
                            table: {
                                widths: ['*', '*'],
                                body: [
                                    [
                                        { text: 'ELABORADO POR:\n\n\n\n', bold: true },
                                        { text: 'REVISADO Y APROBADO POR:\n\n\n\n', bold: true }
                                    ],
                                    [
                                        { text: '(FIRMA / SELLO)' },
                                        { text: '(FIRMA / SELLO)' }
                                    ],
                                    [
                                        { text: 'Nombre y apellido:', italics: true },
                                        { text: 'Nombre y apellido:', italics: true },
                                    ]
                                ]
                            },
                            layout: {
                                defaultBorder: true,
                                hLineWidth: function (i: any, node: any) {
                                    return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                                },
                                vLineWidth: function (i: any, node: any) {
                                    return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
                                },
                                hLineColor: function (i: any, node: any) {
                                    return (i === 0 || i === node.table.body.length) ? color_text : color_text;
                                },
                                vLineColor: function (i: any, node: any) {
                                    return (i === 0 || i === node.table.widths.length) ? color_text : color_text;
                                }
                            },
                            color: color_text, fontSize: 9
                        },
                        { text: `Página ${currentPage} de ${pageCount}`, alignment: 'center' as Alignment, margin: [0, 10, 0, 20] as Margins, fontSize: 8 }
                    ]
                };
            } else {
                return {
                    margin: [0, 0, 0, 20] as Margins,
                    columns: [
                        { text: `Página ${currentPage} de ${pageCount}`, alignment: 'center' as Alignment }
                    ],
                };
            }
        },
        pageMargins: [40, 40] as Margins
    };

    switch (type) {
        case 'descargar':
            pdfMake.createPdf(pdfCreation).download(objGasto.codigo_gasto + '.pdf');
            break;

        case 'imprimir':
            pdfMake.createPdf(pdfCreation).open();
            break;
    }
}

function generateTableData(objGasto: Gasto): any {

    let tableData = [];

    tableData.push(
        [
            { text: 'NRO', alignment: 'center' as Alignment, bold: true, margin: [0, 9, 0, 9] as Margins, color: colorWhite, fillColor: colorbg2 },
            { text: 'DESCRIPCIÓN', alignment: 'center' as Alignment, bold: true, margin: [0, 9, 0, 9] as Margins, color: colorWhite, fillColor: colorbg2 },
            { text: 'CANTIDAD', alignment: 'center' as Alignment, bold: true, margin: [0, 9, 0, 9] as Margins, color: colorWhite, fillColor: colorbg2 },
            { text: 'UNIDAD DE\nMEDIDA', alignment: 'center' as Alignment, bold: true, margin: [0, 2, 0, 0] as Margins, color: colorWhite, fillColor: colorbg2 },
            { text: 'PRECIO\nUNITARIO', alignment: 'center' as Alignment, bold: true, margin: [0, 2, 0, 0] as Margins, color: colorWhite, fillColor: colorbg2 },
            { text: 'TOTAL COMPRAS', alignment: 'center' as Alignment, bold: true, margin: [0, 9, 0, 9] as Margins, color: colorWhite, fillColor: colorbg2 },
        ]
    );

    const detalle = objGasto.detalle as GastoDetalle[];
    for (let i = 0; i < detalle.length; i++) {
        const o = detalle[i] as GastoDetalle;

        tableData.push(
            [
                { text: i + 1, alignment: 'center' as Alignment },
                { text: o.descripcion, alignment: 'left' as Alignment },
                { text: o.cantidad, alignment: 'center' as Alignment },
                { text: o.unidad_medida, alignment: 'center' as Alignment },
                { text: o.precio_unidad, alignment: 'center' as Alignment },
                { text: o.precio_total, alignment: 'right' as Alignment },
            ]
        );
    }

    tableData.push(
        [
            { text: '', border: [false] },
            { text: '', border: [false] },
            { text: 'SUBTOTAL COMPRAS BS.', alignment: 'left' as Alignment, bold: true, colSpan: 3 },
            {},
            {},
            { text: 'BS. ' + objGasto.sub_total, alignment: 'right' as Alignment, bold: true }
        ],
        [
            { text: '', border: [false] },
            { text: '', border: [false] },
            { text: 'DESCUENTO BS.', alignment: 'left' as Alignment, bold: true, colSpan: 3 },
            {},
            {},
            { text: 'BS. ' + objGasto.descuento, alignment: 'right' as Alignment, bold: true }
        ],
        [
            { text: '', border: [false] },
            { text: '', border: [false] },
            { text: 'TOTAL COMPRAS BS.', alignment: 'left' as Alignment, bold: true, colSpan: 3, fillColor: colorbg3 },
            {},
            {},
            { text: 'Bs. ' + objGasto.total_bs, alignment: 'right' as Alignment, bold: true, fillColor: colorbg3 }
        ],
        [
            { text: '', border: [false] },
            { text: '', border: [false] },
            { text: 'TOTAL COMPRAS USD.', alignment: 'left' as Alignment, bold: true, colSpan: 3 },
            {},
            {},
            { text: 'USD. ' + objGasto.total_sus, alignment: 'right' as Alignment, bold: true }
        ]
    );

    tableData.push(
        [
            { text: ' ', border: [false] },
            { text: '', border: [false] },
            { text: '', border: [false] },
            { text: '', border: [false] },
            { text: '', border: [false] },
            { text: '', border: [false] }
        ]
    )


    return tableData;

}

function generarFirmas(objGasto: Gasto): any {
    return [
        {
            table: {
                widths: [90, '*'],
                body: [
                    [{ text: 'III.- DATOS BANCARIOS', bold: true, colSpan: 2, color: colorWhite, fillColor: colorbg1 }, {}],
                    [{ text: 'NRO DE CUENTA', bold: true }, { text: objGasto.proveedor.nro_cuenta, alignment: 'center' as Alignment }],
                    [{ text: 'BANCO', bold: true }, { text: objGasto.proveedor.banco, alignment: 'center' as Alignment }],
                    [{ text: 'BENEFICIARIO', bold: true }, { text: objGasto.proveedor.beneficiario, alignment: 'center' as Alignment }],
                    [{ text: 'MONEDA', bold: true }, { text: objGasto.proveedor.moneda, alignment: 'center' as Alignment }],
                    [
                        { text: ' ', border: [false] }, { text: '', border: [false] }
                    ]
                ]
            },
            layout: {
                defaultBorder: true,
                hLineWidth: function (i: any, node: any) {
                    return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                },
                vLineWidth: function (i: any, node: any) {
                    return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
                },
                hLineColor: function (i: any, node: any) {
                    return (i === 0 || i === node.table.body.length) ? color_text : color_text;
                },
                vLineColor: function (i: any, node: any) {
                    return (i === 0 || i === node.table.widths.length) ? color_text : color_text;
                }
            },
            color: color_text, fontSize: 9
        },
        {
            table: {
                widths: ['*', '*'],
                body: [
                    [
                        { text: 'ELABORADO POR:\n\n\n\n', bold: true },
                        { text: 'REVISADO Y APROBADO POR:\n\n\n\n', bold: true }
                    ],
                    [
                        { text: '(FIRMA / SELLO)' },
                        { text: '(FIRMA / SELLO)' }
                    ],
                    [
                        { text: 'Nombre y apellido:', italics: true },
                        { text: 'Nombre y apellido:', italics: true },
                    ]
                ]
            },
            layout: {
                defaultBorder: true,
                hLineWidth: function (i: any, node: any) {
                    return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                },
                vLineWidth: function (i: any, node: any) {
                    return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
                },
                hLineColor: function (i: any, node: any) {
                    return (i === 0 || i === node.table.body.length) ? color_text : color_text;
                },
                vLineColor: function (i: any, node: any) {
                    return (i === 0 || i === node.table.widths.length) ? color_text : color_text;
                }
            },
            color: color_text, fontSize: 9
        },
    ]
}

const footerFunction = function (currentPage: any, pageCount: any) {
    if (currentPage === pageCount) {
        return {
            margin: [40, 20, 40, 20],
            stack: []
        };
    } else {
        return {
            columns: [
                { text: `Página ${currentPage} de ${pageCount}`, alignment: 'center' }
            ],
            margin: [0, 0, 0, 20]
        };
    }
}