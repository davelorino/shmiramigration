import { observer } from 'mobx-react-lite'
import { Assignee } from '../../../../models/assignee'
import { Issue } from '../../../../models/issue'
import { Project } from '../../../../models/project'
import { IssueReporters } from '../Constants/IssueReporters'
import Icon from '../../../../images/Icon/index'
import { StyledLabelAvatar, AvatarIsActiveLabelBorder } from '../../../filters/Styles'
import { StyledLabel } from '../../Styles'
import { Dropdown } from 'semantic-ui-react'
import { useStore } from '../../../../stores/store'
import { 
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
    mode: 'create'
    isReporterHovered: boolean 
    setIsReporterHovered: any 
    selectedReporter: string
    setSelectedReporter: any
    project_assignees: Assignee[]
    account_id: string
    addReporterToIssue: any
    IssueReporters: any 
}

interface UpdateIssueProps {
    mode: 'update'
    isReporterHovered: boolean 
    setIsReporterHovered: any 
    selectedIssue: Issue
    selectedProject: Project
    project_assignees: Assignee[]
    account_id: string
    addReporterToIssue: any
    removeReporterFromIssue: any
    IssueReporters: any 
    selectedReporter: any 
    setSelectedReporter: any
}

type ReporterProps = CreateIssueProps | UpdateIssueProps;

export default observer(function IssueReporter( props: ReporterProps ) {
    const { issueStore } = useStore()
    if(props.mode === 'create'){
        return (
            <>
                <div style={{ marginTop: '20px' }} />
                <div style={{...divStyles, ...baseStyle, ...{position: 'relative', zIndex: '90'}, ...(props.isReporterHovered ? hoveredStyle : {})}}
                    onMouseEnter={() => props.setIsReporterHovered(true)}
                    onMouseLeave={() => props.setIsReporterHovered(false)}
                >
                    <h5 style={{paddingLeft: '20px', paddingTop: '10px'}}>Reporter</h5>
                    <hr style={{border: '1px solid white', width: '100%'}}/>
                    {props.selectedReporter !== null && props.selectedReporter !== undefined && props.selectedReporter !== '' && (
                        <div style={{ marginLeft: '20px' }} >
                            <StyledLabel style={{marginBottom: '2px', marginRight: '4px'}}>
                                <AvatarIsActiveLabelBorder isActive={false} index={1}>
                                    <StyledLabelAvatar value={props.selectedReporter} size="20" round="20px"
                                        src={getAssigneePhoto({ project_assignees: props.project_assignees, id: props.selectedReporter, account_type: "Assignee Id"})} 
                                        name={getAssigneeName({ project_assignees: props.project_assignees, id: props.selectedReporter, account_type: "Assignee Id" })} 
                                    />
                                </AvatarIsActiveLabelBorder>
                                {getAssigneeName({project_assignees: props.project_assignees, id: props.selectedReporter, account_type: "Assignee Id"})}
                                <Icon style={{ marginLeft: '10px' }} type="close" onClick={() => props.setSelectedReporter('')}/>
                            </StyledLabel>
                        </div>
                    )}
        
                    <div style={{marginLeft: '20px'}}>
                    <Dropdown downward closeOnChange placeholder="Select reporter" value="" style={{zIndex: '99'}} label="Assign" name="reporter"
                        options={IssueReporters({ 
                                    mode:"create",
                                    projectReporters: props.project_assignees, 
                                    selectedReporter: props.selectedReporter, 
                                    setSelectedReporter: props.setSelectedReporter, 
                                    addReporterToIssue: props.addReporterToIssue
                                })}
                        />
                    </div>
                </div>
            </>
        )
    }
    if(props.mode === 'update'){
        return (
            <div style={{...divStyles, ...baseStyle, ...{position: 'relative', zIndex: '90'}, ...(props.isReporterHovered ? hoveredStyle : {})}}
                onMouseEnter={() => props.setIsReporterHovered(true)}
                onMouseLeave={() => props.setIsReporterHovered(false)}
            >
                <div style={{marginTop: '5px', marginBottom: '56x', display: 'flex', alignItems: 'center', height: '100%'}}>
                    <h4 style={{ paddingLeft: '20px'}}>Reporter</h4>
                </div>
                <hr style={{border: '1px solid white', width: '100%'}}/>
                {props.selectedIssue!.reporter_id !== null && props.selectedIssue!.reporter_id.length !== 0 && (
                    <div style={{marginLeft: '20px'}}>
                        <StyledLabel size='small' style={{marginBottom: '2px', marginRight: '4px'}} onClick={() => {props.removeReporterFromIssue(
                                props.selectedIssue!, issueStore.updateIssue
                                )}}>
                            <AvatarIsActiveLabelBorder isActive={false} index={1}>
                                <StyledLabelAvatar value={props.selectedIssue!.reporter_id} size="20"
                                    name={props.selectedProject!.assignees
                                        .find((assignee) => assignee.id === props.selectedIssue!.reporter_id)!
                                        .first_name.concat(' ', props.selectedProject!.assignees.find((assignee) => assignee.id === props.selectedIssue!.reporter_id)!.second_name)}
                                    round="25px"
                                    src={props.selectedProject!.assignees.find((assignee) => assignee.id === props.selectedIssue!.reporter_id)!.photo?.url}
                                />
                            </AvatarIsActiveLabelBorder>

                            {props.selectedProject!.assignees.find((assignee) => assignee.id === props.selectedIssue!.reporter_id)!.first_name.concat(' ', props.selectedProject!.assignees.find((assignee) => assignee.id === props.selectedIssue!.reporter_id)!.second_name)}
                            <Icon style={{marginLeft: '5px'}} type="close" />
                        </StyledLabel>
                    </div>
                    )}
                <div style={{fontSize: '8', marginLeft: '20px'}}>
                    <Dropdown downward multiple closeOnChange placeholder="Select reporter" value="" label="Assign" name="reporter"
                        style={{fontSize: '8', marginTop: '0px', paddingTop: '0px', position: 'relative', zIndex: '99'}}
                        options={
                            IssueReporters({
                                mode: 'update',
                                projectReporters: props.project_assignees, 
                                selectedIssue: props.selectedIssue, 
                                addReporterToIssue: props.addReporterToIssue,
                                selectedReporter: props.selectedReporter,
                                setSelectedReporter: props.setSelectedReporter
                            })
                        }
                        onChange={(e: any) => props.setSelectedReporter(e.target.value)}
                    />
                </div>
            </div>
        )
    }
    return <></>
   })