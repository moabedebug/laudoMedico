import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from '../services/patient.services.js'

export async function create(req, res) {
  try {
    const patient = await createPatient(req.body, req.user.doctorId)
    res.status(201).json({ message: 'Paciente criado com sucesso', patient })
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function findAll(req, res) {
  try {
    const patients = await getAllPatients(req.user.doctorId)
    return res.status(200).json({ Paciente: patients })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function findById(req, res) {
  try {
    const patient = await getPatientById(req.params.id)
    return res.status(200).json(patient)
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function update(req, res) {
  try {
    const updated = await updatePatient(req.params.id, {
      ...req.body,
      doctorId: req.user.doctorId,
    })

    return res
      .status(200)
      .json({ message: 'Paciente atualizado com sucesso', updated })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

export async function deleted(req, res) {
  try {
    await deletePatient(req.params.id)
    return res.status(200).json({ message: 'Paciente deletado com sucesso' })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}
