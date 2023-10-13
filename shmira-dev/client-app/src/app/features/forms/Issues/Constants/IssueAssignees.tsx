import { Assignee } from '../../../../models/assignee'
import { Project } from '../../../../models/project'
import { Issue } from '../../../../models/issue'
import { HoverDiv } from '../../Styles'
import { useStore } from '../../../../stores/store'
import { StyledLabelAvatar, AvatarIsActiveLabelBorder } from '../../../filters/Styles'
import './Styles.css'

interface CreateIssueProps {
    mode: "create"
    projectAssignees: Assignee[]
    selectedAssignees: string[]
    setSelectedAssignees: any
    addAssigneeToIssue: any
    selectedProject: Project | undefined
}

interface UpdateIssueProps {
    mode: "update"
    projectAssignees: Assignee[]
    selectedAssignees: string[]
    setSelectedAssignees: any
    addAssigneeToIssue: any
    selectedProject: Project | undefined
    selectedIssue: Issue
}

type IssueAssigneesProps = CreateIssueProps | UpdateIssueProps;

export const IssueAssignees = ( props: IssueAssigneesProps ) => {
    const { issueStore } = useStore()
    if(props.mode === "create"){
        var unassigned_assignees: string[] = []
        var all_assignee_ids: string[] = []
        var assigned_assignees: string[] = []

        props.projectAssignees.map((assignee) => {
            all_assignee_ids.push(assignee.id)
        })

        props.selectedAssignees.map((assignee: any) => {
            assigned_assignees.push(assignee)
        })

        all_assignee_ids.map((assignee) => {
            if (!assigned_assignees.includes(assignee))
                unassigned_assignees.push(assignee)
        })

        var assignees_to_display: Assignee[] = []

        props.projectAssignees.map((pa) => {
            if (unassigned_assignees.includes(pa.id)) {
                assignees_to_display.push(pa)
            }
        })

        return (assignees_to_display!.map((project_assignee, index) => ({
            key: project_assignee.id,
            value: project_assignee.id,
            text: project_assignee.first_name.concat(' ', project_assignee.second_name),
            content: (
                <HoverDiv className='assignee_reporter_label' 
                    onClick={() => 
                        props.addAssigneeToIssue({
                            mode: "create", 
                            assignee_id: project_assignee.id, 
                            selectedAssignees: props.selectedAssignees, 
                            setSelectedAssignees: props.setSelectedAssignees
                        })
                    }
                    >
                    <AvatarIsActiveLabelBorder isActive={false} index={index}>
                        <StyledLabelAvatar
                            value={project_assignee.id}
                            size="20"
                            name={project_assignee.first_name.concat(' ', project_assignee.second_name)}
                            round="20px"
                            src={props.selectedProject?.assignees.find((assignee) => assignee.id === project_assignee.id)!.photo?.url}
                        />
                    </AvatarIsActiveLabelBorder>
                    {project_assignee.first_name.concat(' ', project_assignee.second_name)}
                </HoverDiv>
            ),
        }))
        )
    }
    if(props.mode === "update"){
        var unassigned_assignees: string[] = []
        var all_assignee_ids: string[] = []
        var assigned_assignees: string[] = []

        props.projectAssignees.map((assignee) => {
            all_assignee_ids.push(assignee.id)
        })

        props.selectedIssue.assignees.map((assignee) => {
            assigned_assignees.push(assignee.id)
        })

        all_assignee_ids.map((assignee) => {
            if (!assigned_assignees.includes(assignee))
                unassigned_assignees.push(assignee)
        })

        var assignees_to_display: Assignee[] = []

        props.projectAssignees.map((pa) => {
            if (unassigned_assignees.includes(pa.id)) {
                assignees_to_display.push(pa)
            }
        })

        return assignees_to_display!.map((project_assignee, index) => ({
            key: project_assignee.id,
            value: project_assignee.id,
            text: project_assignee.first_name.concat(
                ' ',
                project_assignee.second_name
            ),
            content: (
                <HoverDiv className="assignee_reporter_label"
                    onClick={() => 
                        props.addAssigneeToIssue({
                            mode: "update", 
                            assignee_id: project_assignee.id, 
                            selectedIssue: props.selectedIssue, 
                            addAssigneeToIssue: issueStore.addAssigneeToIssue, 
                            allUsers: props.selectedProject!.assignees 
                        })
                    }
                >
                    <AvatarIsActiveLabelBorder isActive={false} index={index}>
                        <StyledLabelAvatar
                            value={project_assignee.id}
                            size="20"
                            name={project_assignee.first_name.concat(' ', project_assignee.second_name)}
                            round="20px"
                            src={props.selectedProject?.assignees.find((assignee) => assignee.id === project_assignee.id)!.photo?.url}
                        />
                    </AvatarIsActiveLabelBorder>
                    <div style={{paddingTop: '5px', marginTop: '5px', display: 'inline'}}> 
                    {project_assignee.first_name.concat(' ', project_assignee.second_name)}
                    </div>
                </HoverDiv>
            ),
        }))
    }
}