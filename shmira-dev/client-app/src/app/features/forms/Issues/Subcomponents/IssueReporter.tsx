import { observer } from 'mobx-react-lite'
import { Assignee } from '../../../../models/assignee'
import { IssueReporters } from '../Constants/IssueReporters'
import Icon from '../../../../images/Icon/index'
import { StyledLabelAvatar, AvatarIsActiveLabelBorder } from '../../../filters/Styles'
import { StyledLabel } from '../../Styles'
import { Dropdown } from 'semantic-ui-react'
import { 
    getAssigneeName, 
    getAssigneePhoto
} from '../Utils/utils'
import { 
    hoveredStyle,
    baseStyle,
    divStyles
} from './Styles'
import './Styles.css'

interface Props {
    isReporterHovered: boolean 
    setIsReporterHovered: any 
    selectedReporter: string
    setSelectedReporter: any
    project_assignees: Assignee[]
    account_id: string
    addReporterToIssue: any
    IssueReporters: any 
}

export default observer(function IssueReporter({ 
    isReporterHovered, 
    setIsReporterHovered,
    selectedReporter,
    setSelectedReporter,
    project_assignees, 
    account_id, 
    addReporterToIssue,
    IssueReporters
}: Props) {
    return (
    <>
        <div style={{ marginTop: '20px' }} />
        <div style={{...divStyles, ...baseStyle, ...{position: 'relative', zIndex: '90'}, ...(isReporterHovered ? hoveredStyle : {})}}
            onMouseEnter={() => setIsReporterHovered(true)}
            onMouseLeave={() => setIsReporterHovered(false)}
        >
            <h5 style={{paddingLeft: '20px', paddingTop: '10px'}}>Reporter</h5>
            <hr style={{border: '1px solid white', width: '100%'}}/>
            {selectedReporter !== null && selectedReporter !== undefined && selectedReporter !== '' && (
                <div style={{ marginLeft: '20px' }} >
                    <StyledLabel style={{marginBottom: '2px', marginRight: '4px'}}>
                        <AvatarIsActiveLabelBorder isActive={false} index={1}>
                            <StyledLabelAvatar value={selectedReporter} size="20" round="20px"
                                src={getAssigneePhoto({ project_assignees, id: selectedReporter, account_type: "Assignee Id"})} 
                                name={getAssigneeName({ project_assignees, id: selectedReporter, account_type: "Assignee Id" })} 
                            />
                        </AvatarIsActiveLabelBorder>
                        {getAssigneeName({project_assignees, id: selectedReporter, account_type: "Assignee Id"})}
                        <Icon style={{ marginLeft: '10px' }} type="close" onClick={() => setSelectedReporter('')}/>
                    </StyledLabel>
                </div>
            )}

            <div style={{marginLeft: '20px'}}>
            <Dropdown downward closeOnChange placeholder="Select reporter" value="" style={{zIndex: '99'}} label="Assign" name="reporter"
                options={IssueReporters({ projectReporters: project_assignees, selectedReporter, setSelectedReporter, addReporterToIssue})}
            />
            </div>
        </div>
    </>
)})