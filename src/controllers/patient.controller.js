import * as Services from '../services/patient.services.js'

export async function create(req, res) {
  try {
    const patient = await Services.createPatient(req.body, req.user.doctorId)
    res.status(201).json({ message: 'Paciente criado com sucesso', patient })
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function findAll(req, res) {
  try {
    const patients = await Services.getAllPatients(req.user.doctorId)
    return res.status(200).json({ Pacientes: patients })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function findById(req, res) {
  try {
    const patient = await Services.getPatientById(req.params.id)
    return res.status(200).json({ Paciente: patient })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function update(req, res) {
  try {
    const updatedPatient = await Services.updatePatient(req.params.id, {
      ...req.body,
      doctorId: req.user.doctorId,
    })

    return res
      .status(200)
      .json({ message: 'Paciente atualizado com sucesso', updatedPatient })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function remove(req, res) {
  try {
    await Services.removePatient(req.params.id)
    return res
      .status(200)
      .json({ message: 'Paciente e relatórios deletado com sucesso' })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}
