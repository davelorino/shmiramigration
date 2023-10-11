
import { Project } from '../../../../models/project'
import { HoverDiv } from '../../Styles'
import { StyledLabel } from '../../Styles'
import './Styles.css'


 export const SprintOptions = ( 
    selectedProject: Project, 
    selectedIssueSprint: string,
    setSelectedIssueSprint: any,
    selectedIssueSprinName: string, 
    setSelectedIssueSprintName: any ) => {
        
    return (
        selectedProject!.sprints.map((sprint) => ({
            key: sprint.id,
            value: sprint.id,
            text: sprint.name,
            content: (
                <HoverDiv onClick={() => {setSelectedIssueSprint(sprint.id); setSelectedIssueSprintName(sprint.name); }}>
                    <StyledLabel>{sprint.name}</StyledLabel>
                </HoverDiv>
        )}
    )))
}


