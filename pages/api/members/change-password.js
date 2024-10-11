import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { member_id, oldPassword, newPassword } = req.body

    const membersFilePath = path.join(process.cwd(), 'public', 'member.json')

    fs.promises
      .readFile(membersFilePath, 'utf8')
      .then((data) => {
        let members = JSON.parse(data)
        const memberIndex = members.findIndex(
          (member) =>
            member.member_id === member_id && member.password === oldPassword
        )

        if (memberIndex === -1) {
          throw new Error('找不到該會員或舊密碼錯誤')
        }

        // 更新會員密碼
        members[memberIndex].password = newPassword

        // 將更新後的資料寫入 JSON 文件
        return fs.promises.writeFile(
          membersFilePath,
          JSON.stringify(members, null, 2)
        )
      })
      .then(() => {
        res.status(200).send({ message: '密碼更新成功' })
      })
      .catch((err) => {
        console.error('Error handling member file:', err)
        res.status(500).send({ message: err.message || '操作失敗' })
      })
  } else {
    res.status(405).send({ message: '只允許 POST 請求' })
  }
}
