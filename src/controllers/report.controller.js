import {
  createReport,
  deleteReport,
  getReportById,
  getReportsByDoctor,
  getReportsByPatient,
  updateReport,
} from '../services/report.services.js'

export async function create(req, res) {
  try {
    const report = await createReport(req.body, req.user.doctorId)
    return res
      .status(201)
      .json({ message: 'Relatório criado com sucesso', report })
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function findReportsByPatient(req, res) {
  try {
    const reports = await getReportsByPatient(req.params.id)
    return res
      .status(200)
      .json({ message: 'Relatório(s) do paciente:', reports })
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function findReportsByDoctor(req, res) {
  try {
    const reports = await getReportsByDoctor(req.user.doctorId)
    return res.status(200).json({ message: 'Relatório(s) do doutor:', reports })
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function findById(req, res) {
  try {
    const report = await getReportById(req.params.id)
    return res.status(200).json({ message: 'Relatório:', report })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function update(req, res) {
  try {
    const report = await updateReport(req.params.id, req.body)

    return res
      .status(200)
      .json({ message: 'Relatório atualizado com sucesso', report })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function remove(req, res) {
  try {
    await deleteReport(req.params.id)
    return res.status(200).json({ message: 'Relatório deletado com sucesso' })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}
