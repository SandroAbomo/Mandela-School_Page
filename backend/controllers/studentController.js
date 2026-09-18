import Student from '../models/Student.js';

const PAGE_SIZE = 12;

export async function listStudents(req, res) {
  try {
    const { search = '', yearGroup = '', status = '', page = 1 } = req.query;
    const filter = {};

    if (yearGroup) filter.yearGroup = yearGroup;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { firstName:     { $regex: search, $options: 'i' } },
        { lastName:      { $regex: search, $options: 'i' } },
        { guardianName:  { $regex: search, $options: 'i' } },
        { guardianEmail: { $regex: search, $options: 'i' } },
      ];
    }

    const [students, total] = await Promise.all([
      Student.find(filter)
        .sort({ lastName: 1, firstName: 1 })
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE),
      Student.countDocuments(filter),
    ]);

    res.json({ students, total, totalPages: Math.ceil(total / PAGE_SIZE) || 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getStudent(req, res) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createStudent(req, res) {
  try {
    res.status(201).json(await Student.create(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateStudent(req, res) {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) return res.status(404).json({ error: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteStudent(req, res) {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
