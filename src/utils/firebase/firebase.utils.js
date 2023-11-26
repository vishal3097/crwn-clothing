import { initializeApp} from 'firebase/app';
import { getAuth, 
signInWithRedirect, 
signInWithPopup,
GoogleAuthProvider,
createUserWithEmailAndPassword} from 'firebase/auth';
import {
 getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDJKPsoBhVGEIBjUeN3IETBPXE27ZZUkfU",
    authDomain: "crwn-clothing-db-ba150.firebaseapp.com",
    projectId: "crwn-clothing-db-ba150",
    storageBucket: "crwn-clothing-db-ba150.appspot.com",
    messagingSenderId: "364604649760",
    appId: "1:364604649760:web:013c8b865e7cf850762745"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const googleprovider = new GoogleAuthProvider();
  
  googleprovider.setCustomParameters({
        prompt: "select_account"
    });
  
    export const auth = getAuth();
    export const signInWithGooglePopup = () => 
    signInWithPopup(auth, googleprovider);
    export const signInWithGoogleRedirect = () =>
     signInWithRedirect(auth, googleprovider);

    export const db = getFirestore();

    export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
        if(!userAuth) return;
     const userDocRef = doc(db,'users', userAuth.uid);

     console.log(userDocRef);

     const userSnapshot = await getDoc(userDocRef);
     console.log(userSnapshot);
     console.log(userSnapshot.exists());

     if(!userSnapshot.exists()){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try{
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
        });
        } catch(error){
               console.log('error creating the user', error.message);
            }
        }

    return userDocRef;
    };

    export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
    };