import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet";
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { login } from '../../_services_data/api/user_actions.js';
import validateFields from '../../_services/Validation';
import { Applogo } from '../../_services_data/imagepath.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './header';

function LoginPage() {
  const [errors, set_errors] = useState(null);
  const [email, set_email] = useState({ value: "", error: null, validateOnChange: false });
  const [password, set_password] = useState({ value: "", error: null, validateOnChange: false });
  const [loading, set_loading] = useState(false);
  const reduxData = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  async function loginClick(e) {
    e.preventDefault();
    set_loading(true);
    const emailError = validateFields.validateEmail(email.value);
    const passwordError = validateFields.validatePassword(password.value);

    if ([emailError, passwordError].every(e => e === false)) {
      try {
        const result = await login({
          userData: { email: email.value, password: password.value },
          dispatch,
          navigate,
          reduxData
        });

        if (isMountedRef.current) {
          console.log("result: ", result);
          if (!result) await set_loading(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          await set_loading(false);
          // Handle any errors here
        }
      }
    } else {
      if (isMountedRef.current) {
        set_email({ "value": email.value, "error": emailError });
        set_password({ "value": password.value, "error": passwordError });
        set_loading(false);
      }
    }
  }

  function handleChange(validationFunc, evt) {
    const field = evt.target.name;
    const fieldVal = evt.target.value;
    const processed_string = "set_" + field + "(" + JSON.stringify({ value: fieldVal, error: validationFunc(fieldVal) }) + ")";
    eval(processed_string);
  }

  return (
    <div className="page-wrapper" style={{ marginLeft: '0px' }}>
      <div className="content container-fluid">
        <Helmet>
          <title>Login - Utopia Tech PTY LTD</title>
          <meta name="description" content="Login page" />
        </Helmet>
        <Header />

        <div className="row">
          <div className="col-md-12">
            <div className="account-logo">
              <div><img src={Applogo} alt="Utopia Tech PTY LTD" /></div>
            </div>
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Login</h3>
                <p className="account-subtitle">Access to our dashboard</p>
                <form onSubmit={loginClick}>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={email.value}
                      className={classnames(
                        'form-control',
                        { 'is-valid': email.error === false },
                        { 'is-invalid': email.error }
                      )}
                      onChange={evt => handleChange(validateFields.validateEmail, evt)}
                    />
                    <div className="invalid-feedback">{email.error}</div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label>Password</label>
                      </div>
                      <div hidden className="col-auto">
                        <Link className="text-muted" to="/forgotpassword">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={password.value}
                      className={classnames(
                        'form-control',
                        { 'is-valid': password.error === false },
                        { 'is-invalid': password.error }
                      )}
                      onChange={evt => handleChange(validateFields.validatePassword, evt)}
                    />
                    <div className="invalid-feedback">{password.error}</div>
                  </div>
                  <div className="form-group text-center">
                    <button className="btn btn-primary account-btn" type="submit" disabled={loading}>
                      {loading ? "Loading..." : "Login"}
                    </button>
                  </div>
                  <h5 className="auth-error">
                    {errors && (
                      <div>
                        {errors}
                      </div>
                    )}
                  </h5>
                  <div className="account-footer">
                    <p>Don't have an account yet? <Link to="/register">Register</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
