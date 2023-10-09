import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import { useStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'
import 'react-quill/dist/quill.snow.css'
import '../Login/login.css'
import { InvisibleTextInput, StyledInput } from '../../../shared/form/Styles'
import PhotoWidgetDropZone from './PhotoWidgetDropZone'
import PhotoWidgetCropper from './PhotoWidgetCropper'
import { Project } from '../../../models/project';
import { Account } from '../../../models/account';
import { 
    OuterEditProfilePictureContainer, 
    InnerEditProfilePictureContainer,
    UploadProfileImageContainer,
    CropAndResizeProfileImageContainer,
    PreviewUploadedProfileImageContainer,
    ProfilePhotoUploadDropZone,
    ProfilePhotoCropAndResizeZone,
    ProfilePhotoPreviewZone,
    ConfirmSetNewProfileButtonContainer,
    ChangePasswordHeading,
    ChangePasswordContainer,
    TextInputHeading,
    EnterPasswordInput,
    SubmitChangePasswordButton,
    EditProfileOuterContainer,
    EditProfileAvatarAndNameDisplay,
    EditProfileViewAvatar,
    OuterProfileNameAndEmailDisplay,
    InnerProfileNameAndEmailDisplay,
    DisplayProfileNameHeading,
    EditProfilePencilIcon,
    EmailAddressPTag,
    EditProfileATag,
    OuterFirstNameInputContainer,
    OuterSurnameInputContainer,
    OuterEmailInputContainer,
    InvisibleEditPersonalDetailsTextInput,
    InvisibleEditPersonalDetailsTextInputPTag,
    EditPersonalDetailsTextInput,
    EditProfilePictureButton,
    EditProfilePictureHeading
 } from './Styles'

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

    function findPhotoUrl(selectedProject: Project) {
        return selectedProject!.assignees.find((assignee: any) => assignee.id_app_user === commonStore.account_id)!.photo ? 
        issueStore.selectedProject!.assignees.find((assignee: any) => assignee.id_app_user === commonStore.account_id)!.photo.url : ''
    }   

    function findProfileFullName(allAccounts: Account[]) {
        return accountStore.allAccounts
            .find((account) => account.id === commonStore.account_id)!.first_name
            .concat(' ', accountStore.allAccounts.find((account) => account.id === commonStore.account_id)!.second_name
        )
    }

    return (
        <div >
            <div style={{cursor: 'pointer'}} onMouseEnter={() => toggleProfileDetailsHoverState()} onMouseLeave={() => toggleProfileDetailsHoverState()}>
                <EditProfileOuterContainer onClick={() => toggleEditPersonalDetailsState(true)}>
                    <EditProfileAvatarAndNameDisplay>
                        <EditProfileViewAvatar  size="70" round="30px"
                            src={findPhotoUrl(issueStore.selectedProject!)}
                            name={findProfileFullName(accountStore.allAccounts)}
                        />
                    </EditProfileAvatarAndNameDisplay>

                    {/* Profile Name and Email Div */}
                    <OuterProfileNameAndEmailDisplay >

                        {/* Name and Surname */}
                        <InnerProfileNameAndEmailDisplay >
                            <DisplayProfileNameHeading>{findProfileFullName(accountStore.allAccounts)}</DisplayProfileNameHeading>
                            {profile_details_hover_state && (<EditProfilePencilIcon top="0" size="11" code="\1F58B" />)}
                        </InnerProfileNameAndEmailDisplay>

                        {/* Email Address & Edit Profile */}
                        <EmailAddressPTag>{accountStore.account!.email}</EmailAddressPTag>
                        <EditProfileATag>Edit Profile</EditProfileATag> 

                    </OuterProfileNameAndEmailDisplay>
                </EditProfileOuterContainer>    

                { edit_personal_details_state && (  
                <div style={{marginLeft: '30px', marginRight: '30px'}}>  
                    <div style={{display: 'inline'}}>                 
                        {/* Enter name and surname text inputs */}
                        <OuterFirstNameInputContainer>
                            <TextInputHeading>First Name</TextInputHeading>
                            {!first_name_edit_state && (
                                <InvisibleEditPersonalDetailsTextInput fontsize={12} onClick={() => toggleFirstNameEditState()}>
                                    <InvisibleEditPersonalDetailsTextInputPTag>
                                        {accountStore.account!.first_name}
                                    </InvisibleEditPersonalDetailsTextInputPTag>
                                </InvisibleEditPersonalDetailsTextInput>
                            )}
                            {first_name_edit_state && (
                                <EditPersonalDetailsTextInput autoFocus type="text" name="first_name" onChange={(e) => { setError('')}} onBlur={() => toggleFirstNameEditState()} />
                            )}
                        </OuterFirstNameInputContainer>
                        <OuterSurnameInputContainer >
                            <TextInputHeading>Surname</TextInputHeading>
                            {!second_name_edit_state && (
                                <InvisibleEditPersonalDetailsTextInput fontsize={14} onClick={() => toggleSecondNameEditState()}>
                                    <InvisibleEditPersonalDetailsTextInputPTag>
                                        {accountStore.account!.second_name}
                                    </InvisibleEditPersonalDetailsTextInputPTag>
                                </InvisibleEditPersonalDetailsTextInput>
                            )}
                            {second_name_edit_state && (
                                <EditPersonalDetailsTextInput autoFocus type="text" name="second_name" onChange={(e) => {setError('')}} onBlur={() => toggleSecondNameEditState()} />
                            )}
                        </OuterSurnameInputContainer>
                        <br />
                        <OuterEmailInputContainer>
                            <TextInputHeading>Email</TextInputHeading>
                            {!emailEditState && (
                                <InvisibleEditPersonalDetailsTextInput fontsize={14} onClick={() => toggleEmailEditState()}>
                                    <InvisibleEditPersonalDetailsTextInputPTag>
                                        {accountStore.account!.email}
                                    </InvisibleEditPersonalDetailsTextInputPTag>
                                </InvisibleEditPersonalDetailsTextInput>
                            )}
                            {emailEditState && (
                                <EditPersonalDetailsTextInput autoFocus type="text" name="email" onChange={(e) => {setError('')}} onBlur={() => toggleEmailEditState()}/>
                            )}
                        </OuterEmailInputContainer>
                        
                    </div>
                    <br/>
                    <div style={{display: 'inline'}}>
                        <EditProfilePictureButton onClick={() => togglePictureEditState()} >
                                <EditProfilePictureHeading >
                                    <a>Edit Profile Picture</a>
                                </EditProfilePictureHeading>
                        </EditProfilePictureButton>
                    </div>
                 <br />
                {/* Profile Image Heading */}
                {profile_picture_edit_state && (

                <>
                <OuterEditProfilePictureContainer>
                    {/* Upload, crop/resize and preview squares */}
                    <InnerEditProfilePictureContainer>

                        {/* Upload profile photo heading */}
                        <UploadProfileImageContainer>
                            <h4>Upload</h4>
                        </UploadProfileImageContainer>

                        {/* Crop and resize profile photo heading */}
                        <CropAndResizeProfileImageContainer>
                            <h4>Crop & Resize</h4>
                        </CropAndResizeProfileImageContainer>

                        {/* Preview profile photo heading */}
                        <PreviewUploadedProfileImageContainer>
                            <h4>Preview</h4>
                        </PreviewUploadedProfileImageContainer>

                        {/* Drop zone (import photo) */}
                        <ProfilePhotoUploadDropZone>
                            <PhotoWidgetDropZone setFiles={setFiles} />
                        </ProfilePhotoUploadDropZone>

                        {/* Crop and resize photo */}
                        <ProfilePhotoCropAndResizeZone>
                            {files && files.length > 0 && (
                                <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview}/>
                            )}
                        </ProfilePhotoCropAndResizeZone>

                        {/* Preview photo */}
                        <ProfilePhotoPreviewZone className="img-preview" />

                    </InnerEditProfilePictureContainer>
                </OuterEditProfilePictureContainer>

                {/* Upload button */}
                <ConfirmSetNewProfileButtonContainer>
                    {files && files.length > 0 && (
                        <>
                            <Button disabled={uploading} floated="right" onClick={() => {setFiles([]); togglePictureEditState()}} icon="close"/>
                            <Button loading={uploading} floated="right" color="blue" onClick={() => {onCrop; togglePictureEditState()}} icon="check"/>
                        </>
                    )}
                </ConfirmSetNewProfileButtonContainer>
                </>
                )}
                <ChangePasswordHeading onClick={() => toggleChangePasswordEditState()}>
                    <TextInputHeading>
                        <a>Change Password</a>
                    </TextInputHeading>
                </ChangePasswordHeading>

                {change_password_edit_state && (

                    <ChangePasswordContainer>

                        <TextInputHeading>Old Password</TextInputHeading>
                        <EnterPasswordInput type="password" autoFocus name="oldpassword" onChange={(e) => {setError('')}}/>
                        
                        <TextInputHeading>New Password</TextInputHeading>
                        <EnterPasswordInput type="password" autoFocus name="newpassword" onChange={(e) => {setError('')}}/>
                        
                        <TextInputHeading>New Password Again</TextInputHeading>
                        <EnterPasswordInput type="password" autoFocus name="newpasswordagain" onChange={(e) => {setError('')}}/>
                    
                    </ChangePasswordContainer>
                )}
                <br/>
                <SubmitChangePasswordButton size="mini" content="Save" color="blue" onClick={() => {toggleEditPersonalDetailsState(false);}}/>
            </div>
            )}
        </div>
    </div>    
    )
})
