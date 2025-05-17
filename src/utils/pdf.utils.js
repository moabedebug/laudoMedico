import fs from 'fs'
import ejs from 'ejs'
import path from 'path'
import puppeteer from 'puppeteer'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function generateReportPDF(report) {
  const templatePath = path.join(__dirname, '..', 'templates', 'report.ejs')
  const logoFilePath = path.join(__dirname, '..', 'assets', 'logo1.png')

  const logoBuffer = fs.readFileSync(logoFilePath)
  const logoBase64 = logoBuffer.toString('base64')
  const logoDataUri = `data:image/png;base64,${logoBase64}`

  const htmlContent = await ejs.renderFile(templatePath, {
    report,
    logoDataUri,
  })

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

  const pdfBuffer = await page.pdf({ format: 'A4' })
  await browser.close()

  return pdfBuffer
}
