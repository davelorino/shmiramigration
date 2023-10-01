import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite'
import 'react-quill/dist/quill.snow.css'
import './login/login.css'
import { InvisibleTextInput, StyledInput } from '../../shared/form/Styles'
import PhotoWidgetDropZone from './PhotoWidgetDropZone'
import PhotoWidgetCropper from './PhotoWidgetCropper'
import Avatar from 'react-avatar'
import BetterIcon from '../../images/BetterIcon'

export default observer(function ProfileEditForm() {
    const [files, setFiles] = useState<any>([])
    const [cropper, setCropper] = useState<Cropper>()
    const { accountStore, issueStore, commonStore } = useStore()
    const { uploadPhoto, uploading } = accountStore
    const [loginError, setError] = useState('')
    var [emailEditState, setEmailEditState] = useState(false)
    var [first_name_edit_state, setFirstNameEditState] = useState(false)
    var [second_name_edit_state, setSecondNameEditState] = useState(false)
    var [profile_picture_edit_state, setProfilePictureEditState] = useState(false)
    var [change_password_edit_state, setChangePasswordEditState] = useState(false)
    var [edit_personal_details_state, setEditPersonalDetailsState] = useState(false)
    var [profile_details_hover_state, setProfileDetailsHoverState] = useState(false)

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!))
        }
    }

    function toggleEditPersonalDetailsState(toggle: boolean) {
        setEditPersonalDetailsState(toggle)
    }

    function toggleChangePasswordEditState() {
        setChangePasswordEditState(!change_password_edit_state)
    }

    function togglePictureEditState() {
        setProfilePictureEditState(!profile_picture_edit_state)
    }

    function toggleProfileDetailsHoverState() {
        setProfileDetailsHoverState(!profile_details_hover_state)
    }

    function toggleEmailEditState() {
        setEmailEditState(!emailEditState)
    }

    function toggleFirstNameEditState() {
        setFirstNameEditState(!first_name_edit_state)
    }

    function toggleSecondNameEditState() {
        setSecondNameEditState(!second_name_edit_state)
    }

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file)
    }

    return (
        <div className="darkreader" style={{ width: '100%', backgroundColor: 'transparent' }}>
            <div style={{cursor: 'pointer'}} onMouseEnter={() => toggleProfileDetailsHoverState()} onMouseLeave={() => toggleProfileDetailsHoverState()}>
                <div onClick={() => toggleEditPersonalDetailsState(true)} style={{width: '100%', backgroundColor: 'transparent', display: 'flex', flexWrap: 'wrap', padding: '15px', backgroundRepeat: 'no-repeat',backgroundPosition: 'center',backgroundSize: 'cover',position: 'relative',zIndex: '1'}}>
                    <div style={{marginRight:'30px', width: '5%', display: 'inline-block'}}> 
                        <Avatar style={{marginTop: '7px',marginRight: '0px',marginBottom: '10px',cursor: 'pointer'}} size="70" round="30px"
                            src={issueStore.selectedProject!.assignees.find(
                                    (assignee: any) => assignee.id_app_user === commonStore.account_id
                                )!.photo ? issueStore.selectedProject!.assignees.find(
                                        (assignee: any) => assignee.id_app_user === commonStore.account_id)!.photo.url : ''}
                            name={accountStore.allAccounts.find(
                                    (account) => account.id === commonStore.account_id
                                )!.first_name.concat(' ', accountStore.allAccounts.find((account) => account.id === commonStore.account_id)!.second_name
                                )}
                        />
                    </div>

                    {/* Profile Name and Email Div */}
                    <div style={{display: 'inline-block', width: '75%', paddingTop: '15px', marginBottom: '10px' }}>
                        {/* Name and Surname */}
                        <div style={{display: 'inline-block'}}>
                            <h4 style={{display: 'inline', marginTop: '0px', marginBottom: '0px', marginLeft: '0px' }}>{accountStore.account!.first_name.concat(' ').concat(accountStore.account!.second_name)}</h4>
                            {profile_details_hover_state && (
                                <BetterIcon style={{display: 'inline',bottom: '0px',marginLeft: '5px',verticalAlign: 'middle',marginBottom: '0px'}} top="0" size="11" code="\1F58B" /* Pencil Icon *//>
                            )}
                        </div>
                        {/* Email Address */}
                        <div >
                            <p  style={{color: 'grey', paddingTop: '0px', paddingBottom: '0px', marginBottom: '0px', marginTop:'0px'}}>{accountStore.account!.email}</p>
                            <a style={{marginTop: '0px', paddingTop: '0px', fontSize: '10px'}}>Edit Profile</a>
                        </div>
                        
                    </div>
                </div>    
                { edit_personal_details_state && (  
                <div style={{marginLeft: '30px', marginRight: '30px'}}>  
                    <div style={{display: 'inline'}}>                 
                        {/* Enter name and surname text inputs */}
                        <div style={{ marginTop: '5px',display: 'inline-block',width: '30%',marginBottom: '10px',marginRight: '5px'}}>
                            <h5 style={{marginLeft: '5px', marginBottom: '5px'}}>First Name</h5>
                            {!first_name_edit_state && (
                                <InvisibleTextInput style={{border: '1px solid white',display: 'flex',maxHeight: '40px',minHeight: '30px',marginTop: '0px'}} fontsize={12} onClick={() => toggleFirstNameEditState()}><p style={{color: 'grey', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '10px'}}> {accountStore.account!.first_name}</p></InvisibleTextInput>
                            )}
                            {first_name_edit_state && (
                                <input autoFocus type="text" name="first_name" onChange={(e) => { setError('')}} onBlur={() => toggleFirstNameEditState()} style={{border: '0.5px solid',marginBottom: '10px',color: 'white',backgroundColor: 'transparent',position: 'relative',width: '100%',lineHeight: '1.2',height: '30px',display: 'block',fontSize: '16px',padding: '0 5px 0 5px'}}/>
                            )}
                        </div>
                        <div style={{marginTop: '5px',display: 'inline-block',width: '30%',marginBottom: '10px'}}>
                            <h5 style={{marginBottom: '5px', marginLeft: '5px'}}>Surname</h5>
                            {!second_name_edit_state && (
                                <InvisibleTextInput style={{border: '1px solid white',display: 'flex',maxHeight: '40px',minHeight: '30px',marginTop: '0px'}} fontsize={14} onClick={() => toggleSecondNameEditState()}><p style={{color: 'grey',paddingTop: '5px', paddingBottom: '0px', paddingLeft: '10px'}}>{accountStore.account!.second_name}</p></InvisibleTextInput>
                            )}
                            {second_name_edit_state && (
                                <input autoFocus type="text" name="second_name" onChange={(e) => {setError('')}} onBlur={() => toggleSecondNameEditState()} style={{border: '0.5px solid', marginBottom: '10px', color: 'white', backgroundColor: 'transparent', position: 'relative', width: '100%', lineHeight: '1.2', height: '30px', display: 'block', fontSize: '16px', padding: '0 5px 0 5px'}}/>
                            )}
                        </div>
                        <br />
                        <div style={{marginTop: '0px',display: 'inline-block',width: '30%',marginBottom: '10px'}}>
                            <h5 style={{marginLeft: '5px', marginBottom: '5px'}}>Email</h5>
                            {!emailEditState && (
                                <InvisibleTextInput style={{border: '1px solid white',display: 'flex',maxHeight: '40px',minHeight: '30px',marginTop: '0px'}} fontsize={14} onClick={() => toggleEmailEditState()}><p style={{color: 'grey',paddingTop: '5px',paddingBottom: '0px',paddingLeft: '10px'}}>{accountStore.account!.email}</p></InvisibleTextInput>
                            )}
                            {emailEditState && (
                                <input autoFocus type="text" name="email" onChange={(e) => {setError('')}} onBlur={() => toggleEmailEditState()} style={{border: '0.5px solid',marginBottom: '10px',color: 'white',backgroundColor: 'transparent',position: 'relative',width: '100%',lineHeight: '1.2',height: '30px',display: 'block',fontSize: '16px',padding: '0 5px 0 5px'}}/>
                            )}
                        </div>
                        
                    </div>
                    <br/>
                    <div style={{display: 'inline'}}>
                        <div onClick={() => togglePictureEditState()} style={{marginTop: '0px',display: 'inline-block',width: '50%', marginLeft: '5px', marginBottom: '10px'}}>
                                <h5 style={{marginLeft: '5px', marginBottom: '0px'}}><a>Edit Profile Picture</a></h5>
                        </div>
                    </div>
                 <br />
                {/* Profile Image Heading */}
                {profile_picture_edit_state && (

                <>
                {/*<div style={{marginTop: '5px',width: '100%'}}><h5>Profile Image</h5></div>*/}
                <div style={{marginTop: '0px', paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px',width: '100%',border: "1px solid white" }}>
                    {/* Upload, crop/resize and preview squares */}
                    <div style={{display: 'flex',flexWrap: 'wrap',alignItems: 'center',justifyContent: 'center',width: '100%',height: '400px'}}>
                        {/* Upload */}
                        <div style={{width: '33%',paddingRight: '20px',display: 'flex',flexWrap: 'wrap',justifyContent: 'center'}}><h4>Upload</h4></div>
                        {/* Crop and resize */}
                        <div style={{width: '33%',paddingRight: '20px',display: 'flex',flexWrap: 'wrap',justifyContent: 'center'}}><h4>Crop & Resize</h4></div>
                        {/* Preview */}
                        <div style={{width: '34%',paddingRight: '20px',display: 'flex',flexWrap: 'wrap',justifyContent: 'center'}}><h4>Preview</h4></div>
                        {/* Drop zone (import photo) */}
                        <div style={{width: '33%',paddingRight: '20px',display: 'flex',flexWrap: 'wrap',justifyContent: 'center'}}><PhotoWidgetDropZone setFiles={setFiles} /></div>
                        {/* Crop photo */}
                        <div style={{width: '33%',paddingRight: '20px',display: 'flex',flexWrap: 'wrap',justifyContent: 'center'}}>{files && files.length > 0 && (<PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview}/>)}</div>
                        {/* Preview photo */}
                        <div className="img-preview" style={{minHeight: '300px',width: '34%',overflow: 'hidden'}}></div>
                    </div>
                </div>
                {/* Upload button */}
                <div style={{clear: 'both',width: '100%',display: 'inline-block'}}>
                    {files && files.length > 0 && (
                        <>
                            <Button disabled={uploading} floated="right" onClick={() => {setFiles([]); togglePictureEditState()}} icon="close"/>
                            <Button loading={uploading} floated="right" color="blue" onClick={() => {onCrop; togglePictureEditState()}} icon="check"/>
                        </>
                    )}
                </div>
                </>
                )}
                <div onClick={() => toggleChangePasswordEditState()} style={{marginTop: '0px',display: 'inline-block',width: '50%', marginLeft: '5px', marginBottom: '10px'}}>
                    <h5 style={{marginLeft: '5px', marginBottom: '5px'}}><a>Change Password</a></h5>
                </div>
                {change_password_edit_state && (
                    <div style={{marginLeft: '15px', width: '20%'}}>
                    <h5 style={{marginLeft: '5px', marginBottom: '5px'}}>Old Password</h5>
                    <input type="password" autoFocus name="oldpassword" onChange={(e) => {setError('')}} style={{border: '0.5px solid',marginBottom: '0px',color: 'white',backgroundColor: 'transparent',position: 'relative',width: '100%',lineHeight: '1.2',height: '25px',display: 'block',fontSize: '16px',padding: '0 5px 0 5px'}}/>
                    
                    <h5 style={{marginLeft: '5px', marginBottom: '5px'}}>New Password</h5>
                    <input type="password" autoFocus name="newpassword" onChange={(e) => {setError('')}} style={{border: '0.5px solid',marginBottom: '0px',color: 'white',backgroundColor: 'transparent',position: 'relative',width: '100%',lineHeight: '1.2',height: '25px',display: 'block',fontSize: '16px',padding: '0 5px 0 5px'}}/>
                    
                    <h5 style={{marginLeft: '5px', marginBottom: '5px'}}>New Password Again</h5>
                    <input type="password" autoFocus name="newpasswordagain" onChange={(e) => {setError('')}} style={{border: '0.5px solid',marginBottom: '0px',color: 'white',backgroundColor: 'transparent',position: 'relative',width: '100%',lineHeight: '1.2',height: '25px',display: 'block',fontSize: '16px',padding: '0 5px 0 5px'}}/>
                    
                    </div>
                )}
                <br/>
                <Button size="mini" content="Save" color="blue" style={{ marginBottom: '5px', marginLeft: '0px' }} onClick={() => {toggleEditPersonalDetailsState(false);}}/>
            </div>
            )}
        </div>
    </div>    
    )
})
