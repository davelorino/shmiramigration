
import { HoverDiv } from '../../Styles'
import { Label } from 'semantic-ui-react'
import IssueTypeIcon from '../../../../images/IssueTypeIcon'

interface Props {
    setSelectedIssueStatus: any
    selectedIssueStatus: any
}

export const IssueStatusOptions = ( { setSelectedIssueStatus, selectedIssueStatus}: Props ) => {
    return(
        [
            {
                key: '0',
                value: 'To Do',
                text: 'To Do',
                content: (
                    <HoverDiv onClick={() => setSelectedIssueStatus('To Do')}>
                        <Label color="blue">To Do</Label>
                    </HoverDiv>
                ),
            },
            {
                key: '1',
                value: 'In Progress',
                text: 'In Progress',
                content: (
                    <HoverDiv onClick={() => setSelectedIssueStatus('In Progress')}>
                        <Label color="green">In Progress</Label>
                    </HoverDiv>
                ),
            },
            {
                key: '2',
                value: 'Review',
                text: 'Review',
                content: (
                    <HoverDiv onClick={() => setSelectedIssueStatus('Review')}>
                        <Label color="purple">In Review</Label>
                    </HoverDiv>
                ),
            },
            {
                key: '3',
                value: 'Done',
                text: 'Done',
                content: (
                    <HoverDiv onClick={() => setSelectedIssueStatus('Done')}>
                        <Label>Done</Label>
                    </HoverDiv>
                ),
            },
        ]
    )}