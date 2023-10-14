import { Assignee } from '../../../../models/assignee'
import { HoverDiv } from '../../Styles'
import { Issue } from '../../../../models/issue'
import { StyledLabelAvatar, AvatarIsActiveLabelBorder } from '../../../filters/Styles'
import './Styles.css'
import { useStore } from '../../../../stores/store'
import { 
    getAssigneeFullName, 
    getAssigneePhotoUrl
} from '../Utils/utils'

interface CreateIssueProps {
    mode: "create"
    projectReporters: Assignee[]
    selectedReporter: string
    setSelectedReporter: any
    addReporterToIssue: any
}

interface UpdateIssueProps {
    mode: 'update'
    projectReporters: Assignee[]
    selectedIssue: Issue
    addReporterToIssue: any
    selectedReporter: any 
    setSelectedReporter: any 
}

type ReporterProps = CreateIssueProps | UpdateIssueProps;

export const IssueReporters = ( props: ReporterProps ) => {
    const { issueStore } = useStore();
    if(props.mode === "create"){
        var unassigned_reporters: string[] = []
        var all_assignee_ids: string[] = []
        var assigned_reporter: string
    
        props.projectReporters.map((reporter) => {
            all_assignee_ids.push(reporter.id)
        })
    
        assigned_reporter = props.selectedReporter
    
        all_assignee_ids.map((assignee_id) => {
            if (assignee_id !== assigned_reporter) {
                unassigned_reporters.push(assignee_id)
            }
        })
    
        var assignees_to_display: Assignee[] = []
    
        props.projectReporters.map((pr) => {
            if (unassigned_reporters.includes(pr.id)) {
                assignees_to_display.push(pr)
            }
        })
    
        return (assignees_to_display!.map((project_assignee, index) => ({
            key: project_assignee.id,
            value: project_assignee.id,
            text: getAssigneeFullName(project_assignee),
            content: (
                <HoverDiv onClick={() => props.addReporterToIssue({
                        mode: 'create', 
                        assignee_id: project_assignee.id, 
                        selectedReporter: props.selectedReporter, 
                        setSelectedReporter: props.setSelectedReporter
                        })
                    } 
                        
                        className='assignee_reporter_label'>
                    <AvatarIsActiveLabelBorder isActive={false} index={index}>
                        <StyledLabelAvatar value={project_assignee.id} size="20" round="20px" 
                            name={getAssigneeFullName(project_assignee)} 
                            src={getAssigneePhotoUrl(project_assignee, props.projectReporters)}
                        />
                    </AvatarIsActiveLabelBorder>
                    {getAssigneeFullName(project_assignee)}
                </HoverDiv>
            ),
        }))
        )
    }
    if(props.mode === 'update'){
            var unassigned_reporters: string[] = []
            var all_assignee_ids: string[] = []
            var assigned_reporter: string
        
            props.projectReporters.map((reporter) => {
                all_assignee_ids.push(reporter.id)
            })
        
            assigned_reporter = props.selectedReporter
        
            all_assignee_ids.map((assignee_id) => {
                if (assignee_id !== assigned_reporter) {
                    unassigned_reporters.push(assignee_id)
                }
            })
        
            var assignees_to_display: Assignee[] = []
        
            props.projectReporters.map((pr) => {
                if (unassigned_reporters.includes(pr.id)) {
                    assignees_to_display.push(pr)
                }
            })
        
            return (assignees_to_display!.map((project_assignee, index) => ({
                key: project_assignee.id,
                value: project_assignee.id,
                text: getAssigneeFullName(project_assignee),
                content: (
                    <HoverDiv onClick={() => props.addReporterToIssue({
                            mode: 'update',
                            assignee_id: project_assignee.id, 
                            selectedReporter: props.selectedReporter, 
                            selectedIssue: props.selectedIssue, 
                            updateIssue: issueStore.updateIssue
                        })} className='assignee_reporter_label'>
                        <AvatarIsActiveLabelBorder isActive={false} index={index}>
                            <StyledLabelAvatar value={project_assignee.id} size="20" round="20px" 
                                name={getAssigneeFullName(project_assignee)} 
                                src={getAssigneePhotoUrl(project_assignee, props.projectReporters)}
                            />
                        </AvatarIsActiveLabelBorder>
                        {getAssigneeFullName(project_assignee)}
                    </HoverDiv>
                ),
            }))
            )
    }
}