import React from 'react';
import Auth from '../Components/Auth';
const AuthPage=({isAthenticated,authHandler})=>{
    return(
        <Auth
        isAthenticated={isAthenticated}authHandler={authHandler}
        />
    )
}
export default AuthPage;



