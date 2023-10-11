
import { v4 as uuid } from 'uuid'
import moment from 'moment';
import { Issue } from '../../../../models/issue'
import { Assignee } from '../../../../models/assignee'

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
    id: string
    account_type: string
}

export function getAssigneePhoto({ project_assignees, id, account_type }:GetAssigneePhotoProps ) {
    if(account_type === "Assignee Id") {
        return project_assignees.find((assignee) => assignee.id === id)!.photo?.url
    } 
    return project_assignees.find((assignee) => assignee.id_app_user === id)!.photo?.url
}

interface GetAssigneeNameProps {
    project_assignees: Assignee[]
    id: string
    account_type: string | undefined
}

export function getAssigneeName({ project_assignees, id, account_type = "" }:GetAssigneeNameProps ) {
    if(account_type === "Assignee Id"){
        return project_assignees
            .find((assignee) => assignee.id === id)!.first_name
            .concat(' ', project_assignees.find((assignee) => assignee.id === id)!.second_name)
    }

    return project_assignees
        .find((assignee) => assignee.id_app_user === id)!.first_name
        .concat(' ', project_assignees.find((assignee) => assignee.id_app_user === id)!.second_name)
    
}

export function getAssigneeFullName(project_assignee: Assignee) {
    return project_assignee.first_name.concat(' ', project_assignee.second_name)
}

export function getAssigneePhotoUrl(project_assignee: Assignee, assignees: Assignee[]) {
    return assignees.find((assignee) => assignee.id === project_assignee.id)!.photo?.url
}

export function addReporterToIssue (assignee_id: string, selectedReporter: string, setSelectedReporter: any) {
    if(selectedReporter !== assignee_id){
        setSelectedReporter(assignee_id)
    }
}


export const addAssigneeToIssue = (assignee_id: string, selectedAssignees: string[], setSelectedAssignees: any) => {
    var assignees_to_set: string[] = []

    if (selectedAssignees.length > 0) {
        selectedAssignees.map((assignee_id) => {
            assignees_to_set.push(assignee_id)
        })
    }

    if (!assignees_to_set.includes(assignee_id)) {
        assignees_to_set.push(assignee_id)
    }
    setSelectedAssignees(assignees_to_set)
}


export const removeAssigneeFromIssue = (assignee_id: string, selectedAssignees: string[], setSelectedAssignees: any) => {
    var assignees_to_set: string[] = []

    selectedAssignees.map((current_assignee_id) => {
        if (current_assignee_id !== assignee_id) {
            assignees_to_set.push(current_assignee_id)
        }
    })
    setSelectedAssignees(assignees_to_set)
}


export const changeIssueType = (
    selectedIssue: Issue | undefined, 
    issue_type: string,
    updateIssue: any
    ) => {
    var current_issue: Partial<Issue> = {
        ...selectedIssue!,
    }

    delete current_issue['assignees']

    current_issue.issue_type = issue_type

    var updatedIssue: any = current_issue

    selectedIssue!.issue_type = issue_type

    selectedIssue!.updated_at = moment
        .tz(moment(), 'Australia/Sydney')
        .toISOString(true)
    console.log("Issue to update:")
    console.log(updatedIssue)
    updateIssue(updatedIssue)
}

