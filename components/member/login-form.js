import React, { useState, useEffect } from 'react'
import styles from '@/styles/LoginForm.module.css'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [members, setMembers] = useState([])

  // Fetch the member data from the JSON file when the component mounts
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // 檢查從JSON文件中抓取到的members資料
    console.log('Members:', members)

    // 檢查輸入的email和password是否與JSON中的匹配
    const validUser = members.find(
      (member) => member.email === email && member.password === password
    )

    console.log('Input email:', email, 'Input password:', password)
    console.log('Valid User:', validUser)

    if (validUser) {
      // 當匹配成功時，將該會員資料存入 localStorage
      localStorage.setItem('currentUser', JSON.stringify(validUser))
      localStorage.setItem('isLoggedIn', true)
      setIsLoggedIn(true)
      alert('登入成功！')
    } else {
      alert('帳號或密碼錯誤')
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('password') // Clear password
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

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
          </div>
        </>
      ) : (
        <div className={styles.formContainer}>
          <h2>已登入</h2>
          <p>歡迎回來！</p>
          <button onClick={handleLogout} className={styles.submitButton}>
            登出
          </button>
        </div>
      )}
    </main>
  )
}
