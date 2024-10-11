// import fs from 'fs'
// import path from 'path'
// import formidable from 'formidable'

// // API 處理器來上傳會員圖片並更新 JSON
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     const form = new formidable.IncomingForm()
//     const membersFilePath = path.join(process.cwd(), 'public', 'member.json')

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         console.error('Error parsing the form:', err)
//         res.status(500).json({ message: '上傳失敗' })
//         return
//       }

//       // 獲取上傳的圖片文件
//       const photo = files.file
//       const photoPath = `/uploads/${photo.newFilename}`

//       // 將圖片存儲到 public/uploads 文件夾
//       const savePath = path.join(
//         process.cwd(),
//         'public',
//         'uploads',
//         photo.newFilename
//       )
//       fs.rename(photo.filepath, savePath, async (renameErr) => {
//         if (renameErr) {
//           console.error('Error saving the file:', renameErr)
//           res.status(500).json({ message: '儲存圖片失敗' })
//           return
//         }

//         try {
//           // 讀取 JSON 文件以更新會員資料
//           const data = await fs.promises.readFile(membersFilePath, 'utf8')
//           const members = JSON.parse(data)
//           const memberIndex = members.findIndex(
//             (member) => member.member_id === fields.member_id
//           )

//           if (memberIndex !== -1) {
//             members[memberIndex].member_photo = photoPath

//             // 寫入更新後的會員資料
//             await fs.promises.writeFile(
//               membersFilePath,
//               JSON.stringify(members, null, 2)
//             )
//             res
//               .status(200)
//               .json({ message: '圖片上傳成功', filePath: photoPath })
//           } else {
//             res.status(404).json({ message: '會員資料未找到' })
//           }
//         } catch (readWriteErr) {
//           console.error('Error updating member data:', readWriteErr)
//           res.status(500).json({ message: '更新失敗' })
//         }
//       })
//     })
//   } else {
//     res.status(405).json({ message: '只允許 POST 請求' })
//   }
// }
