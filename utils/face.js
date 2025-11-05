// import fr from 'face-recognition';
// import sharp from 'sharp';

// const detector = fr.FaceDetector();
// const recognizer = fr.FaceRecognizer();

// // Convert buffer → JPEG → resized → face-recognition image
// export async function bufferToFaceImage(buffer) {
//   const imgBuffer = await sharp(buffer)
//     .resize(500, 500, { fit: 'inside', withoutEnlargement: true })
//     .jpeg({ quality: 90 })
//     .toBuffer();

//   return fr.loadImage(imgBuffer);
// }

// // Compute 128-D descriptor (Float32Array → plain JS array)
// export function computeEncoding(faceImage) {
//   const faces = detector.detectFaces(faceImage);
//   if (faces.length === 0) throw new Error('No face detected');
//   if (faces.length > 1) throw new Error('Multiple faces detected');

//   return recognizer.computeFaceDescriptor(faces[0]).then(arr => Array.from(arr));
// }