import * as Services from '../services/report.services.js'

export async function create(req, res) {
  try {
    const report = await Services.createReport(req.body, req.user.doctorId)
    return res
      .status(201)
      .json({ message: 'Relatório criado com sucesso', report })
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function findReportsByPatient(req, res) {
  try {
    const reportsPatient = await Services.getReportsByPatient(req.params.id)
    return res
      .status(200)
      .json({ message: 'Relatório(s) do paciente:', reportsPatient })
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function findReportsByDoctor(req, res) {
  try {
    const reportsDoctor = await Services.getReportsByDoctor(req.user.doctorId)
    return res
      .status(200)
      .json({ message: 'Relatório(s) do doutor:', reportsDoctor })
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function findById(req, res) {
  try {
    const report = await Services.getReportById(req.params.id)
    return res.status(200).json({ message: 'Relatório:', report })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function update(req, res) {
  try {
    const report = await Services.updateReport(req.params.id, req.body)

    return res
      .status(200)
      .json({ message: 'Relatório atualizado com sucesso', report })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function remove(req, res) {
  try {
    await Services.removeReport(req.params.id)
    return res.status(200).json({ message: 'Relatório deletado com sucesso' })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function generatePdf(req, res) {
  try {
    const pdf = await Services.getReportPDF(req.params.id)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=relatorio-${req.params.id}.pdf`,
    )
    res.send(pdf)
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}
