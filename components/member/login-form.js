import React, { useState, useEffect } from 'react'
import styles from '@/styles/LoginForm.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [members, setMembers] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch('/member.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => setMembers(data))
      .catch((error) => console.error('Error fetching member data:', error))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const validUser = members.find(
      (member) => member.email === email && member.password === password
    )

    if (validUser) {
      localStorage.setItem('currentUser', JSON.stringify(validUser))
      localStorage.setItem('isLoggedIn', true)
      setIsLoggedIn(true)

      // 派發事件通知Navbar更新
      window.dispatchEvent(new Event('loginStatusChanged'))

      alert('登入成功！')
      router.push('/member/member')
    } else {
      alert('帳號或密碼錯誤')
    }
  }

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn')
    if (loggedInStatus) {
      setIsLoggedIn(true)
      router.push('/member/member')
    }
  }, [])

  return (
    <main className={styles.container}>
      {!isLoggedIn ? (
        <>
          <div className={styles.imageSection}>
            <img
              src="/member2.jpg"
              alt="Coffee Shop"
              className={styles.image}
            />
          </div>
          <div className={styles.formContainer}>
            <h2 className={styles.title}>會員登入</h2>
            <p className={styles.greeting}>你好，歡迎來到&& Cafe</p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label htmlFor="email" className={styles.label}>
                帳號(E-mail)
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
              <div className={styles.rememberMe}>
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe" className={styles.rememberLabel}>
                  記住我
                </label>
              </div>
              <button type="submit" className={styles.submitButton}>
                登入
              </button>
            </form>
            <div className={styles.links}>
              <Link href="/member/sigin">註冊帳號</Link>
            </div>
          </div>
        </>
      ) : null}
    </main>
  )
}
