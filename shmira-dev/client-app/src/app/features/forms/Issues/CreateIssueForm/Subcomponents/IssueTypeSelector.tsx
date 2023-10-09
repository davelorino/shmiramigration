
import { observer } from 'mobx-react-lite'
import { IssueTypeDropdownSelector } from './Styles'
import './Styles.css'

interface Props {
    issueTypeOptions: any
}

export default observer(function IssueTypeSelector({ issueTypeOptions }: Props) {
    return (
        <div style={{ display: 'inline-block' }}>
            <IssueTypeDropdownSelector downward multiple closeOnChange placeholder="" value="" label="Status" name="status" options={issueTypeOptions}/>
        </div>
    )
})