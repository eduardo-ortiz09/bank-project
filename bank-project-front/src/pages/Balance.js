import React from 'react';
import Card from '../components/Card';

import { getAuth } from 'firebase/auth';
import conf from '../conf-firebase.js'

function Balance() {
  const [email, setEmail] = React.useState('');
  const [search, setSearch] = React.useState(false)
  const [status, setStatus] = React.useState('');
  const [data, setData] = React.useState([{
    name:"",
    email:"",
    balance:""
  }]);
  const auth = getAuth(conf)

  function validate(field, label) {
    if (!field) {
      setStatus('Error ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }


  function searchUser() {
    if (!validate(email, 'email')) return;
    try {
      auth.currentUser.getIdToken()
        .then(idToken => {
          console.log('idToken: ', idToken)
          const promise = async () => {
            let response = await fetch(`/account/${email}`, {
              method: 'GET',
              headers: {
                'Authorization': idToken
              }
            })
            let data = await response.json()
            console.log('response: ', data)
            return data
          }
          promise().then( data => {
            console.log(data);
            if (data.length > 0) {
              setSearch(true);
              setStatus('');
              setData(data)
            } else {
              setStatus('Can´t find user');
            }
          })
        })
    }catch(e){
      console.error(e)
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <Card
        bgcolor="warning"
        txtcolor="black"
        header="Balance"
        status={status}
        body={
          !search ? 
            (
              <>
                <h3>Please Search the user</h3>
                <input 
                  type="email"
                  className="form-control"
                  id="email" 
                  placeholder="Enter Email"
                  value={email}
                  onChange={ e => setEmail(e.currentTarget.value) }
                /><br/>
                <button
                  type="submit"
                  className="btn btn-light m-1"
                  onClick={searchUser}
                >Search</button>
              </>
            ):(
              <>
                {data.map( (user, i) => {
                  return (
                    <div key={i}>
                      <p className="fw-bold m-0">Name:</p>
                      <p className="m-0">{user.name}</p>
                      <p className="fw-bold m-0">Email:</p>
                      <p className="m-0">{user.email}</p>
                      <p className="fw-bold m-0">Balance:</p>
                      <p className="m-0">{user.balance}</p>
                    </div>
                  );
                })}
              </>
            )
        }
      />
    </div>
  );
}

export default Balance;
