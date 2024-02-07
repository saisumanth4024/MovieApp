import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const LoginRoute = props => {
  const [userName, setUserName] = useState('')
  const [passWord, setPassword] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeUsername = event => {
    setUserName(event.target.value)
    setShowErrorMsg(false)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
    setShowErrorMsg(false)
  }

  const onSubmitSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  const onSubmitFailure = errorMsgs => {
    setErrorMsg(errorMsgs)
    setShowErrorMsg(true)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userData = {username: userName, password: passWord}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const renderUsername = () => (
    <>
      <label className="label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="input-field"
        onChange={onChangeUsername}
        value={userName}
        placeholder="Username"
      />
    </>
  )

  const renderPassword = () => (
    <>
      <label className="label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="input-field"
        onChange={onChangePassword}
        value={passWord}
        placeholder="Password"
        required
      />
    </>
  )

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-form-bg-container">
      <div className="website-logo-image-container">
        <img
          src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1669787785/Movies%20App/Movies_Logo_nu3gsl.png"
          alt="login website logo"
          className="website-logo"
        />
      </div>
      <form className="login-form-container" onSubmit={submitForm}>
        <h1 className="login-title">Login</h1>
        {renderUsername()}
        {renderPassword()}
        {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
        <button type="submit" className="login-btn">
          Login
        </button>
        <button type="submit" className="sign-in-btn">
          Sign in
        </button>
      </form>
    </div>
  )
}

export default LoginRoute
