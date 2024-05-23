import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, Alignment, PageSize, PageOrientation, Size } from 'pdfmake/interfaces';
import { style } from '@angular/animations';
import { formatDate } from "@angular/common";
import { Recepcion } from "../../interfaces/app/recepcion";
import { CotizacionFrx } from "../../interfaces/app/frx-module/cotizacion-frx";
import { Persona } from "../../interfaces/app/cliente-module/persona";
import { OrdenPago } from "../../interfaces/app/orden.trabajo";
import { Empresa } from "../../interfaces/app/cliente-module/empresa";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

function myFormatDate(date: string | Date): string {
    if (date === '') {
        return '';
    } else {
        return formatDate(date, 'dd-MM-yyyy', 'es')
    }
}

const color_text = '#000000'; //#374151
export function pdfOrdenFrx(
    type: string,
    objRecepcionFRX: Recepcion,
    objCotizacionFRX: CotizacionFrx,
    objPersona: Persona,
    tableData: any,
    data: OrdenPago
) {
    let cliente = '';
    let direccion = '';
    let ciudad = '';
    let telefono = '';

    if (objPersona.id_empresa === 0) {
        cliente = objPersona.razon;
    } else {
        const x = objPersona.id_empresa as Empresa;
        cliente = x.razon_social;
        direccion = x.direccion;
        ciudad = x.ciudad;
        telefono = x.telefono
    }

    var pdfCreation = {
        pageSize: 'Letter' as PageSize,
        //pageOrientation: 'landscape' as PageOrientation,
        //watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
        /*pageSize: {
            width: 595.28,
            height: 'auto'
        },*/
        info: {
            title: 'INGENIALAB ' + objCotizacionFRX.cod_cotizacion,
            author: 'INGENIALAB',
            subject: 'INGENIALAB FRX ',
            keywords: 'FRX',
        },
        content: [
            // Título
            {
                text: 'ORDEN DE SERVICIO',
                style: 'header',

            },
            { text: '\n\n' },
            // Fechas - Codigo cotizacion
            {
                columns: [
                    {
                        table: {
                            widths: ['auto', 'auto', '*'],
                            body: [
                                [
                                    {
                                        border: [false],
                                        text: 'Fecha Recepción', style: 'title'
                                    },
                                    {
                                        border: [false],
                                        text: ':', style: 'title',
                                    },
                                    {
                                        border: [false],
                                        text: myFormatDate(objRecepcionFRX.fec_recepcion), style: 'text',
                                    }
                                ]
                            ]
                        },

                    },
                    {
                        table: {
                            widths: ['auto', 'auto', '*'],
                            body: [
                                [
                                    {
                                        border: [false],
                                        text: 'Código CTZ', style: 'title'
                                    },
                                    {
                                        border: [false],
                                        text: ':', style: 'title',
                                    },
                                    {
                                        border: [false],
                                        text: objCotizacionFRX.cod_cotizacion, style: 'text',
                                    }
                                ]
                            ]
                        },
                    }
                ]
            },
            { text: '\n' },
            // Datos Cliente
            {
                table: {
                    widths: [100, '*', 70, '*'],
                    borders: [false],
                    layout: "noBorders",
                    body: [
                        // Cliente
                        [
                            {
                                columns: [
                                    { text: 'CLIENTE', style: 'title', width: '*' },
                                    { text: ':', style: 'title', alignment: 'right' as Alignment, width: '*' }
                                ],
                                margin: [0, 0, 0, 2] as Margins
                            },
                            {
                                border: [false, false, false, true],
                                text: cliente, style: 'text', colSpan: 3
                            },
                            {},
                            {}
                        ],
                        // Direccion - Ciudad
                        [
                            {
                                columns: [
                                    { text: 'DIRECCIÓN', style: 'title', width: '*' },
                                    { text: ':', style: 'title', alignment: 'right' as Alignment, width: 'auto' }
                                ],
                                margin: [0, 0, 0, 2] as Margins
                            },
                            {
                                border: [false, false, false, true],
                                text: direccion, style: 'text',
                            },
                            {
                                columns: [
                                    { text: 'CIUDAD', style: 'title', width: '*' },
                                    { text: ':', style: 'title', alignment: 'right' as Alignment, width: 'auto' }
                                ]
                            },
                            {
                                border: [false, false, false, true],
                                text: ciudad, style: 'text',
                            },
                        ],
                        // Contacto - Celular
                        [
                            {
                                columns: [
                                    { text: 'CONTACTO', style: 'title', width: '*' },
                                    { text: ':', style: 'title', alignment: 'right' as Alignment, width: 'auto' }
                                ],
                                margin: [0, 0, 0, 2] as Margins
                            },
                            {
                                border: [false, false, false, true],
                                text: objPersona.nombre_persona, style: 'text',
                            },
                            {
                                columns: [
                                    { text: 'CELULAR', style: 'title', width: '*' },
                                    { text: ':', style: 'title', alignment: 'right' as Alignment, width: 'auto' }
                                ]
                            },
                            {
                                border: [false, false, false, true],
                                text: objPersona.celular, style: 'text',
                            },
                        ],
                        // Correo - Teléfono
                        [
                            {
                                columns: [
                                    { text: 'CORREO ELECT.', style: 'title', width: '*' },
                                    { text: ':', style: 'title', alignment: 'right' as Alignment, width: 'auto' }
                                ],
                                margin: [0, 0, 0, 2] as Margins
                            },
                            {
                                border: [false, false, false, true],
                                text: objPersona.email, style: 'text',
                            },
                            {
                                columns: [
                                    { text: 'TELÉFONO', style: 'title', width: '*' },
                                    { text: ':', style: 'title', alignment: 'right' as Alignment, width: 'auto' }
                                ]
                            },
                            {
                                border: [false, false, false, true],
                                text: telefono, style: 'text',
                            },
                        ]
                    ]
                },
                layout: {
                    defaultBorder: false,
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
                    },
                },

            },
            // Detalle
            {
                text: 'DETALLE', alignment: 'center' as Alignment, style: 'title', margin: [0, 10, 0, 10] as Margins
            },
            // Tabla
            {
                table: {
                    fontSize: 8,
                    margin: [0, 0, 0, 0] as Margins,
                    widths: ['auto', 'auto', 'auto', '*', 'auto'],
                    body: tableData
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
            },
            // Costos
            {
                columns: [
                    {
                        margin: [0, 0, 0, 10] as Margins,
                        text: [
                            { text: '' }
                        ],
                    },
                    {
                        margin: [0, 15, 0, 0] as Margins,
                        width: 'auto',
                        table: {
                            widths: ['auto', 'auto', '*'],
                            body: [
                                [
                                    {
                                        borderColor: color_text,
                                        border: [true, true, false, true],
                                        margin: [7, 2, 7, 2] as Margins,
                                        alignment: 'left',
                                        bold: true,
                                        text: 'Total a Pagar'
                                    },
                                    {
                                        borderColor: color_text,
                                        border: [false, true, false, true],
                                        margin: [7, 2, 7, 2] as Margins,
                                        alignment: 'left',
                                        bold: true,
                                        text: ':'
                                    },
                                    {
                                        borderColor: color_text,
                                        border: [false, true, true, true],
                                        margin: [7, 2, 7, 2] as Margins,
                                        alignment: 'right',
                                        text: 'Bs. ' + objCotizacionFRX.total_pagar
                                    }
                                ],
                                [
                                    {
                                        borderColor: color_text,
                                        border: [true, true, false, true],
                                        margin: [7, 2, 7, 2] as Margins,
                                        alignment: 'left',
                                        bold: true,
                                        text: 'Descuento'
                                    },
                                    {
                                        borderColor: color_text,
                                        border: [false, true, false, true],
                                        margin: [7, 2, 7, 2] as Margins,
                                        alignment: 'left',
                                        bold: true,
                                        text: ':'
                                    },
                                    {
                                        borderColor: color_text,
                                        border: [false, true, true, true],
                                        margin: [7, 2, 7, 2] as Margins,
                                        alignment: 'right',
                                        text: 'Bs. ' + objCotizacionFRX.descuento
                                    }
                                ],
                                [
                                    {
                                        borderColor: color_text,
                                        border: [true, true, false, true],
                                        margin: [7, 2, 7, 2] as Margins,
                                        alignment: 'left',
                                        bold: true,
                                        text: 'Costo Total'
                                    },
                                    {
                                        borderColor: color_text,
                                        border: [false, true, false, true],
                                        margin: [7, 2, 7, 2] as Margins,
                                        alignment: 'left',
                                        bold: true,
                                        text: ':'
                                    },
                                    {
                                        borderColor: color_text,
                                        border: [false, true, true, true],
                                        margin: [7, 2, 7, 2] as Margins,
                                        alignment: 'right',
                                        text: 'Bs. ' + objCotizacionFRX.costo_total
                                    }
                                ],
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
                        color: color_text, fontSize: 10
                    }
                ],
                margin: [0, 0, 0, 0] as Margins // posiblemente agregar el margin bottom de 270
            },
        ],
        footer: (currentPage: any, pageCount: any) => {
            if (currentPage === pageCount) {
                return {
                    margin: [40, -270, 40, 0] as Margins,
                    stack: [
                        // Datos legales
                        {
                            //absolutePosition: { x: 30, y: 600 },
                            columns: [
                                [
                                    {
                                        text: [
                                            { text: 'El servicio se realizará desde fecha: ' },
                                            { text: myFormatDate(data.desde_fecha), bold: true },
                                            { text: ' hasta fecha: ' },
                                            { text: myFormatDate(data.hasta_fecha), bold: true }
                                        ],
                                        fontSize: 8,
                                        margin: [0, 0, 0, 5] as Margins,
                                    },
                                    // Lugar
                                    {
                                        text: [
                                            { text: 'Lugar del servicio: ' },
                                            { text: data.lugar + '. ', bold: true },
                                            { text: 'Gastos logisticos asumidos por: ' },
                                            { text: data.asumido, bold: true },
                                        ],
                                        fontSize: 8,
                                        margin: [0, 0, 0, 5] as Margins,
                                    },
                                    {
                                        text: 'La empresa contratante se hace cargo del traslado, estadia y alimentacion de los técnicos en caso de mediciones in situ.',
                                        alignment: 'center' as Alignment,
                                        italics: true,
                                        bold: true,
                                        characterSpacing: 0.5,
                                        fontSize: 9,
                                        margin: [0, 5, 0, 10] as Margins,
                                    },
                                    // Requisitos
                                    {
                                        text: [
                                            {
                                                text: 'REQUISITOS MINIMOS MUESTRA(S) DE ENSAYO.\n',
                                                characterSpacing: 0.5,
                                                fontSize: 9,
                                                bold: true,
                                                //margin: [0, 0, 0, 0] as Margins
                                            },
                                            { text: 'Analisis mediante FRX,  muestra(s) mayor a 1 g en caso de viruta y/o grosor mayor a 0,5 mm para laminas.\n' },
                                            { text: 'El cliente requiere el reporte de incertidumbre:' },
                                            { text: data.incertidumbre, bold: true }
                                        ],
                                        fontSize: 8,
                                        margin: [0, 0, 0, 5] as Margins,
                                    },
                                    // Entrega
                                    {
                                        text: [
                                            {
                                                text: 'ENTREGA INFORME DE RESULTADOS.\n',
                                                characterSpacing: 0.5,
                                                fontSize: 9,
                                                bold: true,
                                                //margin: [0, 0, 0, -5] as Margins
                                            },
                                            { text: 'Hasta fecha ' },
                                            { text: myFormatDate(data.entrega), bold: true },
                                            { text: ' mediante ' },
                                            { text: data.mediante + '.', bold: true },
                                        ],
                                        fontSize: 8,
                                        margin: [0, 0, 0, 5] as Margins,
                                    },
                                    // El Pago
                                    {
                                        text: [
                                            { text: 'EL PAGO ', bold: true },
                                            { text: 'por el servicio se realizará ' },
                                            { text: data.pago, bold: true },
                                            { text: ' hasta fecha ' },
                                            { text: myFormatDate(data.pago_hasta) + '.', bold: true },
                                        ],
                                        fontSize: 8,
                                        margin: [0, 0, 0, 5] as Margins,
                                    },
                                    // La factura
                                    {
                                        text: [
                                            { text: 'LA FACTURA ', bold: true },
                                            { text: 'por el servicio se emitira ' },
                                            { text: data.factura, bold: true },
                                            { text: ' hasta fecha ' },
                                            { text: myFormatDate(data.factura_hasta) + '.', bold: true },
                                        ],
                                        fontSize: 8,
                                        margin: [0, 0, 0, 5] as Margins,
                                    },
                                    // 
                                    {
                                        text: [
                                            { text: 'INGENIALAB ', bold: true },
                                            { text: 'garantiza la capacidad y los recursos para cumplir los requisitos establecidos en las fechas definidas. La informacion generada durante el servicio sera de uso exclusivo del cliente y no podra ser utilizada para otros fines, salvo excepcion de aprobacion previa propia del cliente o requerimientos legales. ' },
                                        ],
                                        fontSize: 8,
                                        margin: [0, 0, 0, 5] as Margins,
                                    },
                                    {
                                        text: [
                                            { text: 'El solicitante y la empresa ' },
                                            { text: 'CONFIRMAN LA REALIZACION DEL SERVICIO ', bold: true },
                                            { text: 'aceptando los terminos y condiciones descritas. El incumplimiento del presente acuerdo da el derecho de iniciar cualquier acción legal en el ámbito civil, penal y/o administrativo.' },
                                        ],
                                        fontSize: 8,
                                    }
                                ]
                            ]
                        },
                        { text: '\n\n' },
                        // Frimas
                        {
                            columns: [
                                [
                                    {
                                        text: [
                                            { text: '___________________________________________________\n', margin: [0, 0, 0, 5] as Margins },
                                            { text: 'INGENIALAB SRL', characterSpacing: 0.5 }
                                        ],
                                        alignment: 'center' as Alignment,
                                        bold: true, fontSize: 10,
                                    },
                                    { text: '\n' },
                                    {
                                        table: {
                                            widths: ['auto', 'auto', '*'],
                                            body: [
                                                [
                                                    {
                                                        borderColor: color_text,
                                                        border: [false],
                                                        alignment: 'left',
                                                        bold: true,
                                                        text: 'Nombre'
                                                    },
                                                    {
                                                        borderColor: color_text,
                                                        border: [false],
                                                        alignment: 'left',
                                                        bold: true,
                                                        text: ':'
                                                    },
                                                    {
                                                        borderColor: color_text,
                                                        border: [false],
                                                        alignment: 'left',
                                                        text: '____________________________'
                                                    }
                                                ],
                                                [
                                                    {
                                                        borderColor: color_text,
                                                        border: [false],
                                                        alignment: 'left',
                                                        bold: true,
                                                        text: 'Cargo'
                                                    },
                                                    {
                                                        borderColor: color_text,
                                                        border: [false],
                                                        alignment: 'left',
                                                        bold: true,
                                                        text: ':'
                                                    },
                                                    {
                                                        borderColor: color_text,
                                                        border: [false],
                                                        alignment: 'left',
                                                        text: '____________________________'
                                                    }
                                                ]
                                            ]
                                        },
                                        color: color_text, fontSize: 10
                                    }
                                ],
                                [
                                    {
                                        text: [
                                            { text: '___________________________________________________\n', margin: [0, 0, 0, 5] as Margins },
                                            { text: 'SOLICITANTE', characterSpacing: 0.5 }
                                        ],
                                        alignment: 'center' as Alignment,
                                        bold: true, fontSize: 10,
                                    },
                                    { text: '\n' },
                                    {
                                        table: {
                                            widths: ['auto', 'auto', '*'],
                                            body: [
                                                [
                                                    {
                                                        borderColor: color_text,
                                                        border: [false],
                                                        alignment: 'left',
                                                        bold: true,
                                                        text: 'Nombre'
                                                    },
                                                    {
                                                        borderColor: color_text,
                                                        border: [false],
                                                        alignment: 'left',
                                                        bold: true,
                                                        text: ':'
                                                    },
                                                    {
                                                        borderColor: color_text,
                                                        border: [false],
                                                        alignment: 'left',
                                                        text: '____________________________'
                                                    }
                                                ],
                                                [
                                                    {
                                                        borderColor: color_text,
                                                        border: [false],
                                                        alignment: 'left',
                                                        bold: true,
                                                        text: 'Cargo'
                                                    },
                                                    {
                                                        borderColor: color_text,
                                                        border: [false],
                                                        alignment: 'left',
                                                        bold: true,
                                                        text: ':'
                                                    },
                                                    {
                                                        borderColor: color_text,
                                                        border: [false],
                                                        alignment: 'left',
                                                        text: '____________________________'
                                                    }
                                                ]
                                            ]
                                        },
                                        color: color_text, fontSize: 10
                                    }
                                ],
                            ]
                        },
                        { text: `Página ${currentPage} de ${pageCount}`, alignment: 'center' as Alignment, margin: [0, 10, 0, 20] as Margins, fontSize: 8 }
                    ]
                }
            } else {
                return {
                    margin: [40, 0, 40, 20] as Margins,
                    columns: [
                        { text: `Página ${currentPage} de ${pageCount}`, alignment: 'center' as Alignment }
                    ],
                }
            }
        },
        pageMargins: [40, 60] as Margins,
        styles: {
            header: {
                width: '100',
                characterSpacing: 1,
                fontSize: 12,
                bold: true,
                alignment: 'center' as Alignment,
                color: color_text,
                //margin: [0, 0, 0, 15] as Margins
            },
            title: {
                //width: '100',
                characterSpacing: 0.5,
                fontSize: 10,
                bold: true,
                //alignment: 'left' as Alignment,
                color: color_text,
                //margin: [0, 0, 0, 15] as Margins
            },
            titletable: {
                //width: '100',
                characterSpacing: 0.5,
                fontSize: 10,
                bold: true,
                alignment: 'center' as Alignment,
                color: color_text,
                //margin: [0, 0, 0, 15] as Margins
            },
            texttable: {
                //width: '100',
                characterSpacing: 0.5,
                fontSize: 10,
                //bold: true,
                alignment: 'center' as Alignment,
                color: color_text,
                //margin: [0, 0, 0, 15] as Margins
            },
            text: {
                //width: '100',
                characterSpacing: 0.5,
                fontSize: 10,
                //bold: true,
                //alignment: 'left' as Alignment,
                color: color_text,
                //margin: [0, 0, 0, 15] as Margins
            }
        }
    };

    switch (type) {
        case 'descargar':
            pdfMake.createPdf(pdfCreation).download(objCotizacionFRX.cod_cotizacion + '.pdf');
            break;

        case 'imprimir':
            pdfMake.createPdf(pdfCreation).open();
            break;
    }
}