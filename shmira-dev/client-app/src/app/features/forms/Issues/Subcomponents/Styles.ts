import styled from 'styled-components'
import { Segment, Button, Label, Grid, Dropdown, TextArea } from 'semantic-ui-react'
import { InvisibleTextInput, StyledInput } from '../../../../shared/form/Styles'
import ReactQuill from 'react-quill'

export const IssueTypeContainer = styled.div`
    padding-left: 7px;
    align-content: center;
    display: inline-block;
`

export const IssueTypeDropdownSelector = styled(Dropdown)`
    color: #FFFFFF; 
    margin-top: 15px; 
    margin-bottom: 5px;
    margin-left: -20px;
`

export const InvisibleIssueDescriptionTextInput = styled(InvisibleTextInput)`
    margin-top: 4px;
    padding-top: 0px; 
    padding-bottom: 0px;
    margin-bottom: 0px;
    cursor: pointer;
    display: flex;
    max-height: 700px; 
    min-height: 200px;
`

export const DescriptionContainer = styled.div`
    padding-top: 8px;
    margin-bottom: 0px;
    margin-left: 12px;
    margin-right: 12px;
`

export const DescriptionEditor = styled(ReactQuill)`
    min-height: 200px;
    max-height: 700px;
    margin-bottom: 0px;
    padding-bottom: 0px;
`

export const DescriptionHeading = styled.h5`
    margin-left: 10px;
    margin-bottom: 0px;
    padding-bottom: 0px;
`

export const baseStyle = {
    transition: 'brightness 0.0s'
}

export const hoveredStyle = {
    filter: 'brightness(165%)',
    backgroundFilter: 'brightness(165%)'
}

export const underlineStyle = {
    textDecoration: 'underline'
}

export const CommentInputOuterContainer = styled.div`
    margin-top: 20px;
    cursor: not-allowed;
    margin-left: 10px;
    margin-bottom: 8px;
`
export const SubmitCommentContainerOnCreateIssueForm = styled.div`
    cursor: not-allowed; 
    margin-top: 10px;
    margin-right: 0px;
    float: right;
    display: inline-block;
`

export const divStyles = {
    width: '100%',
    paddingTop: '5px',
    paddingBottom: '5px',
    filter: 'brightness(130%)'
}

export const IssueStatusDropdown = styled(Dropdown)`
    position: relative;
    zIndex: 99;
    margin-left: -15px;
    padding-right: 10px;
`

export const StatusHeading = styled.h5`
    margin-bottom: 5px; 
    padding-bottom: 5px; 
    padding-left: 20px;
    padding-top: 10px;
`