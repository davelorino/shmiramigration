import { observer } from 'mobx-react-lite'
import { Field } from 'formik'
import { Button } from 'semantic-ui-react'
import { InvisibleTextInput, StyledInput } from '../../../../shared/form/Styles'
import { 
    hoveredStyle,
    baseStyle,
    divStyles
} from './Styles'

interface Props {
    isLogTimeHovered: boolean 
    setIsLogTimeHovered: any 
    log_time_edit_state: boolean 
    setLogTimeEditState: any
    toggleLogTimeEditState: any
    selectedIssueLoggedDays: any
    setSelectedIssueLoggedDays: any
    selectedIssueLoggedHours: any
    setSelectedIssueLoggedHours: any
    selectedIssueLoggedMinutes: any
    setSelectedIssueLoggedMinutes: any
    selectedIssueRemainingDays: any
    setSelectedIssueRemainingDays: any
    selectedIssueRemainingHours: any
    setSelectedIssueRemainingHours: any
    selectedIssueRemainingMinutes: any
    setSelectedIssueRemainingMinutes: any
}

export default observer(function LogTimeInput({ 
    isLogTimeHovered,
    setIsLogTimeHovered,
    log_time_edit_state,
    setLogTimeEditState,
    toggleLogTimeEditState,
    selectedIssueLoggedDays, 
    setSelectedIssueLoggedDays,
    selectedIssueLoggedHours, 
    setSelectedIssueLoggedHours,
    selectedIssueLoggedMinutes, 
    setSelectedIssueLoggedMinutes,
    selectedIssueRemainingDays, 
    setSelectedIssueRemainingDays,
    selectedIssueRemainingHours, 
    setSelectedIssueRemainingHours,
    selectedIssueRemainingMinutes, 
    setSelectedIssueRemainingMinutes
}: Props) {
    return (
        <>
            <div style={{...divStyles, ...baseStyle, ...(isLogTimeHovered ? hoveredStyle : {})}} onMouseEnter={() => setIsLogTimeHovered(true)} onMouseLeave={() => setIsLogTimeHovered(false)}>
                <InvisibleTextInput onClick={toggleLogTimeEditState} fontsize={12} style={{ cursor: 'pointer' }}>
                    <div style={{paddingBottom: '10px'}}>
                        <h5 style={{paddingTop: '10px', marginLeft: '20px', marginBottom: '5px', paddingBottom: '5px'}}>Log Time</h5>
                    
                        <hr style={{border: '1px solid white', width: '100%'}}/>
                        <div style={{marginLeft: '10px', paddingRight: '10px' }}></div>
                    </div>
                </InvisibleTextInput>
            

                {log_time_edit_state && (
                    <div style={{width: '90%', marginLeft: '20px'}}>
                    <h5>Time Spent</h5>
                        <div className="inline fields">
                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Days</label>
                            <Field
                                type="number"
                                style={{width: '60px', height: '30px'}}
                                name="days_logged"
                                onChange={(e: any) =>
                                    setSelectedIssueLoggedDays(
                                        e.target.value
                                    )
                                }
                            />

                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Hours</label>
                            <Field type="number" style={{width: '60px', height: '30px'}} name="hours_logged" onChange={(e: any) => setSelectedIssueLoggedHours(e.target.value)}/>

                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Minutes</label>
                            <Field type="number" style={{width: '60px', height: '30px'}} name="minutes_logged" onChange={(e: any) => setSelectedIssueLoggedMinutes(e.target.value)}/>
                        </div>

                        <h5>Time Remaining</h5>
                        <div className="inline fields">
                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Days</label>
                            <Field type="number" name="days_remaining" onChange={(e: any) => setSelectedIssueRemainingDays(e.target.value)}/>

                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Hours</label>
                            <Field type="number" style={{width: '60px', height: '30px'}} name="hours_remaining" onChange={(e: any) => setSelectedIssueRemainingHours(e.target.value)}/>

                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Minutes</label>
                            <Field type="number" style={{width: '60px', height: '30px'}} name="minutes_remaining" onChange={(e: any) => setSelectedIssueRemainingMinutes(e.target.value)}/>
                        </div>
                        <Button size="mini" content="Save" color="blue" onClick={() => {/* TO DO: updateLoggedTime(); */ toggleLogTimeEditState()}}/>
                        <Button size="mini" content="Cancel" onClick={() => toggleLogTimeEditState()}/>
                    <br />
                    <br />
                </div>
                )}
            </div>
        </>
)})