//// @tslint:disable
//// @ts-nocheck
///* eslint-disable */
////import sharp from "sharp";
//
////const inputPath = "public/backround.jpg";
////const outputPath = "public/backround.webp";
////
////
////async function convertToWebp(inputPath, outputPath) {
////  await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
////}
////// Verwendung
////convertToWebp("public/backround.jpg", "public/backround.webp");
////
////
////import { NextApiRequest, NextApiResponse } from 'next';
////import fs from 'fs';
////import path from 'path';
////
////export default function handler(req: NextApiRequest, res: NextApiResponse) {
////if (req.method === 'POST') {
////    const file = req.files.file;
////    const uploadPath = path.join(process.cwd(), 'uploads', file.name);
////
////    file.mv(uploadPath, (err) => {
////    if (err) {
////        console.error(err);
////        res.status(500).send('An error occurred during the file upload');
////    } else {
////        res.status(200).send('File uploaded successfully');
////    }
////    });
////} else {
////    res.status(405).send('Method not allowed');
////}
//
//import { NextApiRequest, NextApiResponse } from "next";
//import fs from "fs";
//import path from "path";
//import formidable from "formidable";
//
//export const config = {
//  api: {
//    bodyParser: false,
//  },
//};
//
//export default function handler(req: NextApiRequest, res: NextApiResponse) {
//  if (req.method === "POST") {
//    const form = new formidable.IncomingForm();
//    form.uploadDir = "./"; // Or whatever directory you want to save to
//    form.keepExtensions = true;
//    form.parse(req, (err, fields, files) => {
//      if (err) {
//        res
//          .status(500)
//          .json({ error: "An error occurred during the file upload" });
//        return;
//      }
//      const oldPath = files.file.path;
//      const newPath = path.join(process.cwd(), "uploads", files.file.name);
//
//      fs.rename(oldPath, newPath, function (err) {
//        if (err) throw err;
//        res.status(200).json({ message: "File uploaded successfully" });
//      });
//    });
//  } else {
//    res.status(405).json({ error: "Method not allowed" });
//  }
//}
