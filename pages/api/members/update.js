import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const updatedMember = req.body

    const membersFilePath = path.join(process.cwd(), 'public', 'member.json')

    // 讀取當前的 JSON 文件
    fs.readFile(membersFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading member file:', err)
        return res.status(500).send({ message: '讀取檔案失敗' })
      }

      let members = JSON.parse(data)
      const memberIndex = members.findIndex(
        (member) => member._id === updatedMember._id
      )

      if (memberIndex === -1) {
        return res.status(404).send({ message: '找不到該會員' })
      }

      // 更新會員資料
      members[memberIndex] = updatedMember

      // 將更新後的資料寫入 JSON 文件
      fs.writeFile(membersFilePath, JSON.stringify(members, null, 2), (err) => {
        if (err) {
          console.error('Error writing to member file:', err)
          return res.status(500).send({ message: '更新檔案失敗' })
        }

        res.status(200).send({ message: '更新成功' })
      })
    })
  } else {
    res.status(405).send({ message: '只允許 POST 請求' })
  }
}
