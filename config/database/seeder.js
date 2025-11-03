import connectDB from './config/database/database.js';
import User from './models/User.js';
import Department from './models/Department.js';
import bcrypt from 'bcryptjs';

await connectDB();

const seed = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Department.deleteMany();

    // Create departments
    const departments = await Department.insertMany([
      { name: 'Engineering', description: 'Engineering department' },
      { name: 'HR', description: 'Human Resources' },
    ]);

    // Create hashed password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create users
    await User.insertMany([
      {
        firstname: 'Alice',
        lastname: 'Johnson',
        gender: 'female',
        email: 'alice@example.com',
        password: hashedPassword,
        department: departments[0]._id
      },
      {
        firstname: 'Bob',
        lastname: 'Smith',
        gender: 'male',
        email: 'bob@example.com',
        password: hashedPassword,
        department: departments[1]._id
      }
    ]);

    console.log('✅ Seeding complete');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

await seed();
