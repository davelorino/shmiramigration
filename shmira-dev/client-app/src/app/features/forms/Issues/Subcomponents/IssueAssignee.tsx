import { observer } from 'mobx-react-lite'
import { Assignee } from '../../../../models/assignee'
import { Project } from '../../../../models/project'
import { Issue } from '../../../../models/issue'
import { IssueAssignees } from '../Constants/IssueAssignees'
import Icon from '../../../../images/Icon/index'
import { StyledLabelAvatar, AvatarIsActiveLabelBorder } from '../../../filters/Styles'
import { StyledLabel } from '../../Styles'
import { Dropdown } from 'semantic-ui-react'
import { useStore } from '../../../../stores/store'
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

interface CreateIssueProps {
    mode: "create"
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

interface UpdateIssueProps {
    mode: "update"
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
    selectedIssue: Issue
}

type IssueFormProps = CreateIssueProps | UpdateIssueProps;

export default observer(function IssueAssignee(props: IssueFormProps) {
    const { issueStore } = useStore()
    if(props.mode === "create"){
    return (
    <>
        <div style={{ marginBottom: '20px' }} />
        <div style={{...divStyles,...baseStyle,...{position: 'relative',zIndex: '98',},...(props.isAssigneeHovered ? hoveredStyle : {})}}
            onMouseEnter={() => props.setIsAssigneeHovered(true)}
            onMouseLeave={() => props.setIsAssigneeHovered(false)}
        >
            <h5 style={{paddingLeft: '20px', paddingTop: '10px'}}>Assignees</h5>
            <hr style={{border: '1px solid white', width: '100%'}}/>
            {props.selectedAssignees.map((user_id: any, index: any) => (
                <div style={{marginLeft: '20px', marginTop: '6px' }}>
                <StyledLabel style={{marginBottom: '2px', marginRight: '4px'}} onClick={() => {props.removeAssigneeFromIssue({mode: "create", assignee_id: user_id, selectedAssignees: props.selectedAssignees, setSelectedAssignees: props.setSelectedAssignees})}}>
                    <AvatarIsActiveLabelBorder isActive={false} index={index}>
                        <StyledLabelAvatar
                            src={getAssigneePhoto({ project_assignees: props.selectedProject!.assignees, id: user_id, account_type: "Assignee Id" }) }
                            value={props.selectedProject!.assignees.find((assignee) => assignee.id === user_id)!.id} size="20" round="20px"
                            name={getAssigneeName({ project_assignees: props.selectedProject!.assignees, id: user_id, account_type: "Assignee Id" })}
                        />
                    </AvatarIsActiveLabelBorder>
                    {props.selectedProject!.assignees
                        .find((assignee) => assignee.id === user_id)!.first_name
                        .concat(' ', props.selectedProject!.assignees
                        .find((assignee) => assignee.id === user_id)!.second_name)}
                    <Icon style={{ marginLeft: '10px' }} type="close"/>
                </StyledLabel>
                </div>
            ))}
        
    {/* ASSIGNEES SELECTOR DROPDOWN */}

            <div style={{marginLeft: '20px'}}>
                <Dropdown multiple downward placeholder="+ Add more" value="" label="Assign" name="assignees"
                    style={{position: 'relative', marginTop: '0px', paddingTop: '0px', zIndex: '99'}}
                     options={IssueAssignees({mode: "create", projectAssignees: props.project_assignees, selectedAssignees: props.selectedAssignees, setSelectedAssignees: props.setSelectedAssignees, addAssigneeToIssue: props.addAssigneeToIssue, selectedProject: props.selectedProject})}
                />
            </div>
        </div>
    </>
)}
    if(props.mode === "update")
    {
        return(
            <>
            <div style={{ marginBottom: '20px' }} />
            <div style={{...divStyles,...baseStyle,...{position: 'relative',zIndex: '98',},...(props.isAssigneeHovered ? hoveredStyle : {})}}
                onMouseEnter={() => props.setIsAssigneeHovered(true)}
                onMouseLeave={() => props.setIsAssigneeHovered(false)}
            >
                <h5 style={{paddingLeft: '20px', paddingTop: '10px'}}>Assignees</h5>
                <hr style={{border: '1px solid white', width: '100%'}}/>
                {props.selectedIssue.assignees.map((user: any, index: any) => (
                    <div style={{marginLeft: '20px', marginTop: '6px' }}>
                    {console.log("User id: ")}
                    {console.log(user.id)}
                    <StyledLabel style={{marginBottom: '2px', marginRight: '4px'}} onClick={() => {props.removeAssigneeFromIssue({mode: "update", assignee_id: user.id, selectedIssue: props.selectedIssue, removeAssigneeFromIssue: issueStore.removeAssigneeFromIssue})}}>
                        <AvatarIsActiveLabelBorder isActive={false} index={index}>
                            <StyledLabelAvatar
                                src={getAssigneePhoto({ project_assignees: props.selectedProject!.assignees, id: user?.id, account_type: "Assignee Id" }) }
                                value={props.selectedProject!.assignees.find((assignee) => assignee.id === user?.id)!.id} size="20" round="20px"
                                name={getAssigneeName({ project_assignees: props.selectedProject!.assignees, id: user?.id, account_type: "Assignee Id" })}
                            />
                        </AvatarIsActiveLabelBorder>
                        {props.selectedProject!.assignees
                            .find((assignee) => assignee.id === user.id)!.first_name
                            .concat(' ', props.selectedProject!.assignees
                            .find((assignee) => assignee.id === user.id)!.second_name)}
                        <Icon style={{ marginLeft: '10px' }} type="close"/>
                    </StyledLabel>
                    </div>
                ))}
            
        {/* ASSIGNEES SELECTOR DROPDOWN */}

                <div style={{marginLeft: '20px'}}>
                    <Dropdown multiple downward placeholder="+ Add more" value="" label="Assign" name="assignees"
                        style={{position: 'relative', marginTop: '0px', paddingTop: '0px', zIndex: '99'}}
                        options={IssueAssignees({
                            mode: "update", 
                            projectAssignees: props.project_assignees, 
                            selectedAssignees: props.selectedAssignees, 
                            setSelectedAssignees: props.setSelectedAssignees, 
                            addAssigneeToIssue: props.addAssigneeToIssue, 
                            selectedProject: props.selectedProject,
                            selectedIssue: props.selectedIssue
                        })}
                    />
                </div>
            </div>
        </>
        )
    }
    return <></>
})