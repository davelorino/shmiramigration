import React, { useState, useRef } from 'react'
import { Button } from 'semantic-ui-react'
import { Formik, Form, ErrorMessage, Field, useField, useFormikContext } from 'formik'
import { useStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'
import { Sprint } from '../../../models/sprint'
import * as Yup from 'yup'
import { v4 as uuid } from 'uuid'
import { InvisibleTextInput, StyledInput } from '../../../shared/form/Styles'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser'
import '../Styles'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default observer(function AddDatesToSprintForm() {
    const { issueStore, modalStore, mediumModalStore } = useStore()
    const {
        selectedProject,
        createSprint,
        loading,
        selectedSprint,
        updateSprint,
    } = issueStore

    const validationSchema = Yup.object({
        name: Yup.string().required(
            'The issue title is a required MyTextInput.'
        ),
    })

    const initialState = {
        id: '',
        name: '',
        description: '',
        date_start: '',
        date_end: '',
        issues: [],
    }

    var [selectedStartDate, setSelectedStartDate] = useState(new Date());  // Defaults to today's date
    var [selectedEndDateDate, setSelectedEndDate] = useState(new Date());  // Defaults to today's date

    //selectedSprint?.date_start ? selectedStartDate = selectedSprint?.date_start : 

    const [sprint, setSprint] = useState(initialState)
    var [sprint_name, setSprintName] = useState('Give this sprint a name')
    var [sprint_description, setSprintDescription] = useState(
        'Describe the goal for this sprint'
    )
    var [sprint_start_date, setSprintStartDate] = useState('')
    var [sprint_end_date, setSprintEndDate] = useState('')
    var [sprint_title_edit_state, setSprintTitleEditState] = useState(false)
    var [sprint_description_edit_state, setSprintDescriptionEditState] = useState(false)

    function toggleSprintDescriptionEditState() {
        setSprintDescriptionEditState(!sprint_description_edit_state)
    }

    function toggleSprintTitleEditState() {
        setSprintTitleEditState(!sprint_title_edit_state)
    }

    function handleAddSprintDates() {
        var current_sprint: Partial<Sprint> = {...selectedSprint!}

        current_sprint.date_start = displayStartDate().toISOString()
        current_sprint.date_end = displayEndDate().toISOString()
        selectedSprint!.date_start = displayStartDate().toISOString()
        selectedSprint!.date_end = displayEndDate().toISOString()
        var updated_sprint: any = current_sprint
        delete updated_sprint['issues']
        updateSprint(updated_sprint)
        modalStore.closeModal()
    }

    function displayStartDate() {
        if(selectedSprint!.date_start !== '0001-01-01T00:00:00' && (sprint_start_date === '')) {
            console.log("Start 1")
            return new Date(selectedSprint!.date_start)
        }
        if(sprint_start_date === '') {
            console.log('Start 2')
            return new Date()
        }
        console.log('Start 3')
        return new Date(sprint_start_date)
    }

    function displayEndDate() {
        if(selectedSprint!.date_end !== '0001-01-01T00:00:00' && (sprint_end_date === '')) {
            return new Date(selectedSprint!.date_end)
        }
        if(sprint_end_date === '') {
            return new Date()
        }
        return new Date(sprint_end_date)
    }

    function updateSprintDescription(sprint_description: string) {
        var current_sprint: Partial<Sprint> = {
            ...selectedSprint!,
        }

        delete current_sprint['issues']
        current_sprint.description = sprint_description
        var updated_sprint: any = current_sprint
        selectedSprint!.description = sprint_description
        updateSprint(updated_sprint)
    }

    function updateSprintTitle(sprint_title: string) {
        var current_sprint: Partial<Sprint> = {
            ...selectedSprint!,
        }

        delete current_sprint['issues']
        current_sprint.name = sprint_title
        var updated_sprint: any = current_sprint
        selectedSprint!.name = sprint_title
        updateSprint(updated_sprint)
        modalStore.closeModal()
    }



    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={sprint}
                onSubmit={(values) => console.log(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" autoComplete="off">
                        {!sprint_title_edit_state && (
                            <InvisibleTextInput
                                fontsize={18}
                                onClick={() => toggleSprintTitleEditState()}
                            >
                                <h3
                                    style={{
                                        paddingTop: '10px',
                                        paddingBottom: '10px',
                                        paddingLeft: '5px',
                                    }}
                                >
                                    {selectedSprint!.name}
                                </h3>
                            </InvisibleTextInput>
                        )}

                        {sprint_title_edit_state && (
                            <StyledInput
                                defaultValue={selectedSprint!.name}
                                autoFocus
                                onChange={(e: any) =>
                                    setSprintName(e.target.value)
                                }
                                onBlur={() => {
                                    updateSprintTitle(sprint_name)
                                    toggleSprintTitleEditState()
                                }}
                            />
                        )}

                        {!sprint_description_edit_state && (
                            <InvisibleTextInput
                                style={{
                                    border: '1px solid white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    maxHeight: '400px',
                                    minHeight: '100px',
                                }}
                                fontsize={14}
                                onClick={() =>
                                    toggleSprintDescriptionEditState()
                                }
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        paddingTop: '10px',
                                        marginBottom: '20px',
                                        marginLeft: '12px',
                                        marginRight: '12px',
                                        color: 'grey',
                                        fontSize: '10'
                                    }}
                                >
                                    {parse(selectedSprint!.description)}
                                </div>
                            </InvisibleTextInput>
                        )}
                        {sprint_description_edit_state && (
                            <>
                                <ReactQuill
                                    style={{
                                        minHeight: '100px',
                                        maxHeight: '400px',
                                    }}
                                    theme="snow"
                                    defaultValue={selectedSprint!.description}
                                    onChange={setSprintDescription}
                                />

                                <Button
                                    size="mini"
                                    content="Confirm"
                                    style={{marginBottom: '10px'}}
                                    color="blue"
                                    onClick={() => {
                                        updateSprintDescription(
                                            sprint_description
                                        )
                                        toggleSprintDescriptionEditState()
                                    }}
                                />
                            </>
                        )}

                        <div style={{marginTop: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <div style={{display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
                                <label style={{textAlign: 'center'}}>Start Date</label>
                                <DatePicker
                                    selected={displayStartDate()}
                                    onChange={(date: any) => {setSprintStartDate(date)}}
                                    dateFormat="yyyy-MM-dd"
                                />
                                
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <label style={{textAlign: 'center'}}>End Date</label>
                                <DatePicker
                                    selected={displayEndDate()}
                                    onChange={(date: any) => {setSprintEndDate(date)}}
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>
                        
                        </div>
                        <div style={{marginTop: '10px', paddingBottom: '25px'}}>
                            <Button
                                loading={loading}
                                floated="right"
                                size="small"
                                color='blue'
                                //positive
                                onClick={() => {
                                    handleAddSprintDates();
                                    
                                }}
                                content="Confirm"
                            />
                            <Button
                                onClick={() => mediumModalStore.closeMediumModal()}
                                floated="right"
                                size="small"
                                type="button"
                                content="Cancel"
                            />
                        </div>
                        
                        
                    </Form>
                )}
            </Formik>
        </div>
    )
})
