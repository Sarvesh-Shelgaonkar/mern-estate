import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate} from 'react-router-dom'
import SignIn from '../pages/SignIn'
export default function PrivateRouter() {
    const {currentUser} = useSelector((state)=>state.user)
    return currentUser ? <Outlet /> :<Navigate to='/sign-in'/>;
}
 