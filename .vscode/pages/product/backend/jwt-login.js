import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/router';
import { useState } from 'react';
//import AuthContext from '@/contexts/auth-context';

export default function JwtLogin() {
  const router = useRouter();
  const { auth, login } = useAuth();
  const [myForm, setMyForm] = useState({
    account: '',
    password: '',
  });

  const onChange = (e) => {
    const newForm = { ...myForm, [e.target.name]: e.target.value };
    console.log(newForm);
    setMyForm(newForm);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { account, password } = myForm;
    const result = await login(account, password);
    if (result) {
      router.push('/');
    } else {
      alert('帳號或密碼錯誤');
    }
  };

  return (
    <div title="JWT 的登入">
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">JWT 的登入</h5>

              <form name="form1" onSubmit={onSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="account" className="form-label">
                    帳號
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="account"
                    id="account"
                    value={myForm.account}
                    onChange={onChange}
                  />
                  <div className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    密碼
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    value={myForm.password}
                    onChange={onChange}
                  />
                  <div className="form-text"></div>
                </div>

                <button type="submit" className="btn btn-primary">
                  登入
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <pre>{JSON.stringify(auth, null, 4)}</pre>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => {
              login('test@gmail.com', '123456');
            }}
          >
            登入 管理員
          </button>
          &nbsp;&nbsp;&nbsp;
        </div>
      </div>
    </div>
  );
}
