import React from 'react'
import styles from '@/styles/LoginForm.module.css'

function SignupForm() {
  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src="/member2.jpg" alt="Coffee Shop" className={styles.image} />
      </div>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>會員登入</h2>
        <p className={styles.greeting}>你好，歡迎來到&& Cafe</p>
        <form className={styles.form}>
          <label htmlFor="email" className={styles.label}>
            帳號(E-mail)
          </label>
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            className={styles.inputField}
          />

          <label htmlFor="password" className={styles.label}>
            密碼
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className={styles.inputField}
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

        <div className={styles.links}>
          <a href="/register" className={styles.link}>
            註冊帳號
          </a>
          <a href="/forgot-password" className={styles.link}>
            忘記密碼?
          </a>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
