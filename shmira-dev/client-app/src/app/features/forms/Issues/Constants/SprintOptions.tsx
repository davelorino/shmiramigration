
import { Project } from '../../../../models/project'
import { HoverDiv } from '../../Styles'
import { StyledLabel } from '../../Styles'
import { Issue } from '../../../../models/issue'
import { useStore } from '../../../../stores/store'
import './Styles.css'

interface CreateIssueProps {
    mode: 'create'
    selectedProject: Project
    selectedIssueSprint: string
    setSelectedIssueSprint: any
    selectedIssueSprintName: string 
    setSelectedIssueSprintName: any
}

interface UpdateIssueProps {
    mode: 'update' 
    selectedProject: Project 
    selectedIssue: Issue
    handleSprintChange: any
}

type SprintProps = CreateIssueProps | UpdateIssueProps;

 export const SprintOptions = ( props: SprintProps ) => {
    const { issueStore } = useStore()
    if(props.mode === 'create'){
        return (
            props.selectedProject!.sprints.map((sprint) => ({
                key: sprint.id,
                value: sprint.id,
                text: sprint.name,
                content: (
                    <HoverDiv onClick={() => {props.setSelectedIssueSprint(sprint.id); props.setSelectedIssueSprintName(sprint.name); }}>
                        <StyledLabel>{sprint.name}</StyledLabel>
                    </HoverDiv>
                )
            }))
        )
    }
    if(props.mode === 'update'){
        return (
            props.selectedProject!.sprints.map((sprint) => ({
                key: sprint.id,
                value: sprint.id,
                text: sprint.name,
                content: (
                    <HoverDiv onClick={() => {
                        props.handleSprintChange(sprint.id, props.selectedIssue, props.selectedProject, issueStore.updateIssueAndSprint); 
                        }}>
                        <StyledLabel>{sprint.name}</StyledLabel>
                    </HoverDiv>
                )
            }))
        )
    }
}
    


