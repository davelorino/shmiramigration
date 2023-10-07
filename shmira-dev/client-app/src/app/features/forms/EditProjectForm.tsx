import React, { useState } from 'react'
import { Button, Grid, Dropdown, Input, TextArea } from 'semantic-ui-react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite'
import { Project } from '../../models/project'
import { Assignee } from '../../models/assignee'
import { IssueAssignee } from '../../models/issueAssignee'
import * as Yup from 'yup'
import { HoverDiv } from './Styles'
import { StyledLabelAvatar, AvatarIsActiveLabelBorder } from '../filters/Styles'
import { InvisibleTextInput, StyledInput } from '../../shared/form/Styles'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser'
import Icon from '../../images/Icon/index'
import { StyledLabel } from './Styles'
import 'quill-mention/dist/quill.mention.css'
import 'quill-mention'
import './Styles.css';
import moment from 'moment'

export default observer(function NewUpdateIssueForm() {
    const { issueStore, userStore, commonStore } = useStore()
    const { selectedIssue, selectedProject } = issueStore

    const initialState = selectedIssue ?? {
        id: '',
        name: '',
        description: '',
        description_text: '',
        status: '',
        priority: '',
        days: '',
        hours: '',
        minutes: '',
        original_estimated_duration: '',
        sprint: '',
        assignees: [],
    }

    const validationSchema = Yup.object({
        name: Yup.string().required(
            'The issue title is a required MyTextInput.'
        ),
    })

    var projectAssignees = selectedProject!.assignees

    var [quillDescriptionEditText, setQuillDescriptionEditText] = useState('')
    var [selectedAssignees, setSelectedAssignees] = useState()
    var [selectedReporter, setSelectedReporter] = useState()
    const [issue, setIssue] = useState(initialState)
    var [description_edit_state, setDescriptionEditState] = useState(false)
    var [project_name_state, setProjectNameState] = useState('')
    var [project_name_edit_state, setProjectNameEditState] = useState(false)

    const updateProjectName = () => {
        var current_project: Partial<Project> = {
            ...selectedProject!,
        }

        delete current_project['sprints']
        delete current_project['assignees']

        current_project.name = project_name_state
        var updatedProject: any = current_project
        selectedProject!.name = project_name_state

        /* TODO updateProject(updatedProject); */
    }

    const formatOrganizationtAssignees = (
        // All assignees in the organization
        organizationAssignees: Assignee[], 
        // All assignees currently assigned to the project
        projectAssignees: Assignee[]
        ) => {

        var unassigned_assignees: Assignee[] = []
        var assigned_assignees: string[] = []

        projectAssignees.map((assignee) => {
            assigned_assignees.push(assignee.id)
        })

        organizationAssignees.map((assignee) => {
            if (!assigned_assignees.includes(assignee.id))
                unassigned_assignees.push(assignee)
        })


        return unassigned_assignees!.map((project_assignee, index) => ({
            key: project_assignee.id,
            value: project_assignee.id,
            text: project_assignee.first_name.concat(
                ' ',
                project_assignee.second_name
            ),
            content: (
                <HoverDiv
                    style={{
                        height: 30,
                        fontSize: '12px', 
                        padding: 5
                    }} 
                    onClick={() => addAssigneeToProject(project_assignee.id)}
                >
                    <AvatarIsActiveLabelBorder isActive={false} index={index}>
                        <StyledLabelAvatar
                            value={project_assignee.id}
                            size="20"
                            name={project_assignee.first_name.concat(
                                ' ',
                                project_assignee.second_name
                            )}
                            round="20px"

                            src={project_assignee.photo?.url}
                        />
                    </AvatarIsActiveLabelBorder>
                    {project_assignee.first_name.concat(
                        ' ',
                        project_assignee.second_name
                    )}
                </HoverDiv>
            ),
        }))
    }

    /*
    const removeAssigneeFromProject = (user_id: string) => {

        selectedIssue!.assignees = selectedIssue!.assignees.filter(assignee => assignee.id.toString().toLowerCase() !== user_id);

        selectedIssue!.updated_at = moment.tz(moment(), 'Australia/Sydney').toISOString(true);

        var issue_assignee_to_remove = {
            AssigneeId: user_id,
            IssueId: selectedIssue!.id
        }

        var updated_issue: any = {
            ...selectedIssue!
        } 

        issueStore.removeAssigneeFromIssue(issue_assignee_to_remove);

    }
    */

    var organisationAssignees = issueStore.allAssignees;

    const updateProjectDescription = () => {
        var current_project: Partial<Project> = {
            ...selectedProject!,
        }

        delete current_project['assignees']
        delete current_project['sprints']

        if (quillDescriptionEditText === '') {
            return
        }

        current_project.description = quillDescriptionEditText

        var updatedProject: any = current_project

        selectedProject!.description = quillDescriptionEditText

        /* TODO updateProject(updatedProject); */
    }

    function collectIssueIdsByAssigneeId(assignee_id: string) {

        console.log("Inside the collect function, return assignee id =");
        console.log(assignee_id);
        var issueIds: string[] = [];
      
        issueStore.issuesByDate.forEach(issue => {
            console.log("Issue Ids");
            console.log(issue.id);
            if (issue.assignees.some(assignee => assignee.id === assignee_id)) {
                issueIds.push(issue.id);
                //issue.updated_at = moment.tz(moment(), 'Australia/Sydney').toISOString(true);
            }
        });
        return issueIds;
      }

    function removeAssigneeFromIssues(assignee_id: string) {

        console.log("Assignee Id =");
        console.log(assignee_id);
        var issue_ids_to_remove_assignee_from: string[] = collectIssueIdsByAssigneeId(assignee_id);
        console.log("Issue ids =");
        console.log(issue_ids_to_remove_assignee_from);
        /*
        selectedIssue!.updated_at = moment
            .tz(moment(), 'Australia/Sydney')
            .toISOString(true)
        */
        var issue_assignees_to_remove: IssueAssignee[] = [];
        issue_ids_to_remove_assignee_from.map(issue_id => {
            var issue_assignee_to_remove = {
                AssigneeId: assignee_id,
                IssueId: issue_id
            }
            issue_assignees_to_remove.push(issue_assignee_to_remove);
        })

        console.log("Issue assignees to remove");
        console.log(issue_assignees_to_remove);

        issueStore.removeAssigneeFromIssues(issue_assignees_to_remove);
    }

    const addAssigneeToProject = (assignee_id: string) => {
        var assignee_to_add = issueStore.allAssignees!.find(
            (assignee) =>
                assignee.id.toString().toLowerCase() ===
                assignee_id.toLowerCase()
        )

        selectedProject!.assignees.push(assignee_to_add!)

        var project_assignee_to_add = {
            AssigneeId: assignee_id,
            ProjectId: selectedProject!.id,
        }

        console.log("Project assignee to add")
        console.log(project_assignee_to_add)

        issueStore.addAssigneeToProject(project_assignee_to_add)
    }

    const removeAssigneeFromProject = (assignee_id: string) => {
        var assignee_to_remove = issueStore.allAssignees!.find(
            (assignee) =>
                assignee.id.toString().toLowerCase() ===
                assignee_id.toLowerCase()
        )

        selectedProject!.assignees = selectedProject!.assignees.filter(
            (assignee) => assignee.id !== assignee_to_remove!.id
        )

        var project_assignee_to_remove = {
            AssigneeId: assignee_to_remove!.id,
            ProjectId: selectedProject!.id,
        }

        console.log("Project assignee to add")
        console.log(project_assignee_to_remove)

        issueStore.removeAssigneeFromProject(project_assignee_to_remove)
    }

    /*
    const addAssigneeToProject = (assignee_id: string) => {
        var assignee_to_add = allUsers.find(assignee => assignee.id.toString().toLowerCase() === assignee_id.toLowerCase());
        selectedProject!.assignees.push(assignee_to_add!);
        var project_assignee_to_add = {
            AssigneeId: assignee_id,
            ProjectId: selectedProject!.id
        }
        issueStore.addAssigneesToProject(project_assignee_to_add);
    }   */

    const toggleDescriptionEditor = (description_edit_state: boolean) => {
        setDescriptionEditState(!description_edit_state)
    }

    const toggleProjectNameEditor = (project_name_edit_state: boolean) => {
        setProjectNameEditState(!project_name_edit_state)
    }

    const handleChangeAssignees = (e: any) => {
        setSelectedAssignees(e.target.value)
    }

    const handleChangeReporter = (e: any) => {
        setSelectedReporter(e.target.value)
    }


    return (
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={issue}
                onSubmit={(values) => console.log(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form
                        className="ui form"
                        onSubmit={handleSubmit}
                        autoComplete="off"
                    >
                        <Grid>
                            <Grid.Column width={16}>
                                {!project_name_edit_state && (
                                    <InvisibleTextInput
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                        fontsize={20}
                                        onClick={() =>
                                            toggleProjectNameEditor(
                                                project_name_edit_state
                                            )
                                        }
                                    >
                                        <h1
                                            style={{
                                                paddingTop: '10px',
                                                paddingBottom: '10px',
                                                paddingLeft: '5px',
                                            }}
                                        >
                                            {selectedProject!.name}
                                        </h1>
                                    </InvisibleTextInput>
                                )}
                                {project_name_edit_state && (
                                    <StyledInput
                                        defaultValue={selectedProject!.name}
                                        autoFocus
                                        onChange={(e: any) =>
                                            setProjectNameState(e.target.value)
                                        }
                                        onBlur={() => {
                                            updateProjectName()
                                        }}
                                    />
                                )}

                                <h5
                                    style={{
                                        marginLeft: '10px',
                                        marginBottom: '0px',
                                        paddingBottom: '0px',
                                    }}
                                >
                                    Description
                                </h5>

                                {!description_edit_state && (
                                    <InvisibleTextInput
                                        style={{
                                            marginTop: '4px',
                                            paddingTop: '0px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            maxHeight: '700px',
                                            minHeight: '200px',
                                        }}
                                        fontsize={14}
                                        onClick={() =>
                                            toggleDescriptionEditor(
                                                description_edit_state
                                            )
                                        }
                                    >
                                        <div
                                            style={{
                                                paddingTop: '8px',
                                                marginBottom: '20px',
                                                marginLeft: '12px',
                                                marginRight: '12px',
                                            }}
                                        >
                                            {parse(
                                                selectedProject!.description
                                            )}
                                        </div>
                                    </InvisibleTextInput>
                                )}
                                {description_edit_state && (
                                    <>
                                        <ReactQuill
                                            style={{
                                                minHeight: '300px',
                                                maxHeight: '700px',
                                            }}
                                            theme="snow"
                                            defaultValue={
                                                selectedProject!!.description
                                            }
                                            onChange={
                                                setQuillDescriptionEditText
                                            }
                                        />
                                        <br />
                                        <Button
                                            size="mini"
                                            content="Save"
                                            color="blue"
                                            onClick={() => {
                                                updateProjectDescription()
                                                toggleDescriptionEditor(
                                                    description_edit_state
                                                )
                                            }}
                                        />
                                        <Button
                                            size="mini"
                                            content="Cancel"
                                            onClick={() =>
                                                toggleDescriptionEditor(
                                                    description_edit_state
                                                )
                                            }
                                        />
                                    </>
                                )}

                                <h5>ASSIGNEES</h5>
                                {selectedProject!.assignees.map(
                                    (user, index) => (
                                        <StyledLabel
                                            style={{
                                                marginBottom: '6px',
                                                marginRight: '4px',
                                            }}
                                            onClick={() => {
                                                console.log(user)
                                            }}
                                        >
                                            <AvatarIsActiveLabelBorder
                                                isActive={false}
                                                index={index}
                                            >
                                                <StyledLabelAvatar
                                                    value={user.id}
                                                    size="25"
                                                    name={user.first_name.concat(
                                                        ' ',
                                                        user.second_name
                                                    )}
                                                    round="25px"
                                                    src={
                                                        selectedProject!.assignees.find(
                                                            (assignee) =>
                                                                assignee.id ===
                                                                user.id
                                                        )!.photo?.url
                                                    }
                                                />
                                            </AvatarIsActiveLabelBorder>

                                            {user.first_name.concat(
                                                ' ',
                                                user.second_name
                                            )}

                                            <Icon

                                                style={{ marginLeft: '10px' }}
                                                type="close"
                                                onClick={() => {removeAssigneeFromIssues(user.id); removeAssigneeFromProject(user.id)}}
                                            /> 
                                        </StyledLabel>

                                    )
                                )}

                                <div></div>
                                <Dropdown
                                    multiple
                                    downward
                                    search selection
                                    placeholder="+ Add more"
                                    value=""
                                    label="Assign"
                                    name="assignees"
                                    options={formatOrganizationtAssignees(organisationAssignees!, projectAssignees)}
                                    onChange={(e) => handleChangeAssignees(e)}
                                />
                            </Grid.Column>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
