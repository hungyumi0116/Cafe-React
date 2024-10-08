import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const newMember = req.body

    // 獲取 JSON 文件的路徑
    const membersFilePath = path.join(process.cwd(), 'public', 'member.json')

    // 讀取當前的 JSON 文件
    fs.promises
      .readFile(membersFilePath, 'utf8')
      .then((data) => {
        let members = JSON.parse(data)
        // 新增會員資料
        newMember.member_id = members.length + 1 // 自動給一個新的 member_id
        members.push(newMember)

        // 將更新後的資料寫入 JSON 文件
        return fs.promises.writeFile(
          membersFilePath,
          JSON.stringify(members, null, 2)
        )
      })
      .then(() => {
        res.status(200).json({ message: '新增會員成功' })
      })
      .catch((err) => {
        console.error('Error handling member file:', err)
        res.status(500).json({ message: '操作失敗' })
      })
  } else {
    res.status(405).json({ message: '只允許 POST 請求' })
  }
}
