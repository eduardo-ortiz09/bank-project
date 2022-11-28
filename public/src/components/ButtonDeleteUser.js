import { getAuth, deleteUser } from "firebase/auth";

function ButtonDeleteUser(){
  const auth = getAuth();
  const user = auth.currentUser;

  async function deleteUserMongo() { 
    user.getIdToken()
      .then(idToken => {
        (async () => {
          const req = await fetch(`/account/delete/${user.email}`, {
            method: 'DELETE',
            headers: { 'Authorization': idToken }
          })
          console.log(req)
        })()
          .then(() => {
            deleteUser(user).then(() => {
              auth.signOut()
              window.location.href = '/'
            }).catch((error) => {
              console.error(error)
              if (error.message === 'Firebase: Error (auth/requires-recent-login)') {
                auth.signOut()
                alert('Please logn again')
              }
            });
          })
      })
  }


  return (
    <button
      className="btn btn-danger"
      onClick={deleteUserMongo}
    >
      Delete User
    </button>
  )

}
export default ButtonDeleteUser

