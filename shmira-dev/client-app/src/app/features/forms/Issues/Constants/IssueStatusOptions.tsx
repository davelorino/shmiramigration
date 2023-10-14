
import { HoverDiv } from '../../Styles'
import { Label } from 'semantic-ui-react'
import { Issue } from '../../../../models/issue'
import IssueTypeIcon from '../../../../images/IssueTypeIcon'
import { useStore } from '../../../../stores/store'

interface CreateIssueProps {
    mode: 'create'
    setSelectedIssueStatus: (selectedIssueStatus: string) => void
    selectedIssueStatus: string
}

interface UpdateIssueProps {
    mode: 'update'
    selectedIssue: Issue
    updateIssueStatus: (
        status: string, 
        selectedIssue: Issue, 
        updateIssue: (updated_issue: Issue) => Partial<void>
    ) => void
}

type IssueStatusProps = CreateIssueProps | UpdateIssueProps;

export const IssueStatusOptions = ( props: IssueStatusProps ) => {
    const { issueStore } = useStore()
    if(props.mode === 'create') {
        return(
            [
                {
                    key: '0',
                    value: 'To Do',
                    text: 'To Do',
                    content: (
                        <HoverDiv onClick={() => props.setSelectedIssueStatus('To Do')}>
                            <Label color="blue">To Do</Label>
                        </HoverDiv>
                    ),
                },
                {
                    key: '1',
                    value: 'In Progress',
                    text: 'In Progress',
                    content: (
                        <HoverDiv onClick={() => props.setSelectedIssueStatus('In Progress')}>
                            <Label color="green">In Progress</Label>
                        </HoverDiv>
                    ),
                },
                {
                    key: '2',
                    value: 'Review',
                    text: 'Review',
                    content: (
                        <HoverDiv onClick={() => props.setSelectedIssueStatus('Review')}>
                            <Label color="purple">In Review</Label>
                        </HoverDiv>
                    ),
                },
                {
                    key: '3',
                    value: 'Done',
                    text: 'Done',
                    content: (
                        <HoverDiv onClick={() => props.setSelectedIssueStatus('Done')}>
                            <Label>Done</Label>
                        </HoverDiv>
                    ),
                },
            ]
        )
    }
    if(props.mode === 'update'){
        return(
            [
                {
                    key: '0',
                    value: 'To Do',
                    text: 'To Do',
                    content: (
                        <HoverDiv onClick={() => props.updateIssueStatus('To Do', props.selectedIssue, issueStore.updateIssue)}>
                            <Label color="blue">To Do</Label>
                        </HoverDiv>
                    ),
                },
                {
                    key: '1',
                    value: 'In Progress',
                    text: 'In Progress',
                    content: (
                        <HoverDiv onClick={() => props.updateIssueStatus('In Progress', props.selectedIssue, issueStore.updateIssue)}>
                            <Label color="green">In Progress</Label>
                        </HoverDiv>
                    ),
                },
                {
                    key: '2',
                    value: 'Review',
                    text: 'Review',
                    content: (
                        <HoverDiv onClick={() => props.updateIssueStatus('Review', props.selectedIssue, issueStore.updateIssue)}>
                            <Label color="purple">In Review</Label>
                        </HoverDiv>
                    ),
                },
                {
                    key: '3',
                    value: 'Done',
                    text: 'Done',
                    content: (
                        <HoverDiv onClick={() => props.updateIssueStatus('Done', props.selectedIssue, issueStore.updateIssue)}>
                            <Label>Done</Label>
                        </HoverDiv>
                    ),
                },
            ]
        )
    }
    return <></>
}