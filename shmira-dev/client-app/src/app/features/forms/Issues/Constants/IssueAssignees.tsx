import { Assignee } from '../../../../models/assignee'
import { Project } from '../../../../models/project'
import { HoverDiv } from '../../Styles'
import { StyledLabelAvatar, AvatarIsActiveLabelBorder } from '../../../filters/Styles'
import './Styles.css'

interface Props {
    projectAssignees: Assignee[]
    selectedAssignees: string[]
    setSelectedAssignees: any
    addAssigneeToIssue: any
    selectedProject: Project | undefined
}

export const IssueAssignees = ({ projectAssignees, selectedAssignees, setSelectedAssignees, addAssigneeToIssue, selectedProject }: Props ) => {
    var unassigned_assignees: string[] = []
    var all_assignee_ids: string[] = []
    var assigned_assignees: string[] = []

    projectAssignees.map((assignee) => {
        all_assignee_ids.push(assignee.id)
    })

    selectedAssignees.map((assignee: any) => {
        assigned_assignees.push(assignee)
    })

    all_assignee_ids.map((assignee) => {
        if (!assigned_assignees.includes(assignee))
            unassigned_assignees.push(assignee)
    })

    var assignees_to_display: Assignee[] = []

    projectAssignees.map((pa) => {
        if (unassigned_assignees.includes(pa.id)) {
            assignees_to_display.push(pa)
        }
    })

    return assignees_to_display!.map((project_assignee, index) => ({
        key: project_assignee.id,
        value: project_assignee.id,
        text: project_assignee.first_name.concat(' ', project_assignee.second_name),
        content: (
            <HoverDiv className='assignee_reporter_label' onClick={() => addAssigneeToIssue(project_assignee.id, selectedAssignees, setSelectedAssignees)}>
                <AvatarIsActiveLabelBorder isActive={false} index={index}>
                    <StyledLabelAvatar
                        value={project_assignee.id}
                        size="20"
                        name={project_assignee.first_name.concat(' ', project_assignee.second_name)}
                        round="20px"
                        src={selectedProject?.assignees.find((assignee) => assignee.id === project_assignee.id)!.photo?.url}
                    />
                </AvatarIsActiveLabelBorder>
                {project_assignee.first_name.concat(' ', project_assignee.second_name)}
            </HoverDiv>
        ),
    }))
}