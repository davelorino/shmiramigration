import { observer } from 'mobx-react-lite'
import { Assignee } from '../../../../models/assignee'
import IssuePriorityIcon from '../../../../images/IssuePriorityIcon'
import { Dropdown } from 'semantic-ui-react'
import { StyledLabel } from '../../Styles'
import { IssuePriorityOptions } from '../Constants/IssuePriorityOptions'
import {     
    divStyles,
    hoveredStyle,
    baseStyle,
    IssueStatusDropdown,
    StatusHeading
} from './Styles'
import './Styles.css'


interface Props {
    isPriorityHovered: boolean
    setIsPriorityHovered: any 
    selectedIssuePriority: string
    setSelectedIssuePriority: any
    projectAssignees: Assignee[]
}

export default observer(function IssuePriority ({ 
    isPriorityHovered,
    setIsPriorityHovered,
    selectedIssuePriority,
    setSelectedIssuePriority,
    projectAssignees
}: Props ) {
    
    return (
        <div
            style={{...{marginTop: '20px'}, ...divStyles, ...baseStyle, ...(isPriorityHovered ? hoveredStyle : {})}}
            onMouseEnter={() => setIsPriorityHovered(true)}
            onMouseLeave={() => setIsPriorityHovered(false)}
        >
            <h5 style={{marginBottom: '5px', paddingBottom: '5px', marginLeft: '20px', marginTop: '10px', verticalAlign: 'top' }}>Priority</h5>
            <hr style={{border: '1px solid white'}}/>
            <div style={{marginBottom: '0pxx', paddingBottom: '5px', marginLeft: '20px', marginTop: '10px', verticalAlign: 'top' }}>
                <StyledLabel>
                    <IssuePriorityIcon priority={selectedIssuePriority}/>
                    <p style={{paddingBottom: '3px', paddingLeft: '5px', display: 'inline-block'}}>
                        {selectedIssuePriority}
                    </p>
                </StyledLabel>

                <Dropdown 
                    style={{marginLeft: '-20px'}} 
                    downward 
                    multiple 
                    closeOnChange 
                    placeholder="" 
                    value="" 
                    label="Priority" 
                    name="priority" 
                    options={IssuePriorityOptions({setSelectedIssuePriority, selectedIssuePriority})}
                />
            </div>
        </div>
    )
})