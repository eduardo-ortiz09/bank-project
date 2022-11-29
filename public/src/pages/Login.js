import Card from '../components/Card';
import React from 'react';
import ButtonLoginGoogle from '../components/ButtonLoginGoogle';
import { 
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth";
import conf from '../conf-firebase.js'

function Login() {
  const [email, setEmail] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState('');
  const auth = getAuth(conf)

  React.useEffect(() => {
    const auth = getAuth(conf)
    onAuthStateChanged(auth, user => {
      if(user){
        setShow(true);
      } else {
        setShow(false);
      }
    })
  }, []);

  function validate(field, label) {
    if (!field) {
      setStatus('Error ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleCheck() {
    console.log(email, password);
    if (!validate(email, 'email')) return;
    if (!validate(password, 'passsword')) return;
    signInWithEmailAndPassword(auth, email, password)
      .then()
      .catch((error) => {
        setStatus(error.code)
      });
  }


  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <Card
        bgcolor="primary"
        header="Login"
        status={status}
        body={
          !show ? 
            (
              <>
                Email:<br/>
                <input 
                  type="email"
                  className="form-control"
                  id="email" 
                  placeholder="Enter Email"
                  value={email}
                  onChange={ e => setEmail(e.currentTarget.value) }
                /><br/>
                Password:<br/>
                <input 
                  type="password"
                  className="form-control"
                  id="password" 
                  placeholder="Enter Password"
                  value={password}
                  onChange={ e => setPassword(e.currentTarget.value) }
                /><br/>
                <button
                  type="submit"
                  className="btn btn-light m-1"
                  onClick={handleCheck}
                >Login</button>
                <ButtonLoginGoogle/>
              </>
            ):(
              <>
                <h5>Session Started</h5>
                <button
                  type="submit"
                  className="btn btn-light m-1"
                  onClick={() => auth.signOut()}
                >Sign Out</button>
              </>
            )
        }
      />
    </div>
  );
}

export default Login;
