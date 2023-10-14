import { observer } from 'mobx-react-lite'
import { Assignee } from '../../../../models/assignee'
import { Issue } from '../../../../models/issue'
import { Label, Dropdown } from 'semantic-ui-react'
import { IssueStatusOptions } from '../Constants/IssueStatusOptions'
import {     
    divStyles,
    hoveredStyle,
    baseStyle,
    IssueStatusDropdown,
    StatusHeading
} from './Styles'
import './Styles.css'


interface CreateIssueProps {
    mode: 'create'
    isStatusHovered: boolean
    setIsStatusHovered: any 
    selectedIssueStatus: string
    setSelectedIssueStatus: any
    projectAssignees: Assignee[]
}

interface UpdateIssueProps {
    mode: 'update'
    isStatusHovered: boolean
    setIsStatusHovered: any 
    selectedIssue: Issue
    updateIssueStatus: (
        status: string,
        selectedIssue: Issue, 
        updateIssue: (updated_issue: Issue) => Partial<void>
    ) => void
}

type IssueStatusProps = CreateIssueProps | UpdateIssueProps;

export default observer(function IssueStatus ( props: IssueStatusProps ) {
    if(props.mode === 'create'){
        return (
            <div style={{...divStyles,...baseStyle,...{position: 'relative',zIndex: '99', paddingBottom: '8px'},...(props.isStatusHovered ? hoveredStyle : {})}}
                onMouseEnter={() => props.setIsStatusHovered(true)}
                onMouseLeave={() => props.setIsStatusHovered(false)}
            >
                <StatusHeading>Status</StatusHeading>
                <hr style={{border: '1px solid white',width: '100%'}}/>
                <div style={{marginLeft: '20px'}}>
                <Label style={{marginRight: '0px'}}>{props.selectedIssueStatus}</Label>
                <IssueStatusDropdown 
                    downward 
                    multiple 
                    closeOnChange 
                    placeholder="" 
                    value="" 
                    label="Status" 
                    name="status" 
                    options={IssueStatusOptions({mode:'create', setSelectedIssueStatus: props.setSelectedIssueStatus, selectedIssueStatus: props.selectedIssueStatus})}
                    />
                </div>
            </div>
        )
    }
    if(props.mode === 'update'){
        return (
            <div style={{...divStyles,...baseStyle,...{position: 'relative',zIndex: '99', paddingBottom: '8px'},...(props.isStatusHovered ? hoveredStyle : {})}}
                onMouseEnter={() => props.setIsStatusHovered(true)}
                onMouseLeave={() => props.setIsStatusHovered(false)}
            >
                <StatusHeading>Status</StatusHeading>
                <hr style={{border: '1px solid white',width: '100%'}}/>
                <div style={{marginLeft: '20px'}}>
                <Label style={{marginRight: '0px'}}>{props.selectedIssue!.status}</Label>
                <IssueStatusDropdown 
                    downward 
                    multiple 
                    closeOnChange 
                    placeholder="" 
                    value="" 
                    label="Status" 
                    name="status" 
                    options={IssueStatusOptions({
                        mode: 'update',
                        selectedIssue: props.selectedIssue!,
                        updateIssueStatus: props.updateIssueStatus
                    })}
                    />
                </div>
            </div>
        )
    }
    return <></>
})