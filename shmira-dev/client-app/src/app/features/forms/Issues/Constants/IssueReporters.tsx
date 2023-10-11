import { Assignee } from '../../../../models/assignee'
import { HoverDiv } from '../../Styles'
import { StyledLabelAvatar, AvatarIsActiveLabelBorder } from '../../../filters/Styles'
import './Styles.css'
import { 
    getAssigneeFullName, 
    getAssigneePhotoUrl
} from '../Utils/utils'

interface Props {
    projectReporters: Assignee[]
    selectedReporter: string
    setSelectedReporter: any
    addReporterToIssue: any
}

export const IssueReporters = ({ projectReporters, selectedReporter, setSelectedReporter, addReporterToIssue }: Props ) => {


    var unassigned_reporters: string[] = []
    var all_assignee_ids: string[] = []
    var assigned_reporter: string

    projectReporters.map((reporter) => {
        all_assignee_ids.push(reporter.id)
    })

    assigned_reporter = selectedReporter

    all_assignee_ids.map((assignee_id) => {
        if (assignee_id !== assigned_reporter) {
            unassigned_reporters.push(assignee_id)
        }
    })

    var assignees_to_display: Assignee[] = []

    projectReporters.map((pr) => {
        if (unassigned_reporters.includes(pr.id)) {
            assignees_to_display.push(pr)
        }
    })

    return assignees_to_display!.map((project_assignee, index) => ({
        key: project_assignee.id,
        value: project_assignee.id,
        text: getAssigneeFullName(project_assignee),
        content: (
            <HoverDiv onClick={() => addReporterToIssue(project_assignee.id, selectedReporter, setSelectedReporter)} className='assignee_reporter_label'>
                <AvatarIsActiveLabelBorder isActive={false} index={index}>
                    <StyledLabelAvatar value={project_assignee.id} size="20" round="20px" 
                        name={getAssigneeFullName(project_assignee)} 
                        src={getAssigneePhotoUrl(project_assignee, projectReporters)}
                    />
                </AvatarIsActiveLabelBorder>
                {getAssigneeFullName(project_assignee)}
            </HoverDiv>
        ),
    }))
}