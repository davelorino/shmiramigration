import { observer } from 'mobx-react-lite'
import { Dropdown } from 'semantic-ui-react'
import { StyledLabel } from '../../Styles'
import { Project } from '../../../../models/project'
import { 
    hoveredStyle,
    baseStyle,
    divStyles
} from './Styles'

interface Props {
    isSprintHovered: boolean 
    setIsSprintHovered: any 
    selectedIssueSprint: any 
    setSelectedIssueSprint: any
    selectedIssueSprintName: string 
    setSelectedIssueSprintName: any
    selectedProject: Project
    SprintOptions: any
}

export default observer(function SprintSelector({ 
    isSprintHovered,
    setIsSprintHovered,
    selectedIssueSprint, 
    setSelectedIssueSprint,
    selectedIssueSprintName, 
    setSelectedIssueSprintName,
    selectedProject,
    SprintOptions
}: Props) {
    return (
        <>
            <div style={{...divStyles,...baseStyle,...{position: 'relative',zIndex: '50'}, ...(isSprintHovered ? hoveredStyle : {})}}
                    onMouseEnter={() => setIsSprintHovered(true)}
                    onMouseLeave={() => setIsSprintHovered(false)}
                >
                <h5 style={{ marginBottom: '5px', paddingBottom: '5px', marginLeft: '20px', marginTop: '10px', verticalAlign: 'top' }}>Sprint</h5>
                <hr style={{border: '1px solid white', width: '100%'}}/>
                <StyledLabel style={{ marginLeft: '20px', marginRight: '0px' }}>
                    <p style={{verticalAlign: 'top', paddingBottom: '3px', paddingTop: '3px'}}>
                        {selectedIssueSprintName}
                    </p>
                </StyledLabel>

                <Dropdown downward multiple closeOnChange placeholder="" value="" label="Sprint" name="sprint" style={{marginLeft: '-15px', paddingLeft: '0px', position: 'relative', zIndex: '99'}}
                    options={SprintOptions(selectedProject, selectedIssueSprint, setSelectedIssueSprint, selectedIssueSprintName, setSelectedIssueSprintName)}        
                />
            </div>
        </>
)})