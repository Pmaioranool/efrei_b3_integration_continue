const studentService = require("../services/students.service");

exports.getAllStudents = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const students = await studentService.getAllStudents(page, limit);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentService.getStudentById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const newStudent = await studentService.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if student exists
    const existingStudent = await studentService.getStudentById(id);
    if (!existingStudent)
      return res.status(404).json({ message: "Student not found" });

    const updatedStudent = await studentService.updateStudent(id, req.body);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if student exists
    const existingStudent = await studentService.getStudentById(id);
    if (!existingStudent)
      return res.status(404).json({ message: "Student not found" });

    await studentService.deleteStudent(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
