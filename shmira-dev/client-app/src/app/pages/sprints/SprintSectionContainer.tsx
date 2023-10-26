import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../stores/store'
import { Sprint } from '../../models/sprint'
import {
    SprintSection,
    SprintSectionIssueContainer,
    Item,
    ItemText,
    SprintSectionSprintName,
    AddDatesContainer,
    StartSprintNotAllowed,
    CompleteSprintContainer,
    SprintActiveOrInactiveStatusLabel,
    StartOrCompleteSprintContainer
} from './Styles'
import Icon from '../../images/Icon'
import BetterIcon from '../../images/BetterIcon'
import SprintDashboardIssue from '../../features/lists/list/Issue/SprintDashboardIssue'
import { Droppable } from 'react-beautiful-dnd'
import SprintForm from '../../features/forms/Sprints/CreateSprintForm'
import AddDatesToSprintForm from '../../features/forms/Sprints/AddDatesToSprintForm'
import ConfirmCloseSprintForm from '../../features/forms/Sprints/ConfirmCloseSprintForm'
import NewCreateIssueForm from '../../features/forms/Issues/CreateIssueForm/NewCreateIssueForm'
import moment from 'moment'

interface Props {
    sprint: Sprint
    index: number
    sprintDetailsExpanded: boolean[]
    setSprintDetailsExpanded: Function
}

export default observer(function SprintSectionContainer({ sprint }: Props) {
    const { smallModalStore, mediumModalStore, modalStore, issueStore } = useStore()
    const { selectSprint, selectedSprint, updateSprint, selectedProject } = issueStore
    var history = useHistory()

    function handleStartSprint() {
        let current_sprint: Partial<Sprint> = {
            ...selectedSprint!,
        }
        delete current_sprint['issues']
        current_sprint.is_active = true
        var updated_sprint: any = current_sprint
        selectedSprint!.is_active = true
        updateSprint(updated_sprint)
        history.push(`/`)
    }

    function a_sprint_is_currently_active() {
        let currently_active = false
        selectedProject!.sprints.map((sprint) => {
            if (sprint.is_active === true) {
                currently_active = true
            }
        })
        return currently_active
    }

    return (
        <Droppable key={sprint.id} droppableId={sprint.id}>
            {(provided) => {
                return (
                    <>
                        <SprintSection sprint_name={sprint.name}>
                            <Item>
                                <BetterIcon bottom="5" left="6" size="24" code="\032C"/>
                                <SprintSectionSprintName>
                                    {sprint.name}

                                    {/* Non-backlog sprint (could be active or inactive) */}
                                    {/* Add dates to sprint */}
                                    {sprint.date_start
                                        .toString()
                                        .substr(0, 4) === '0001' &&
                                        sprint.name !== 'Backlog' && (
                                            <>
                                                {/* Add Dates Pencil Icon */}
                                                <BetterIcon style={{bottom: '0px', position: 'relative'}} top="0" size="11" code="\1F58B" /* Pencil Icon *//>
                                                <AddDatesContainer onClick={() => {issueStore.selectSprint(sprint.id)
                                                        mediumModalStore.openMediumModal(
                                                            <AddDatesToSprintForm />
                                                        )}}
                                                >
                                                    Add dates
                                                </AddDatesContainer>

                                                {/* Start sprint if there is no currently active sprint */}
                                                {a_sprint_is_currently_active() ===
                                                    false && (
                                                    <StartSprintNotAllowed>
                                                        Start sprint
                                                    </StartSprintNotAllowed>
                                                )}

                                                {/* Complete sprint button (renders only if sprint is active) */}
                                                {sprint.is_active === true && (
                                                    <CompleteSprintContainer onClick={() => smallModalStore.openSmallModal(<ConfirmCloseSprintForm />)}>
                                                        Complete sprint
                                                    </CompleteSprintContainer>
                                                )}
                                            </>
                                        )}

                                    {/* Display sprint dates (if dates have been added) */}
                                    {sprint.date_start
                                        .toString()
                                        .substr(0, 4) !== '0001' &&
                                        sprint.name !== 'Backlog' && (
                                            <>
                                                {/* Add Dates Pencil Icon */}
                                                <BetterIcon style={{bottom: '0px', position: 'relative'}} top="0" size="11" code="\1F58B" /* Pencil icon *//>
                                                <AddDatesContainer onClick={() => {issueStore.selectSprint(sprint.id)
                                                        mediumModalStore.openMediumModal(<AddDatesToSprintForm />)}}
                                                >
                                                    {/* Date Start */}
                                                    {moment(sprint.date_start.substr(0,10)).format('MMM Do')}{' '}-
                                                    {/* Date End */}
                                                    {' '.concat(moment(sprint.date_end.substr(0,10)).format('MMM Do'))}
                                                </AddDatesContainer>

                                                {/* Specify if sprint is active or inactive with a label */}
                                                {sprint.is_active === true && (
                                                    <SprintActiveOrInactiveStatusLabel>
                                                        Active Sprint
                                                    </SprintActiveOrInactiveStatusLabel>
                                                )}
                                                {!sprint.is_active === true && (
                                                    <SprintActiveOrInactiveStatusLabel>
                                                        Inactive Sprint
                                                    </SprintActiveOrInactiveStatusLabel>
                                                )}
                                                {a_sprint_is_currently_active() ===
                                                    false && (
                                                    <StartOrCompleteSprintContainer onClick={() => {selectSprint(sprint.id); handleStartSprint()}}>
                                                        Start sprint
                                                    </StartOrCompleteSprintContainer>
                                                )}
                                                {sprint.is_active === true && (
                                                    <StartOrCompleteSprintContainer onClick={() => {selectSprint(sprint.id); smallModalStore.openSmallModal(<ConfirmCloseSprintForm />)}}>
                                                        Complete sprint
                                                    </StartOrCompleteSprintContainer>
                                                )}
                                            </>
                                        )}

                                    {/* Backlog container */}
                                    {sprint.name === 'Backlog' && (
                                        <>
                                            <StartOrCompleteSprintContainer onClick={() => smallModalStore.openSmallModal(<SprintForm />)}>
                                                Create sprint
                                            </StartOrCompleteSprintContainer>
                                        </>
                                    )}
                                </SprintSectionSprintName>
                            </Item>

                            {
                                <SprintSectionIssueContainer
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{top: '0', marginBottom: '0', marginLeft: '22px'}}
                                >
                                    {/* Render Issues */}
                                    {sprint.issues
                                        .sort((a, b) => a.sort_order - b.sort_order)
                                        .map((issue, index) => (
                                            <SprintDashboardIssue issue={issue} key={issue.id} index={index}/>
                                        ))}
                                    {provided.placeholder}
                                </SprintSectionIssueContainer>
                            }
                            <div></div>
                            <Item onClick={() => modalStore.openModal(<NewCreateIssueForm />)}>
                                <Icon left={'11'} top={'0'} type="plus" size="14" />
                                <ItemText style={{paddingLeft: '36px', bottom: '4px'}}>
                                    Create issue
                                </ItemText>
                            </Item>
                        </SprintSection>
                        <br />
                    </>
                )
            }}
        </Droppable>
    )
})
