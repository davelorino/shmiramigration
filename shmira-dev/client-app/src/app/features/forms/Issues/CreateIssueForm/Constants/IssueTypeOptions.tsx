
import { HoverDiv } from '../../../Styles'
import IssueTypeIcon from '../../../../../images/IssueTypeIcon'
import './Styles.css'

interface Props {
    setSelectedIssueType: any
    selectedIssueType: any
}

export const IssueTypeOptions = ( { setSelectedIssueType, selectedIssueType}: Props ) => {
    return(
    [
    {
        key: '0',
        value: 'Story',
        text: 'Story',
        content: (
            <HoverDiv className='assignee_reporter_label' onClick={() => setSelectedIssueType('Story')}>
                <IssueTypeIcon color="#65BA43 !important" type="story" size={14}/>
                <div className='issue_icon'>Story</div>
            </HoverDiv>
        ),
    },
    {
        key: '1',
        value: 'Bug',
        text: 'Bug',
        content: (
            <HoverDiv className='assignee_reporter_label' onClick={() => setSelectedIssueType('Bug')}>
                <IssueTypeIcon color="#E44D42" type="bug" size={14} />
                <div className='issue_icon'>
                    Bug
                </div>
            </HoverDiv>
        ),
    },
    {
        key: '2',
        value: 'Task',
        text: 'Task',
        content: (
            <HoverDiv className='assignee_reporter_label' onClick={() => setSelectedIssueType('Task')}>
                <IssueTypeIcon color="#4FADE6 !important" type="task" size={14}/>
                <div className='issue_icon'>
                    Task
                </div>
            </HoverDiv>
        ),
    },
]
    )}