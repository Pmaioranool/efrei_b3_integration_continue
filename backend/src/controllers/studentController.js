const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const newStudent = await prisma.student.create({
      data: { firstName, lastName, email, phone },
    });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone } = req.body;
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: { firstName, lastName, email, phone },
    });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.student.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
