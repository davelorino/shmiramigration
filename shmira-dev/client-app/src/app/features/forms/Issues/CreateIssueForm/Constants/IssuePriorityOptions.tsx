import IssuePriorityIcon from '../../../../../images/IssuePriorityIcon'
import { StyledLabel } from '../../../Styles'


interface Props {
    setSelectedIssuePriority: any
}

export const IssuePriorityOptions = ( { setSelectedIssuePriority }: Props ) => {
    return(
        [
            {
                key: '0',
                value: 'Low',
                text: 'Low',
                content: (
                    <StyledLabel onClick={() => {setSelectedIssuePriority('Low')}}>
                        <IssuePriorityIcon priority="Low" />
                        <p className='priority_text'>
                            Low
                        </p>
                    </StyledLabel>
                ),
            },
            {
                key: '1',
                value: 'Medium',
                text: 'Medium',
                content: (
                    <StyledLabel onClick={() => {setSelectedIssuePriority('Medium')}}>
                        <IssuePriorityIcon priority="Medium" />
                        <p className='priority_text'>
                            Medium
                        </p>
                    </StyledLabel>
                ),
            },
            {
                key: '2',
                value: 'High',
                text: 'High',
                content: (
                    <StyledLabel onClick={() => {setSelectedIssuePriority('High')}}>
                        <IssuePriorityIcon priority="High" />
                        <p className='priority_text'>
                            High
                        </p>
                    </StyledLabel>
                ),
            },
        ]
    )}