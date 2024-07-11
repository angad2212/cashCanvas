import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton
} from "@clerk/clerk-react"
//modal used for not redirecting the page
import {Navigate} from 'react-router-dom'

export const Auth = () =>{
    return <div className="sign-in-container">
        <SignedOut>
            <SignUpButton mode="modal"/> 
            <SignInButton mode="modal"/>
        </SignedOut>
        <SignedIn>
            <Navigate to={'/'}/>
        </SignedIn>
    </div>
}