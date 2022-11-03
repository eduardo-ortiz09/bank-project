import React from 'react';
import Card from '../components/Card';

import {getAuth} from 'firebase/auth'
import conf from '../conf-firebase.js'

function AllData() {
  const [data, setData] = React.useState([{
    name:"",
    email:"",
    balance:""
  }]);


  React.useEffect(() => {
    // fetch all accounts from API
    try {

      const auth = getAuth(conf)

      auth.currentUser.getIdToken()
        .then(idToken => {
          console.log('idToken: ', idToken)
          const promise = async () => {
            let response = await fetch('/account/all', {
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
            setData(data);
          })
        })
    }catch(e){
      console.error(e)
    }
  }, [])

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      {
        data.map((user, i) => {
          let info = `Email: ${user.email}              
                      Balance: ${user.balance}`;
          let data = `User ${i}`;
          return (
            <Card
              txtcolor="black"
              header={data}
              title={user.name}
              text={info}
              key={i}
            />
          )
        })
      }
    </div>
  );
}

export default AllData;

