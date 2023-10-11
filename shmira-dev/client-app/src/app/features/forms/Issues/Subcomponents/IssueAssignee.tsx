import { observer } from 'mobx-react-lite'
import { Assignee } from '../../../../models/assignee'
import { Project } from '../../../../models/project'
import { IssueAssignees } from '../Constants/IssueAssignees'
import Icon from '../../../../images/Icon/index'
import { StyledLabelAvatar, AvatarIsActiveLabelBorder } from '../../../filters/Styles'
import { StyledLabel } from '../../Styles'
import { Dropdown } from 'semantic-ui-react'
import { 
    addReporterToIssue,
    getAssigneeName, 
    getAssigneePhoto
} from '../Utils/utils'
import { 
    hoveredStyle,
    baseStyle,
    divStyles
} from './Styles'
import './Styles.css'

interface Props {
    isAssigneeHovered: boolean 
    setIsAssigneeHovered: any 
    selectedAssignees: string[]
    setSelectedAssignees: any
    project_assignees: Assignee[]
    account_id: string
    removeAssigneeFromIssue: any 
    addAssigneeToIssue: any
    IssueAssignees: any
    selectedProject: Project
}

export default observer(function IssueAssignee({ 
    isAssigneeHovered,
    setIsAssigneeHovered,
    selectedAssignees,
    setSelectedAssignees,
    project_assignees,
    account_id,
    removeAssigneeFromIssue,
    addAssigneeToIssue,
    IssueAssignees,
    selectedProject
}: Props) {
    return (
    <>
        <div style={{ marginBottom: '20px' }} />
        <div style={{...divStyles,...baseStyle,...{position: 'relative',zIndex: '98',},...(isAssigneeHovered ? hoveredStyle : {})}}
            onMouseEnter={() => setIsAssigneeHovered(true)}
            onMouseLeave={() => setIsAssigneeHovered(false)}
        >
            <h5 style={{paddingLeft: '20px', paddingTop: '10px'}}>Assignees</h5>
            <hr style={{border: '1px solid white', width: '100%'}}/>
            {selectedAssignees.map((user_id: any, index: any) => (
                <div style={{marginLeft: '20px', marginTop: '6px' }}>
                <StyledLabel style={{marginBottom: '2px', marginRight: '4px'}} onClick={() => {removeAssigneeFromIssue(user_id, selectedAssignees, setSelectedAssignees)}}>
                    <AvatarIsActiveLabelBorder isActive={false} index={index}>
                        <StyledLabelAvatar
                            src={getAssigneePhoto({ project_assignees: selectedProject!.assignees, id: user_id, account_type: "Assignee Id" }) }
                            value={selectedProject!.assignees.find((assignee) => assignee.id === user_id)!.id} size="20" round="20px"
                            name={getAssigneeName({ project_assignees: selectedProject!.assignees, id: user_id, account_type: "Assignee Id" })}
                        />
                    </AvatarIsActiveLabelBorder>
                    {selectedProject!.assignees
                        .find((assignee) => assignee.id === user_id)!.first_name
                        .concat(' ', selectedProject!.assignees
                        .find((assignee) => assignee.id === user_id)!.second_name)}
                    <Icon style={{ marginLeft: '10px' }} type="close"/>
                </StyledLabel>
                </div>
            ))}
        
    {/* ASSIGNEES SELECTOR DROPDOWN */}

            <div style={{marginLeft: '20px'}}>
                <Dropdown multiple downward placeholder="+ Add more" value="" label="Assign" name="assignees"
                    style={{position: 'relative', marginTop: '0px', paddingTop: '0px', zIndex: '99'}}
                    options={IssueAssignees({projectAssignees: project_assignees, selectedAssignees, setSelectedAssignees, addAssigneeToIssue, selectedProject})}
                />
            </div>
        </div>
    </>
)})