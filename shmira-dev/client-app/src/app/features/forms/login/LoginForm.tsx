import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import { useStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'
import * as Yup from 'yup'
import 'react-quill/dist/quill.snow.css'
import './login.css'
import Icon from '../../../images/Icon'
import SignUpButton from '../../../images/SignUpButton'
import { GoogleLoginButton } from 'react-social-login-buttons'
import { AccountFormValues } from '../../../models/account'
import SignupForm from '../../../deprecated/SignupForm'

export default observer(function LoginForm() {
    const { userStore, accountStore, issueStore } = useStore()
    const { loginLoading } = accountStore
    const [loginError, setError] = useState('')
    const [formType, setFormType] = useState('login')
    var [emailState, setEmailState] = useState('')
    var [passwordState, setPasswordState] = useState('')

    function login() {
        var account: AccountFormValues = {
            email: emailState,
            password: passwordState,
        }
        console.log('Trying to log in:')
        console.log(account)
        accountStore
            .login(account)
            .catch((error) => setError('Invalid email or password'))
    }

    function guestLogin() {
        var account: AccountFormValues = {
            email: 'chiakitachibana@shmiratest.com',
            password: 'Pa$$w0rd',
        }
        accountStore
            .login(account)
            .catch((error) => setError('Invalid email or password'))
    }

    useEffect(() => {
        const listener = (event: any) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                event.preventDefault()
                login()
            }
        }
        document.addEventListener('keyup', listener)
        return () => {
            document.removeEventListener('keyup', listener)
        }
    }, [emailState, passwordState])

    const validationSchema = Yup.object({
        name: Yup.string().required(
            'The issue title is a required MyTextInput.'
        ),
    })

    function updateEmailState(value: string) {
        setEmailState(value)
    }

    function updatePasswordState(value: string) {
        setPasswordState(value)
    }

    if (formType === 'login') {
        return (
            <div
                className="darkreader"
                style={{ backgroundColor: 'transparent' }}
            >
                <div
                    style={{
                        width: '100%',
                        minHeight: '500px',
                        backgroundColor: 'transparent',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        padding: '15px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        position: 'relative',
                        zIndex: '1',
                    }}
                >
                    {/*<div style={{
                            paddingTop: '0px', 
                            marginTop: '20px', 
                            width: '100%', 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            justifyContent: 'center'
                        }}>
                        <Icon top={0} type='duck' size={40} />
                    </div>
                    */}
                    <h2 style={{ marginTop: '20px', color: '#FFFFFF' }}>
                        Welcome to Shmira
                    </h2>

                    <input
                        type="email"
                        name="email"
                        placeholder="example@company.com"
                        onChange={(e) => {
                            setError('')
                            updateEmailState(e.target.value)
                        }}
                        style={{
                            border: '0.5px solid',
                            marginBottom: '10px',
                            color: 'white',
                            backgroundColor: 'transparent',
                            position: 'relative',
                            width: '100%',
                            lineHeight: '1.2',
                            height: '45px',
                            display: 'block',
                            fontSize: '16px',
                            padding: '0 5px 0 5px',
                        }}
                    />
                    <br />
                    <br />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setError('')
                            updatePasswordState(e.target.value)
                        }}
                        style={{
                            border: '0.5px solid',
                            marginBottom: '10px',
                            color: 'white',
                            backgroundColor: 'transparent',
                            position: 'relative',
                            width: '100%',
                            lineHeight: '1.2',
                            height: '45px',
                            display: 'block',
                            fontSize: '16px',
                            padding: '0 5px 0 5px',
                        }}
                    />
                    <div
                        style={{
                            width: '100%',
                            marginLeft: '4px',
                            paddingLeft: '0px',
                            paddingBottom: '0px',
                        }}
                    >
                        <input
                            className="checkbox"
                            type="checkbox"
                            style={{
                                backgroundColor: 'transparent',
                                outline: 'none',
                                border: 'none',
                                marginLeft: '0px',
                                paddingLeft: '0px',
                                left: '0px',
                            }}
                        />
                        <label
                            style={{
                                color: 'white',
                                fontSize: '12px',
                                lineHeight: '2',
                                position: 'relative',
                                paddingRight: '150px',
                                bottom: '1px',
                                paddingLeft: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Stay signed in.
                        </label>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            type="submit"
                            content="Login"
                            size="tiny"
                            loading={loginLoading}
                            onClick={() => login()}
                            style={{
                                //marginTop: '10px',
                                //marginBottom: '10px',
                                //position: 'relative',
                                fontSize: '14px',
                                display: 'flex',
                                color: '#FFFFFF',
                                //clear: 'both',
                                //float: 'right',
                                //lineHeight: '1.2',
                                height: '35px',
                            }}
                        />
                    </div>

                    {loginError.length > 1 && (
                        <label style={{ color: 'red' }}>
                            Wrong email or password.
                        </label>
                    )}
                    <hr style={{ width: '100%', borderColor: 'white' }} />
                    <div
                        style={{
                            textAlign: 'center',
                            paddingTop: '0px',
                            marginTop: '0px',
                            width: '100%',
                            color: '#FFFFFF',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            onClick={() => guestLogin()}
                            iconSize="20px"
                            style={{
                                textAlign: 'center',
                                color: '#FFFFFF',
                                fontSize: '14px',
                                height: '37px',
                            }}
                        >
                            <span
                                style={{
                                    //textAlign: 'center',
                                    display: 'table',
                                    margin: 'auto',
                                }}
                            >
                                Explore as Guest
                            </span>
                        </Button>
                    </div>
                    {/*
                    <div style={{textAlign: 'center', paddingTop: '0px', marginTop: '0px', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}} >
                        <GoogleLoginButton iconSize='20px' style={{textAlign: 'center', fontSize: '12px', height: '37px'}}>
                            <span style={{display: 'table', margin:'auto'}}>Sign up with Google</span>
                        </GoogleLoginButton>
                    </div>
                    <div style={{textAlign: 'center', paddingTop: '0px', marginTop: '0px', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}} >
                        <SignUpButton onClick={() => setFormType('setup')} iconSize='20px' style={{textAlign: 'center', fontSize: '12px', height: '37px'}}>
                            <span style={{display: 'table', margin:'auto'}}>Create an account</span>
                        </SignUpButton>
                    </div>
                    
                    
                    <div style={{textAlign: 'center', paddingTop: '0px', marginTop: '0px', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}} >
                        <AppleLoginButton iconSize='20px' style={{textAlign: 'center', fontSize: '12px', height: '37px'}}>
                            <span style={{display: 'table', margin:'auto'}}>Sign up with Apple</span>
                        </AppleLoginButton>
                    </div>
                    <div style={{textAlign: 'center', paddingTop: '0px', marginTop: '0px', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}} >
                        <GithubLoginButton iconSize='20px' style={{textAlign: 'center', fontSize: '12px', height: '37px'}}>
                            <span style={{display: 'table', margin:'auto'}}>Sign up with Github</span>
                        </GithubLoginButton>
                    </div>
                    */}
                    <br />
                    <br />
                </div>
            </div>
        )
    } else return <SignupForm formType={formType} setFormType={setFormType} />
})
