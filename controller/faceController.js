// import Face from '../models/Face.js';
// import User from '../models/User.js';
// import Attendance from '../models/Attendance.js';
// import { bufferToFaceImage, computeEncoding } from '../utils/face.js';
// import path from 'path';
// import fs from 'fs';

// //  register a new face  
// export const registerFace = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     if (!req.file) return res.status(400).json({ error: 'Image required' });

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     // Delete old face if exists
//     await Face.deleteOne({ user: userId });

//     const faceImg = await bufferToFaceImage(req.file.buffer);
//     const encoding = await computeEncoding(faceImg);

//     const imageName = `${userId}-${Date.now()}.jpg`;
//     const imagePath = path.join('uploads', imageName);
//     fs.writeFileSync(imagePath, req.file.buffer);

//     const face = new Face({
//       user: userId,
//       faceImage: `/uploads/${imageName}`,
//       faceEncoding: encoding
//     });
//     await face.save();

//     res.json({ message: 'Face registered', faceId: face._id });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message || 'Server error' });
//   }
// };

// //  VERIFY FACE 
// export const verifyFace = async (req, res) => {
//   try {
//     const { userId, type } = req.body; // type: 'in' or 'out'
//     if (!req.file) return res.status(400).json({ error: 'Live image required' });

//     const storedFace = await Face.findOne({ user: userId });
//     if (!storedFace) return res.status(404).json({ error: 'No registered face' });

//     const liveImg = await bufferToFaceImage(req.file.buffer);
//     const liveEncoding = await computeEncoding(liveImg);

//     // Euclidean distance
//     const distance = euclideanDistance(storedFace.faceEncoding, liveEncoding);
//     const threshold = 0.55; 

//     if (distance > threshold) {
//       return res.status(401).json({ error: 'Face does not match', distance });
//     }

//     // Record Attendance 
//     const today = new Date().setHours(0, 0, 0, 0);
//     let attendance = await Attendance.findOne({
//       user: userId,
//       date: { $gte: today, $lt: new Date(today + 24 * 60 * 60 * 1000) }
//     });

//     if (!attendance) {
//       attendance = new Attendance({
//         user: userId,
//         date: new Date(),
//         status: 'present'
//       });
//     }

//     if (type === 'in') attendance.clockIn = new Date();
//     if (type === 'out') attendance.clockOut = new Date();

//     await attendance.save();

//     res.json({
//       message: 'Verified',
//       name: `${storedFace.user.firstname} ${storedFace.user.lastname}`,
//       distance: +distance.toFixed(3)
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message || 'Verification failed' });
//   }
// };

// function euclideanDistance(arr1, arr2) {
//   return Math.sqrt(
//     arr1.reduce((sum, a, i) => sum + (a - arr2[i]) ** 2, 0)
//   );
// }