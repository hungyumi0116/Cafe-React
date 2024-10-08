import React, { useState, useEffect } from 'react'
import styles from '@/styles/SiginForm.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [birthday, setBirthday] = useState('')
  const [mobile, setMobile] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
      member_name: name,
      email,
      password,
      address,
      birthday,
      mobile,
    }

    try {
      const response = await fetch('/api/members/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      if (!response.ok) {
        throw new Error('新增會員失敗')
      }

      alert('註冊成功！請重新登入')
      router.push('/member/login')
    } catch (error) {
      console.error('Error adding member:', error)
      alert('註冊失敗，請稍後重試')
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="name" className={styles.label}>
            姓名
          </label>
          <input
            type="text"
            id="name"
            placeholder="姓名"
            className={styles.inputField}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email" className={styles.label}>
            帳號 (E-mail)
          </label>
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className={styles.label}>
            密碼
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="address" className={styles.label}>
            地址
          </label>
          <input
            type="text"
            id="address"
            placeholder="地址"
            className={styles.inputField}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label htmlFor="birthday" className={styles.label}>
            生日
          </label>
          <input
            type="date"
            id="birthday"
            className={styles.inputField}
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />

          <label htmlFor="mobile" className={styles.label}>
            手機號碼
          </label>
          <input
            type="text"
            id="mobile"
            placeholder="手機號碼"
            className={styles.inputField}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <button type="submit" className={styles.submitButton}>
            註冊
          </button>
        </form>
      </div>
      <div className={styles.imageSection}>
        <img src="/member1.jpg" alt="Coffee Shop" className={styles.image} />
      </div>
    </main>
  )
}
