import { observer } from 'mobx-react-lite'
import { Assignee } from '../../../../models/assignee'
import { Issue } from '../../../../models/issue'
import { Project } from '../../../../models/project'
import { Comment } from '../../../../models/comment'
import { TextArea } from 'semantic-ui-react'
import { underlineStyle, CommentInputOuterContainer, SubmitCommentContainerOnCreateIssueForm } from './Styles'
import './Styles.css'
import { StyledAvatar } from '../../../filters/Styles'
import { Button } from 'semantic-ui-react'
import moment from 'moment'

interface CreateIssueProps {
    mode: 'create'
    getAssigneePhoto: any
    getAssigneeName: any 
    project_assignees: Assignee[]
    account_id: string
    toggleIsAddCommentHovered: any
    setCommentState: any
    submitComment: any
}

interface UpdateIssueProps {
    mode: 'update'
    getAssigneePhoto: any
    getAssigneeName: any 
    selectedIssue: Issue
    selectedProject: Project
    project_assignees: Assignee[]
    account_id: string
    assignee_id: string
    toggleIsAddCommentHovered: any
    comment_state: string
    setCommentState: (comment_state: string) => void
    submitComment: (params: 
        {
            comment_state: string, 
            assignee_id: string, 
            selectedIssue: Issue, 
            addCommentToIssue: (issue_id: string, comment_to_send: Comment) => void
        }
    ) => void
    addCommentToIssue: (issue_id: string, comment_to_send: Comment) => Promise<void>
    commentHoveredIndex: any 
    setCommentHoveredIndex: any
    isCommenterNameHoveredIndex: any
    setIsCommenterNameHoveredIndex: any
}

type CommentProps = CreateIssueProps | UpdateIssueProps;

export default observer(function CommentInput( props: CommentProps ) {
    if(props.mode === 'create'){
        return (
            <CommentInputOuterContainer >
                <h5 style={{cursor: 'not-allowed'}}>Comments</h5>
                <div style={{ display: 'inline-block' }}>
                    <StyledAvatar style={{ paddingTop: '12px', cursor: 'not-allowed' }} size="30" round="16px"
                        src={props.getAssigneePhoto({project_assignees: props.project_assignees, id: props.account_id, account_type: ""})}
                        name={props.getAssigneeName({project_assignees: props.project_assignees, id: props.account_id, account_type: "" })}
                    />
                    
                </div>
                <div style={{cursor: 'not-allowed', display: 'inline-block', paddingLeft: '15px', width: '95%'}}>
                    <TextArea 
                        onMouseEnter={() => props.toggleIsAddCommentHovered()} onMouseLeave={() => props.toggleIsAddCommentHovered()}
                        style={{...{ border: '1px solid white', cursor: 'not-allowed' }, ...{filter: 'brightness(130%)'}}}
                        onChange={(e) => props.setCommentState(e.target.value)} placeholder="Add a comment..."/>
                </div>
                <SubmitCommentContainerOnCreateIssueForm>
                    <Button style={{cursor: 'not-allowed'}} size="tiny" content="Comment" color="blue" onClick={() => props.submitComment()}/>
                </SubmitCommentContainerOnCreateIssueForm>
            </CommentInputOuterContainer>
        )
    }
    if(props.mode === 'update'){
        return(
        <>
            <h5>Comments</h5>
            {props.selectedIssue!.comments!
            .slice()
            .sort((a, b) => moment(a.comment_posted).valueOf() - moment(b.comment_posted).valueOf())
            .map(
                (comment, index) => (
                    <div key={index} className={props.commentHoveredIndex === index ? 'comment-hovered' : 'comment-default'} onMouseEnter={() => props.setCommentHoveredIndex(index)} onMouseLeave={() => props.setCommentHoveredIndex(99)}>
                        <div style={{verticalAlign: 'top', display: 'inline-block', paddingLeft: '10px', paddingTop: '10px'}}>
                            <StyledAvatar size="30" round="16px"
                                src={props.selectedProject!.assignees.find((assignee) => assignee.id === comment.commenter_assignee_id)!.photo?.url}
                                name={props.selectedProject!.assignees
                                    .find((assignee) => assignee.id === comment.commenter_assignee_id)!.first_name
                                    .concat(' ', props.selectedProject!.assignees.find((assignee) => assignee.id === comment.commenter_assignee_id)!.second_name)}
                            />
                        </div>
                        <div style={{paddingLeft: '20px', display: 'inline-block', paddingTop: '10px', width: '90%'}}>
                            <h5 
                                onMouseEnter={() => props.setIsCommenterNameHoveredIndex(index)} 
                                onMouseLeave={() => props.setIsCommenterNameHoveredIndex(99)} 
                                style={{...{cursor: 'pointer', marginBottom: '5px'}, ...(props.isCommenterNameHoveredIndex === index ? underlineStyle : {})}}>
                                {props.selectedProject!.assignees.find((assignee) => assignee.id === comment.commenter_assignee_id)!
                                    .first_name.concat(' ', props.selectedProject!.assignees.find((assignee) => assignee.id === comment.commenter_assignee_id)!.second_name
                                )}
                            </h5>
                            <div style={{marginBottom: '5px'}}>
                                <p>{comment.comment}</p>
                            </div>
                            <div style={{marginBottom: '10px'}}>
                                <p style={{fontSize: '10px', color: 'grey'}}>{moment(comment.comment_posted).format('DD MMM YYYY HH:mm')}</p>
                            </div>
                        </div>
                    </div>
                )
            )}
            <CommentInputOuterContainer >
                <div style={{ display: 'inline-block' }}>
                    <StyledAvatar style={{ paddingTop: '12px'}} size="30" round="16px"
                        src={props.getAssigneePhoto({project_assignees: props.project_assignees, id: props.account_id, account_type: ""})}
                        name={props.getAssigneeName({project_assignees: props.project_assignees, id: props.account_id, account_type: "" })}
                    />
                    
                </div>
                <div style={{ display: 'inline-block', paddingLeft: '15px', width: '95%'}}>
                    <TextArea 
                        onMouseEnter={() => props.toggleIsAddCommentHovered()} onMouseLeave={() => props.toggleIsAddCommentHovered()}
                        style={{...{ border: '1px solid white' }, ...{filter: 'brightness(130%)'}}}
                        onChange={(e) => props.setCommentState(e.target.value)} placeholder="Add a comment..."/>
                </div>
                <SubmitCommentContainerOnCreateIssueForm>
                    <Button size="tiny" content="Comment" color="blue" 
                    onClick={() => 
                        props.submitComment(
                            {
                                comment_state: props.comment_state, 
                                assignee_id: props.assignee_id,
                                selectedIssue: props.selectedIssue!, 
                                addCommentToIssue: props.addCommentToIssue
                            }
                        )}/>
                </SubmitCommentContainerOnCreateIssueForm>
            </CommentInputOuterContainer>
        </>
        )
    }
    return <></>
    })