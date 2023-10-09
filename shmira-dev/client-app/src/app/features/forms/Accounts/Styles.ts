import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import Avatar from 'react-avatar';
import BetterIcon from '../../../images/BetterIcon';
import { InvisibleTextInput, StyledInput } from '../../../shared/form/Styles';

export const OuterEditProfilePictureContainer = styled.div`
    margin-top: 0px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    width: 100%;
    border: 1px solid white;
`

export const InnerEditProfilePictureContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 400px;
`

export const UploadProfileImageContainer = styled.div`
    width: 33%;
    padding-right: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

export const CropAndResizeProfileImageContainer = styled.div`
    width: 33%;
    padding-right: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

export const PreviewUploadedProfileImageContainer = styled.div`
    width: 34%;
    padding-right: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

export const ProfilePhotoUploadDropZone = styled.div`
    width: 33%;
    padding-right: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

export const ProfilePhotoCropAndResizeZone = styled.div`
    width: 33%;
    padding-right: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

export const ProfilePhotoPreviewZone = styled.div`
    min-height: 300px; 
    width: 34%;
    overflow: hidden;
`

export const ConfirmSetNewProfileButtonContainer = styled.div`
    clear: both;
    width: 100%;
    display: inline-block;
`

export const ChangePasswordHeading = styled.div`
    margin-top: 0px;
    display: inline-block;
    width: 50%;
    margin-left: 5px;
    margin-bottom: 10px;
` 

export const ChangePasswordContainer = styled.div`
    margin-left: 15px;
    width: 20%;
`

export const TextInputHeading = styled.h5`
    margin-left: 5px;
    margin-bottom: 5px;
`

export const EnterPasswordInput = styled.input`
    border: 0.5px solid;
    margin-bottom: 0px;
    color: white;
    background-color: transparent;
    position: relative;
    width: 100%;
    line-height: 1.2;
    height: 25px;
    display: block;
    font-size: 16px;
    padding: 0 5px 0 5px;
`

export const SubmitChangePasswordButton = styled(Button)`
    margin-bottom: 5px;
    margin-left: 0px;
`

export const EditProfileOuterContainer = styled.div`
    width: 100%; 
    background-color: transparent;
    display: flex;
    flex-wrap: wrap; 
    padding: 15px; 
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    zIndex: 1;
`

export const EditProfileAvatarAndNameDisplay = styled.div`
    margin-right: 30px;
    width: 5%;
    display: inline-block;
`

export const EditProfileViewAvatar = styled(Avatar)`
    margin-top: 7px;
    margin-right: 0px;
    margin-bottom: 10px;
    cursor: pointer;
`

export const OuterProfileNameAndEmailDisplay = styled.div`
    display: inline-block;
    width: 75%;
    padding-top: 15px;
    margin-bottom: 10px;
`

export const InnerProfileNameAndEmailDisplay = styled.div`
    display: inline-block;
`

export const DisplayProfileNameHeading = styled.h4`
    display: inline; 
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
`

export const EditProfilePencilIcon = styled(BetterIcon)`
    display: inline;
    bottom: 0px; 
    margin-left: 5px;
    vertical-align: middle;
    margin-bottom: 0px;
`

export const EmailAddressPTag = styled.p`
    color: grey; 
    padding-top: 0px; 
    padding-bottom: 0px; 
    margin-bottom: 0px; 
    margin-top: 0px;
`

export const EditProfileATag = styled.a`
    margin-top: 0px;
    padding-top: 0px;
    font-size: 10px;
`

export const OuterFirstNameInputContainer = styled.div`
    margin-top: 5px;
    display: inline-block;
    width: 30%;
    margin-bottom: 10px; 
    margin-right: 5px;
`

export const OuterSurnameInputContainer = styled.div`
    margin-top: 5px;
    display: inline-block;
    width: 30%;
    margin-bottom: 10px;
`

export const OuterEmailInputContainer = styled.div`
    margin-top: 0px;
    display: inline-block;
    width: 30%;
    margin-bottom: 10px;
`

export const InvisibleEditPersonalDetailsTextInput = styled(InvisibleTextInput)`
    border: 1px solid white;
    display: flex;
    max-height: 40px;
    min-height: 30px;
    margin-top: 0px;
`

export const InvisibleEditPersonalDetailsTextInputPTag = styled.p`
    color: grey;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
`

export const EditPersonalDetailsTextInput = styled.input`
    border: 0.5px solid;
    margin-bottom: 10px;
    color: white;
    background-color: transparent;
    position: relative;
    width: 100%;
    line-height: 1.2;
    height: 30px;
    display: block;
    font-size: 16px;
    padding: 0 5px 0 5px;
`

export const EditProfilePictureButton = styled.div`
    margin-top: 0px;
    display: inline-block;
    width: 50%; 
    margin-left: 5px; 
    margin-bottom: 10px;
`

export const EditProfilePictureHeading = styled.h5`
    margin-left: 5px;
    margin-botto: 0px;
`