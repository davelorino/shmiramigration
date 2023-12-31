import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useStore } from '../../../../stores/store'
import { observer } from 'mobx-react-lite'
import NewUpdateIssueForm from '../../../forms/Issues/UpdateIssueForm/NewUpdateIssueForm'
import { StyledAvatar, AvatarIsActiveLabelBorder} from '../../../filters/Styles'
import IssuePriorityIcon from '../../../../images/IssuePriorityIcon'
import IssueTypeIcon from '../../../../images/IssueTypeIcon'

import {
    IssueLink,
    IssueCard,
    Title,
    IssueCardOuterContainer,
    Bottom /*, Assignees, AssigneeAvatar */,
} from './Styles'
import { Issue } from '../../../../models/issue'

interface Props {
    issue: Issue
    index: number
}

function renderSelectedIssueType(issue: Issue) {
    if (issue.issue_type == 'Story') {
        return <IssueTypeIcon color="#65BA43" type="story" size={14} />
    }
    if (issue.issue_type == 'Bug') {
        return <IssueTypeIcon color="#E44D42" type="bug" size={14} />
    }
    if (issue.issue_type == 'Task') {
        return <IssueTypeIcon color="#4FADE6" type="task" size={14} />
    }
}

export default observer(function ProjectBoardListIssue({issue, index}: Props) {
    const { modalStore, issueStore } = useStore()
    const { selectedIssue, selectedProject } = issueStore

    return (
        <Draggable draggableId={issue.id} index={index} key={issue.id}>
            {(provided, snapshot) => (
                <IssueCardOuterContainer ref={provided.innerRef} data-testid="list-issue" {...provided.draggableProps} {...provided.dragHandleProps}
                    onClick={() => {issueStore.selectIssue(issue.id); modalStore.openModal(<NewUpdateIssueForm />)}}
                >
                    <IssueCard isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating} style={{ overflow: 'hidden' }}>
                        <Title>{issue.name}</Title>
                        
                        <div style={{display: 'flex', alignItems: 'center'}}>
                        
                            <div style={{marginTop: '9px'}}>
                                {renderSelectedIssueType(issue)}
                                <IssuePriorityIcon  priority={issue.priority}></IssuePriorityIcon>
                            </div>
                            <div style={{marginLeft: 'auto', marginRight: '10px'}}>
                            {issue.assignees.map((assignee, index) => (
                                <div style={{display: 'inline'}}>
                                <AvatarIsActiveLabelBorder isActive={false} index={index}>
                                    <StyledAvatar value={assignee.id} size="24"
                                        src={assignee.photo ? assignee.photo.url : ''}
                                        name={assignee.first_name.concat(' ', assignee.second_name)}
                                        round="24px"
                                    />
                                </AvatarIsActiveLabelBorder>
                                </div>
                            ))}
                        </div>
                        </div>
                    </IssueCard>
                </IssueCardOuterContainer>
            )}
        </Draggable>
    )
})
