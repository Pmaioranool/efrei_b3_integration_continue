const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllStudents = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return await prisma.student.findMany({
    skip: parseInt(skip),
    take: parseInt(limit),
  });
};

exports.getStudentById = async (id) => {
  return await prisma.student.findUnique({
    where: { id: parseInt(id) },
  });
};

exports.createStudent = async (data) => {
  return await prisma.student.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      enrollmentDate: new Date(data.enrollmentDate),
    },
  });
};

exports.updateStudent = async (id, data) => {
  return await prisma.student.update({
    where: { id: parseInt(id) },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      enrollmentDate: data.enrollmentDate
        ? new Date(data.enrollmentDate)
        : undefined,
    },
  });
};

exports.deleteStudent = async (id) => {
  return await prisma.student.delete({
    where: { id: parseInt(id) },
  });
};
