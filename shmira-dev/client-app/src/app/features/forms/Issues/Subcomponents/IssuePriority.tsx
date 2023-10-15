import { observer } from 'mobx-react-lite'
import { Assignee } from '../../../../models/assignee'
import IssuePriorityIcon from '../../../../images/IssuePriorityIcon'
import { Dropdown } from 'semantic-ui-react'
import { StyledLabel } from '../../Styles'
import { IssuePriorityOptions } from '../Constants/IssuePriorityOptions'
import { Issue } from '../../../../models/issue'
import {     
    divStyles,
    hoveredStyle,
    baseStyle,
    IssueStatusDropdown,
    StatusHeading
} from './Styles'
import './Styles.css'


interface CreateIssueProps {
    mode: 'create'
    isPriorityHovered: boolean
    setIsPriorityHovered: any 
    selectedIssuePriority: string
    setSelectedIssuePriority: any
}

interface UpdateIssueProps {
    mode: 'update'
    isPriorityHovered: boolean
    setIsPriorityHovered: any 
    selectedIssue: Issue
    updateIssuePriority: any
}

type PriorityProps = CreateIssueProps | UpdateIssueProps;

export default observer(function IssuePriority ( props: PriorityProps ) {
    if(props.mode === 'create'){
        return (
            <div
                style={{...{marginTop: '20px'}, ...divStyles, ...baseStyle, ...(props.isPriorityHovered ? hoveredStyle : {})}}
                onMouseEnter={() => props.setIsPriorityHovered(true)}
                onMouseLeave={() => props.setIsPriorityHovered(false)}
            >
                <h5 style={{marginBottom: '5px', paddingBottom: '5px', marginLeft: '20px', marginTop: '10px', verticalAlign: 'top' }}>Priority</h5>
                <hr style={{border: '1px solid white'}}/>
                <div style={{marginBottom: '0pxx', paddingBottom: '5px', marginLeft: '20px', marginTop: '10px', verticalAlign: 'top' }}>
                    <StyledLabel>
                        <IssuePriorityIcon priority={props.selectedIssuePriority}/>
                        <p style={{paddingBottom: '3px', paddingLeft: '5px', display: 'inline-block'}}>
                            {props.selectedIssuePriority}
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
                        options={
                            IssuePriorityOptions({
                                mode: 'create',
                                setSelectedIssuePriority: props.setSelectedIssuePriority, 
                                selectedIssuePriority: props.selectedIssuePriority
                            })
                        }
                    />
                </div>
            </div>
        )
    }
    if(props.mode === 'update'){
        return (
            <div
                style={{...{marginTop: '20px'}, ...divStyles, ...baseStyle, ...(props.isPriorityHovered ? hoveredStyle : {})}}
                onMouseEnter={() => props.setIsPriorityHovered(true)}
                onMouseLeave={() => props.setIsPriorityHovered(false)}
            >
                <h5 style={{marginBottom: '5px', paddingBottom: '5px', marginLeft: '20px', marginTop: '10px', verticalAlign: 'top' }}>Priority</h5>
                <hr style={{border: '1px solid white'}}/>
                <div style={{marginBottom: '0pxx', paddingBottom: '5px', marginLeft: '20px', marginTop: '10px', verticalAlign: 'top' }}>
                    <StyledLabel>
                        <IssuePriorityIcon priority={props.selectedIssue!.priority}/>
                        <p style={{paddingBottom: '3px', paddingLeft: '5px', display: 'inline-block'}}>
                            {props.selectedIssue!.priority}
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
                        options={
                            IssuePriorityOptions({
                                mode: 'update',
                                selectedIssue: props.selectedIssue!, 
                                updateIssuePriority: props.updateIssuePriority
                            })
                        }
                    />
                </div>
            </div>
        )
    }
    return <></>
})