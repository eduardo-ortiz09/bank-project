import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import conf from '../conf-firebase';

function ButtonLoginGoogle() {
  const auth = getAuth(conf)
  const provider = new GoogleAuthProvider();
  function LoginWithGoogle() {
    signInWithPopup(auth, provider)
      .then( result => {
        const user = result.user
        console.log(user)
        const url = `/account/create/${user.displayName}/${user.email}/secret123`;
        (async () => {
          let res = await fetch(url, { method: 'POST' });
          let data = await res.json()
        })()
          .then(() => window.location.href = '/')
          .catch((e) => console.error(e));

      })
  }

  return (
    <button
      onClick={LoginWithGoogle}
      className="btn btn-info m-3"
    >Login With Google</button>
  )
}

export default ButtonLoginGoogle
