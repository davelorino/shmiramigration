import { observer } from 'mobx-react-lite'
import { Assignee } from '../../../../../models/assignee'
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


interface Props {
    isStatusHovered: boolean
    setIsStatusHovered: any 
    selectedIssueStatus: boolean
    setSelectedIssueStatus: any
    projectAssignees: Assignee[]
}

export default observer(function IssueStatus ({ 
    isStatusHovered, 
    setIsStatusHovered, 
    selectedIssueStatus, 
    setSelectedIssueStatus
}: Props ) {
    
    return (
        <div style={{...divStyles,...baseStyle,...{position: 'relative',zIndex: '99', paddingBottom: '8px'},...(isStatusHovered ? hoveredStyle : {})}}
            onMouseEnter={() => setIsStatusHovered(true)}
            onMouseLeave={() => setIsStatusHovered(false)}
        >
            <StatusHeading>Status</StatusHeading>
            <hr style={{border: '1px solid white',width: '100%'}}/>
            <div style={{marginLeft: '20px'}}>
            <Label style={{marginRight: '0px'}}>{selectedIssueStatus}</Label>
            <IssueStatusDropdown 
                downward 
                multiple 
                closeOnChange 
                placeholder="" 
                value="" 
                label="Status" 
                name="status" 
                options={IssueStatusOptions({setSelectedIssueStatus, selectedIssueStatus})}
                />
            </div>
        </div>
    )
})