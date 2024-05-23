import { formatDate } from "@angular/common";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CotizacionGeneral } from "../../interfaces/app/servicio-module/cotizacion-general";
import { Persona } from "../../interfaces/app/cliente-module/persona";
import { Cuenta } from "../../interfaces/app/servicio-module/cuenta";
import { Empresa } from "../../interfaces/app/cliente-module/empresa";
import { Alignment, Margins, PageSize } from "pdfmake/interfaces";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

const color_text = '#000000'; //#374151

function myFormatDate(date: string | Date): string {
    if (date === '') {
        return '';
    } else {
        return formatDate(date, 'dd-MM-yyyy', 'es')
    }
}

export function pdfCotizacionGeneral(
    type: string, objCotizacionGeneral: CotizacionGeneral,
    objPersona: Persona, servicios: string,
    tableData: any, cuenta: Cuenta) {
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
        //pageMargins: [25, 25, 25, 25] as Margins,
        //watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
        /*pageSize: {
            width: 595.28,
            height: 'auto'
        },*/
        content: [
            // Título
            {
                text: 'COTIZACIÓN SERVICIOS',
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
                                        text: 'Fecha Solicitud', style: 'title'
                                    },
                                    {
                                        border: [false],
                                        text: ':', style: 'title',
                                    },
                                    {
                                        border: [false],
                                        text: myFormatDate(objCotizacionGeneral.fec_solicitud), style: 'text',
                                    }
                                ],
                                [
                                    {
                                        border: [false],
                                        text: 'Fecha Emisión', style: 'title'
                                    },
                                    {
                                        border: [false],
                                        text: ':', style: 'title',
                                    },
                                    {
                                        border: [false],
                                        text: myFormatDate(objCotizacionGeneral.fec_emision), style: 'text',
                                    }
                                ],
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
                                        text: objCotizacionGeneral.cod_cotizacion, style: 'text',
                                    }
                                ],
                                [
                                    {
                                        border: [false],
                                        text: 'Área', style: 'title'
                                    },
                                    {
                                        border: [false],
                                        text: ':', style: 'title',
                                    },
                                    {
                                        border: [false],
                                        text: 'Laboratorio FRX', style: 'text',
                                    }
                                ],
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
                        ],
                        // Servicio
                        [
                            {
                                columns: [
                                    { text: 'SERVICIO', style: 'title', width: '*' },
                                    { text: ':', style: 'title', alignment: 'right' as Alignment, width: 'auto' }
                                ],
                                margin: [0, 0, 0, 2] as Margins
                            },
                            {
                                border: [false, false, false, true],
                                text: servicios, style: 'text', colSpan: 3
                            },
                            {},
                            {}
                        ],
                        // Observaciones
                        [
                            {
                                columns: [
                                    { text: 'OBSERVACIONES', style: 'title', width: '*' },
                                    { text: ':', style: 'title', alignment: 'right' as Alignment, width: 'auto' }
                                ],
                                margin: [0, 0, 0, 2] as Margins
                            },
                            {
                                border: [false, false, false, true],
                                text: objCotizacionGeneral.observacion, style: 'text', colSpan: 3
                            },
                            {},
                            {}
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
                                        text: 'Bs. ' + objCotizacionGeneral.total_pagar
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
                                        text: 'Bs. ' + objCotizacionGeneral.descuento
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
                                        text: 'Bs. ' + objCotizacionGeneral.costo_total
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
                margin: [0, 0, 0, 0] as Margins // posiblemente agregar el margin bottom de
            },
        ],
        footer: (currentPage: any, pageCount: any) => {
            if (currentPage === pageCount) {
                return {
                    margin: [40, -120, 40, 0] as Margins,
                    stack: [
                        // Condiciones
                        { text: 'CONDICIONES DEL SERVICIO', alignment: 'left' as Alignment, characterSpacing: 0.5, fontSize: 9, bold: true, margin: [0, 10, 0, -5] as Margins },
                        {
                            text: [

                                { text: 'PAGO. ', bold: true },
                                { text: 'Previo entrega de informe de resultados.' },

                                { text: 'VALIDEZ PROPUESTA DE SERVICIO. ', bold: true },
                                { text: 'Esta cotizacion tiene una validez de 30 dias calendario.' },

                                { text: 'MODALIDAD DE PAGO. ', bold: true },
                                { text: 'Cuenta bancaria Nº ' },
                                { text: cuenta.nro_cuenta, bold: true, color: 'red' },
                                { text: ' del Banco ' },
                                { text: cuenta.banco, bold: true, color: 'red' },
                                { text: ' a nombre de ' },
                                { text: cuenta.a_nombre, bold: true, color: 'red' },
                                { text: ' , qr,  cheque y/o en efectivo.' },
                                { text: '\n' },
                                { text: 'Los precios del (los) servicios incluyen impuestos de ley.', fontSize: 9 },
                            ],
                            fontSize: 8,
                            margin: [0, 10, 0, 5] as Margins,
                        },
                        //Requisitos
                        {
                            text: [
                                { text: 'REQUISITOS MINIMOS MUESTRA. ', bold: true },
                                { text: 'Analisis mediante FRX,  muestra mayor a 1 g y espesor mayor a 0,5 mm (joyas, aleaciones, metal dore, metalicos).' },
                                { text: '\n' },
                                { text: 'ENTREGA DE RESULTADOS. ', bold: true },
                                { text: 'El tiempo de entrega del informe de resultados es de hasta 2 dias habiles.' },
                            ],
                            fontSize: 8,
                            margin: [0, 10, 0, 5] as Margins,
                        },
                        // Consultas
                        {
                            text: [
                                { text: 'CONSULTAS Y/O DUDAS. ', bold: true },
                                { text: '\n' },
                                { text: 'Jefe de laboratorio: Ing. Cristhian Aliaga, correo electronico: ' },
                                { text: 'laboratorio@ingenialab.com.bo', bold: true },
                            ],
                            fontSize: 8,
                            margin: [0, 10, 0, 5] as Margins,
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
            pdfMake.createPdf(pdfCreation).download(objCotizacionGeneral.cod_cotizacion + '.pdf');
            break;

        case 'imprimir':
            pdfMake.createPdf(pdfCreation).open();
            break;
    }
}