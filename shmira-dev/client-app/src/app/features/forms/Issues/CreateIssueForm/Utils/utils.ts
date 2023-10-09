
import { v4 as uuid } from 'uuid'
import moment from 'moment';
import { Issue } from '../../../../../models/issue'
import { Assignee } from '../../../../../models/assignee'

interface SubmitCommentProps {
    comment_state: string
    assignee_id: string 
    selectedIssue: Issue
    addCommentToIssue: any
}

export function submitComment({comment_state, assignee_id, selectedIssue, addCommentToIssue }: SubmitCommentProps) {
    var comment_to_send = {
        Id: uuid(),
        commenter_assignee_id: assignee_id,
        comment: comment_state,
        comment_posted: moment.tz(moment().subtract(moment.duration('11:00:00')), 'Australia/Sydney').toISOString(true)
    }

    var comment_to_add = {
        ...comment_to_send,
        comment_posted: moment
            .tz(moment(), 'Australia/Sydney')
            .toISOString(true),
    }
    selectedIssue!.comments!.push(comment_to_add)
    addCommentToIssue(selectedIssue!.id, comment_to_send)
}

interface GetAssigneePhotoProps {
    project_assignees: Assignee[]
    account_id: string
}

export function getAssigneePhoto({ project_assignees, account_id }:GetAssigneePhotoProps ) {
    return project_assignees.find((assignee) => assignee.id_app_user === account_id)?.photo?.url
}

interface GetAssigneeNameProps {
    project_assignees: Assignee[]
    account_id: string
}

export function getAssigneeName({ project_assignees, account_id }:GetAssigneeNameProps ) {
    return project_assignees
        .find((assignee) => assignee.id_app_user === account_id)!.first_name
        .concat(' ', project_assignees.find((assignee) => assignee.id_app_user === account_id)!.second_name)
}

export function getAssigneeFullName(project_assignee: Assignee) {
    return project_assignee.first_name.concat(' ', project_assignee.second_name)
}

export function getAssigneePhotoUrl(project_assignee: Assignee, assignees: Assignee[]) {
    return assignees.find((assignee) => assignee.id === project_assignee.id)!.photo?.url
}

export function addReporterToIssue (assignee_id: string, setSelectedReporter: any, selectedReporter: string) {
    var reporter_to_set = ''

    if (selectedReporter !== assignee_id) {
        return setSelectedReporter(assignee_id)
    }
    return 
}

