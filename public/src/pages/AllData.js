import React from 'react';
import Card from '../components/Card';

import {getAuth} from 'firebase/auth'
import conf from '../conf-firebase.js'

function AllData() {
  const [data, setData] = React.useState(null);


  React.useEffect(() => {
    // fetch all accounts from API
    try {
      const auth = getAuth(conf)
      const user = auth.currentUser
      user.getIdToken()
        .then(idToken => {
          const promise = async () => {
            let response = await fetch(`/transactions/${user.email}`, {
              method: 'GET',
              headers: {
                'Authorization': idToken
              }
            })
            let data = await response.json()
            return data
          }
          promise().then( data => {
            setData(data);
          })
        })
    }catch(e){
      console.error(e)
    }
  }, [])

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h2 className='text-center'>Movements</h2>
      {
        data ?
          (
            data.length > 0 ? 
            (
              <ul className='list-group'>
                {
                  data.map((user, i) => {
                    return (
                      <li 
                        className='list-group-item' 
                        key={i}
                      >
                        <p>
                          <span className='fw-bold'>Email:
                          </span>{user.email}
                        </p>
                        <p>
                          <span className='fw-bold'>type:
                          </span>{user.type}
                        </p>
                        <p>
                          <span className='fw-bold'>Final Balance:
                          </span>{user.balance}
                        </p>
                      </li>
                    )
                  })
                }
              </ul>
            ):<p>No data avaliable</p>
          ):<p className="text-center">Loading...</p>
      }
    </div>
  );
}

export default AllData;

