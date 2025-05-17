import puppeteer from 'puppeteer'

export async function generateReportPDF(report) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const htmlContent = `
    <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #2c3e50; }
                p { margin: 6px 0; }
            </style>
            <body>
                <h1>Relatório Médico</h1>
                <p><strong>Doutor:</strong> ${report.doctorId.name}</p>
                <p><strong>Paciente:</strong>  ${report.patient.name}</p>
                <p><strong>Idade:</strong> ${report.patient.age}</p>
                <p><strong>Gênero </strong> ${report.patient.gender}</p>
                <p><strong>Diagnótico:</strong> ${report.diagnosis}</p>
                <p><strong>Observações:</strong> ${report.observations || '-'}</p>
                <p><strong>Recomendações:</strong> ${report.recommendation || '-'}</p>
                <p><strong>Data:</strong> ${new Date(report.createdAt).toLocaleDateString()}</p>
            </body>
        </head>
    </html>
  `

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

  const pdfBuffer = await page.pdf({ format: 'A4' })

  await browser.close()

  return pdfBuffer
}
