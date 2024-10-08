// // 引入必要的模組
// const express = require('express')
// const fileUpload = require('express-fileupload')
// const fs = require('fs')
// const path = require('path')

// const app = express()
// const PORT = 3001

// app.use(express.json())
// app.use(fileUpload())

// // API 路徑
// const membersFilePath = path.join(__dirname, 'data', 'members.json')

// // 圖片上傳 API
// app.post('/api/members/upload', (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('沒有上傳文件')
//   }

//   const file = req.files.file
//   const uploadPath = path.join(__dirname, 'uploads', file.name)

//   file.mv(uploadPath, (err) => {
//     if (err) {
//       return res.status(500).send(err)
//     }

//     res.json({ filePath: `/uploads/${file.name}` })
//   })
// })

// // 更新會員資料 API
// app.post('/api/members/update', (req, res) => {
//   const updatedUser = req.body

//   fs.readFile(membersFilePath, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).send('無法讀取會員資料')
//     }

//     const members = JSON.parse(data)
//     const memberIndex = members.findIndex(
//       (m) => m.member_id === updatedUser.member_id
//     )

//     if (memberIndex === -1) {
//       return res.status(404).send('找不到該會員')
//     }

//     // 更新會員資料
//     members[memberIndex] = updatedUser

//     fs.writeFile(membersFilePath, JSON.stringify(members, null, 2), (err) => {
//       if (err) {
//         return res.status(500).send('無法更新會員資料')
//       }

//       res.json({ message: '會員資料更新成功' })
//     })
//   })
// })

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`)
// })
