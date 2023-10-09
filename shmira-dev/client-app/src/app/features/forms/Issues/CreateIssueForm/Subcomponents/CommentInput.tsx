import { observer } from 'mobx-react-lite'
import { Assignee } from '../../../../../models/assignee'
import { TextArea } from 'semantic-ui-react'
import { CommentInputOuterContainer, SubmitCommentContainerOnCreateIssueForm } from './Styles'
import './Styles.css'
import { StyledAvatar, StyledLabelAvatar, AvatarIsActiveLabelBorder } from '../../../../filters/Styles'
import { Button } from 'semantic-ui-react'
import { submitComment } from '../Utils/utils'

interface Props {
    getAssigneePhoto: any
    getAssigneeName: any 
    project_assignees: Assignee[]
    account_id: string
    toggleIsAddCommentHovered: any
    setCommentState: any
    submitComment: any
}

export default observer(function CommentInput({ 
    getAssigneePhoto, 
    getAssigneeName, 
    project_assignees, 
    account_id, 
    toggleIsAddCommentHovered, 
    setCommentState, 
    submitComment
}: Props) {
    return (
        <CommentInputOuterContainer >
            <h5 style={{cursor: 'not-allowed'}}>Comments</h5>
            <div style={{ display: 'inline-block' }}>
                <StyledAvatar style={{ paddingTop: '12px', cursor: 'not-allowed' }} size="30" round="16px"
                    src={getAssigneePhoto({project_assignees, account_id})}
                    name={getAssigneeName({ project_assignees, account_id })}
                />
            </div>
            <div style={{cursor: 'not-allowed', display: 'inline-block', paddingLeft: '15px', width: '95%'}}>
                <TextArea 
                    onMouseEnter={() => toggleIsAddCommentHovered()} onMouseLeave={() => toggleIsAddCommentHovered()}
                    style={{...{ border: '1px solid white', cursor: 'not-allowed' }, ...{filter: 'brightness(130%)'}}}
                    onChange={(e) => setCommentState(e.target.value)} placeholder="Add a comment..."/>
            </div>
            <SubmitCommentContainerOnCreateIssueForm>
                <Button style={{cursor: 'not-allowed'}} size="tiny" content="Comment" color="blue" onClick={() => submitComment()}/>
            </SubmitCommentContainerOnCreateIssueForm>
        </CommentInputOuterContainer>
)})