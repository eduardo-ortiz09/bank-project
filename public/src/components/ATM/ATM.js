import React from 'react'
import ATMForm from './ATMForm';
import { getAuth } from 'firebase/auth';
import conf from '../../conf-firebase.js'

function ATM({atmMode, isDeposit, email, balance}) {
  const auth = getAuth(conf)
  const user = auth.currentUser

  const [isValid, setIsValid] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [totalState, setTotalState] = React.useState(balance)
  let deposit = 0;


  const checkNumber = () => {
    if(deposit <= 0) {
      setStatus('Quantity Invalid');
      return false;
    }else{
      setStatus('');
      return true;
    }
  }

  function handleChange(e) {
    deposit = Number(e.target.value);
    if(atmMode === "Cash Back" && deposit > totalState){
      setIsValid(false);
      setStatus('Quantity Invalid');
    }else{
      setIsValid(checkNumber);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if(!checkNumber()) return;

    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;

    try {
      user.getIdToken()
        .then(idToken => {
          const promise = async () => {
            let response = await fetch(`/account/update/${email}/${newTotal}/${atmMode}`, {
              method: 'PUT',
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
            setTotalState(newTotal)
            setStatus('Success')
            setTimeout(() => setStatus(''), 3000)
            e.target.txtForm.value = ""
          })
        })
    }catch(e){
      console.error(e)
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <p className="fw-bold m-1">Balance:</p>
      <p className="m-1">{totalState}</p>
      <ATMForm onChange={handleChange} isDeposit={isDeposit} isValid={isValid}></ATMForm>
      <label className="fw-bold">{status}</label>
    </form>
  );
};

export default ATM;

