import React, { useState, useEffect } from 'react'
import styles from '@/styles/LoginForm.module.css'
import Link from 'next/link'
import GoogleLogo from '@/components/icons/google-logo'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Simulated valid user data
  const validUser = {
    email: 'test@example.com',
    password: '123456',
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === validUser.email && password === validUser.password) {
      // Store email and password in localStorage
      localStorage.setItem('email', email)
      localStorage.setItem('password', password) // Avoid in production
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

  // Check login status from localStorage on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn')
    if (loggedInStatus) {
      setIsLoggedIn(true)
    } else {
      console.log('Item does not exist in localStorage')
    }
  }, []) // Empty dependency array to run only once

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

            <div className={styles.otherLogin}>
              <p className={styles.otherLoginText}>其他登入方式</p>
              <button className={styles.googleLoginButton}>
                使用Google帳號登入
              </button>
            </div>
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
