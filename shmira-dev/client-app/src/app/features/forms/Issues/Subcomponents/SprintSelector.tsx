import { observer } from 'mobx-react-lite'
import { Dropdown } from 'semantic-ui-react'
import { StyledLabel } from '../../Styles'
import { Issue } from '../../../../models/issue'
import { Project } from '../../../../models/project'
import { SprintOptions } from '../Constants/SprintOptions'
import { 
    hoveredStyle,
    baseStyle,
    divStyles
} from './Styles'

interface CreateIssueProps {
    mode: 'create'
    isSprintHovered: boolean 
    setIsSprintHovered: any 
    selectedIssueSprint: any 
    setSelectedIssueSprint: any
    selectedIssueSprintName: string 
    setSelectedIssueSprintName: any
    selectedProject: Project
    SprintOptions: any
}

interface UpdateIssueProps {
    mode: 'update'
    isSprintHovered: boolean 
    setIsSprintHovered: any 
    selectedIssue: Issue
    selectedProject: Project
    handleSprintChange: any
}

type SprintProps = CreateIssueProps | UpdateIssueProps;

export default observer(function SprintSelector( props: SprintProps ) {
    if(props.mode === 'create'){
        return (
            <>
                <div style={{...divStyles,...baseStyle,...{position: 'relative',zIndex: '50'}, ...(props.isSprintHovered ? hoveredStyle : {})}}
                        onMouseEnter={() => props.setIsSprintHovered(true)}
                        onMouseLeave={() => props.setIsSprintHovered(false)}
                    >
                    <h5 style={{ marginBottom: '5px', paddingBottom: '5px', marginLeft: '20px', marginTop: '10px', verticalAlign: 'top' }}>Sprint</h5>
                    <hr style={{border: '1px solid white', width: '100%'}}/>
                    <StyledLabel style={{ marginLeft: '20px', marginRight: '0px' }}>
                        <p style={{verticalAlign: 'top', paddingBottom: '3px', paddingTop: '3px'}}>
                            {props.selectedIssueSprintName}
                        </p>
                    </StyledLabel>
    
                    <Dropdown downward multiple closeOnChange placeholder="" value="" label="Sprint" name="sprint" style={{marginLeft: '-15px', paddingLeft: '0px', position: 'relative', zIndex: '99'}}
                        options={SprintOptions({
                            mode: 'create', 
                            selectedProject: props.selectedProject, 
                            selectedIssueSprint: props.selectedIssueSprint, 
                            setSelectedIssueSprint: props.setSelectedIssueSprint, 
                            selectedIssueSprintName: props.selectedIssueSprintName, 
                            setSelectedIssueSprintName: props.setSelectedIssueSprintName
                        })}        
                    />
                </div>
            </>
        )
    }
    if(props.mode === 'update'){
        return (
            <>
                <div style={{...divStyles,...baseStyle,...{position: 'relative',zIndex: '50'}, ...(props.isSprintHovered ? hoveredStyle : {})}}
                        onMouseEnter={() => props.setIsSprintHovered(true)}
                        onMouseLeave={() => props.setIsSprintHovered(false)}
                    >
                    <h5 style={{ marginBottom: '5px', paddingBottom: '5px', marginLeft: '20px', marginTop: '10px', verticalAlign: 'top' }}>Sprint</h5>
                    <hr style={{border: '1px solid white', width: '100%'}}/>
                    <StyledLabel style={{ marginLeft: '20px', marginRight: '0px' }}>
                        <p style={{verticalAlign: 'top', paddingBottom: '3px', paddingTop: '3px'}}>
                            {props.selectedProject.sprints.find((sprint) => sprint.id === props.selectedIssue.sprint_id)?.name} 
                        </p>
                    </StyledLabel>
    
                    <Dropdown downward multiple closeOnChange placeholder="" value="" label="Sprint" name="sprint" style={{marginLeft: '-15px', paddingLeft: '0px', position: 'relative', zIndex: '99'}}
                        options={SprintOptions({
                            mode: 'update', 
                            selectedProject: props.selectedProject, 
                            selectedIssue: props.selectedIssue, 
                            handleSprintChange: props.handleSprintChange
                        })}        
                    />
                </div>
            </>
        )
    }
    return <></>
})