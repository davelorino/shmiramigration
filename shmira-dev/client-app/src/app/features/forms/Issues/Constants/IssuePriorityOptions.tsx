import IssuePriorityIcon from '../../../../images/IssuePriorityIcon'
import { StyledLabel } from '../../Styles'
import { Issue } from '../../../../models/issue'
import { useStore } from '../../../../stores/store'

interface CreateIssueProps {
    mode: 'create'
    setSelectedIssuePriority: any
    selectedIssuePriority: any
}

interface UpdateIssueProps {
    mode: 'update'
    selectedIssue: Issue
    updateIssuePriority: (priority: string, selectedIssue: Issue, updateIssue: (updated_issue: Issue) => Partial<void>) => void
}

type PriorityProps = CreateIssueProps | UpdateIssueProps;

export const IssuePriorityOptions = ( props: PriorityProps ) => {
    const { issueStore } = useStore();
    if(props.mode === 'create'){
        return(
            [
                {
                    key: '0',
                    value: 'Low',
                    text: 'Low',
                    content: (
                        <StyledLabel size='small' style={{ minWidth: '90px' }} 
                            onClick={() => {props.setSelectedIssuePriority('Low')}}>
                            <IssuePriorityIcon priority="Low" />
                            <p className='priority_text'>
                                Low
                            </p>
                        </StyledLabel>
                    ),
                },
                {
                    key: '1',
                    value: 'Medium',
                    text: 'Medium',
                    content: (
                        <StyledLabel size='small' style={{ minWidth: '90px' }} 
                            onClick={() => {props.setSelectedIssuePriority('Medium')}}>
                            <IssuePriorityIcon priority="Medium" />
                            <p className='priority_text'>
                                Medium
                            </p>
                        </StyledLabel>
                    ),
                },
                {
                    key: '2',
                    value: 'High',
                    text: 'High',
                    content: (
                        <StyledLabel size='small' style={{ minWidth: '90px' }} 
                            onClick={() => {props.setSelectedIssuePriority('High')}}>
                            <IssuePriorityIcon priority="High" />
                            <p className='priority_text'>
                                High
                            </p>
                        </StyledLabel>
                    ),
                }
            ]
        )
    }
    if(props.mode === 'update'){
        return(
            [
                {
                    key: '0',
                    value: 'Low',
                    text: 'Low',
                    content: (
                        <StyledLabel size='small' style={{ minWidth: '90px' }}  onClick={() => {props.updateIssuePriority('Low', props.selectedIssue, issueStore.updateIssue )}}>
                            <IssuePriorityIcon priority="Low" />
                            <p className='priority_text'>
                                Low
                            </p>
                        </StyledLabel>
                    ),
                },
                {
                    key: '1',
                    value: 'Medium',
                    text: 'Medium',
                    content: (
                        <StyledLabel size='small' style={{ minWidth: '90px' }}   onClick={() => {props.updateIssuePriority('Medium', props.selectedIssue, issueStore.updateIssue)}}>
                            <IssuePriorityIcon priority="Medium" />
                            <p className='priority_text'>
                                Medium
                            </p>
                        </StyledLabel>
                    ),
                },
                {
                    key: '2',
                    value: 'High',
                    text: 'High',
                    content: (
                        <StyledLabel size='small' style={{ minWidth: '90px' }}  onClick={() => {props.updateIssuePriority('High', props.selectedIssue, issueStore.updateIssue)}}>
                            <IssuePriorityIcon priority="High" />
                            <p className='priority_text'>
                                High
                            </p>
                        </StyledLabel>
                    ),
                }
            ]
        )
    }
}