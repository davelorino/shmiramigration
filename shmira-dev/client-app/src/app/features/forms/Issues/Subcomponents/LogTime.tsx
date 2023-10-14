import { observer } from 'mobx-react-lite'
import { Field } from 'formik'
import { Button } from 'semantic-ui-react'
import { Issue } from '../../../../models/issue'
import { InvisibleTextInput, StyledInput } from '../../../../shared/form/Styles'
import UpdateIssueFormTrackingWidget from '../Subcomponents/UpdateIssueFormTimeTrackingWidget'
import { 
    hoveredStyle,
    baseStyle,
    divStyles
} from './Styles'
import { useStore } from '../../../../stores/store'

interface CreateIssueProps {
    mode: 'create'
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

interface UpdateIssueProps {
    mode: 'update'
    selectedIssue: Issue,
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
    updateLoggedTime: any
}

type LogTimeProps = CreateIssueProps | UpdateIssueProps;

export default observer(function LogTimeInput( props: LogTimeProps ) {
    const { issueStore } = useStore()
    if(props.mode === 'create'){
        return (
            <>
                <div style={{...divStyles, ...baseStyle, ...(props.isLogTimeHovered ? hoveredStyle : {})}} onMouseEnter={() => props.setIsLogTimeHovered(true)} onMouseLeave={() => props.setIsLogTimeHovered(false)}>
                    <InvisibleTextInput onClick={props.toggleLogTimeEditState} fontsize={12} style={{ cursor: 'pointer' }}>
                        <div style={{paddingBottom: '10px'}}>
                            <h5 style={{paddingTop: '10px', marginLeft: '20px', marginBottom: '5px', paddingBottom: '5px'}}>Log Time</h5>
                        
                            <hr style={{border: '1px solid white', width: '100%'}}/>
                            <div style={{marginLeft: '10px', paddingRight: '10px' }}></div>
                        </div>
                    </InvisibleTextInput>
                
    
                    {props.log_time_edit_state && (
                        <div style={{width: '90%', marginLeft: '20px'}}>
                        <h5>Time Spent</h5>
                            <div className="inline fields">
                                <label style={{marginLeft: '7px', fontSize: '11px'}}>Days</label>
                                <Field type="number" style={{width: '60px', height: '30px'}} name="days_logged" onChange={(e: any) => props.setSelectedIssueLoggedDays(e.target.value)}/>
    
                                <label style={{marginLeft: '7px', fontSize: '11px'}}>Hours</label>
                                <Field type="number" style={{width: '60px', height: '30px'}} name="hours_logged" onChange={(e: any) => props.setSelectedIssueLoggedHours(e.target.value)}/>
    
                                <label style={{marginLeft: '7px', fontSize: '11px'}}>Minutes</label>
                                <Field type="number" style={{width: '60px', height: '30px'}} name="minutes_logged" onChange={(e: any) => props.setSelectedIssueLoggedMinutes(e.target.value)}/>
                            </div>
    
                            <h5>Time Remaining</h5>
                            <div className="inline fields">
                                <label style={{marginLeft: '7px', fontSize: '11px'}}>Days</label>
                                <Field type="number" name="days_remaining" onChange={(e: any) => props.setSelectedIssueRemainingDays(e.target.value)}/>
    
                                <label style={{marginLeft: '7px', fontSize: '11px'}}>Hours</label>
                                <Field type="number" style={{width: '60px', height: '30px'}} name="hours_remaining" onChange={(e: any) => props.setSelectedIssueRemainingHours(e.target.value)}/>
    
                                <label style={{marginLeft: '7px', fontSize: '11px'}}>Minutes</label>
                                <Field type="number" style={{width: '60px', height: '30px'}} name="minutes_remaining" onChange={(e: any) => props.setSelectedIssueRemainingMinutes(e.target.value)}/>
                            </div>
                            <Button size="mini" content="Save" color="blue" onClick={() => {/* TO DO: updateLoggedTime(); */ props.toggleLogTimeEditState()}}/>
                            <Button size="mini" content="Cancel" onClick={() => props.toggleLogTimeEditState()}/>
                        <br />
                        <br />
                    </div>
                    )}
                </div>
            </>
        )    
    }
    if(props.mode === 'update'){
        return (
            <>
            <div style={{...{zIndex: '1'}, ...divStyles, ...baseStyle, ...(props.isLogTimeHovered ? hoveredStyle : {})}} onMouseEnter={() => props.setIsLogTimeHovered(true)} onMouseLeave={() => props.setIsLogTimeHovered(false)}>
                <InvisibleTextInput onClick={props.toggleLogTimeEditState} fontsize={12} style={{ cursor: 'pointer' }}>
                    <div style={{paddingBottom: '0px'}}>
                    <div style={{marginTop: '5px', marginBottom: '5px', display: 'flex', alignItems: 'center', height: '100%'}}>
                    <h4 style={{ paddingLeft: '20px'}}>Log Time</h4>
                    </div> 
                        <hr style={{border: '1px solid white', width: '100%'}}/>
                        <div style={{marginLeft: '10px', paddingRight: '10px' }}><UpdateIssueFormTrackingWidget /></div>
                    </div>
                </InvisibleTextInput>

                {/* LOG TIME */}
                {props.log_time_edit_state && (
                    <div style={{width: '90%', marginLeft: '20px'}}>
                        <h5>Time Spent</h5>
                        <div className="inline fields">
                            <label style={{fontSize: '11px'}}>Days</label>
                            <Field style={{width: '60px', height: '30px'}} type="number" name="days_logged " onChange={(e: any) => props.setSelectedIssueLoggedDays(e.target.value)}/>
                        <label style={{marginLeft: '7px', fontSize: '11px'}}>Hours</label>
                            <Field type="number" style={{width: '60px', height: '30px'}} name="hours_logged" onChange={(e: any) => props.setSelectedIssueLoggedHours(e.target.value)}/>

                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Minutes</label>
                            <Field type="number" style={{width: '60px', height: '30px'}} name="minutes_logged" onChange={(e: any) => props.setSelectedIssueLoggedMinutes(e.target.value)}/>
                        </div>

                        <h5>Time Remaining</h5>
                        <div className="inline fields">
                            <label style={{fontSize: '11px'}}>Days</label>
                            <Field type="number" style={{width: '60px', height: '30px'}} name="days_remaining" onChange={(e: any) => props.setSelectedIssueRemainingDays(e.target.value)}/>

                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Hours</label>
                            <Field type="number" style={{width: '60px', height: '30px'}} name="hours_remaining" onChange={(e: any) => props.setSelectedIssueRemainingHours(e.target.value)}/>

                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Minutes</label>
                            <Field type="number" style={{width: '60px', height: '30px'}} name="minutes_remaining" onChange={(e: any) => props.setSelectedIssueRemainingMinutes(e.target.value)}/>
                        </div>

                        <Button size="mini" content="Save" color="blue"
                            onClick={() => { 
                                props.updateLoggedTime(
                                    props.selectedIssue!,
                                    props.selectedIssueLoggedDays,
                                    props.selectedIssueLoggedHours,
                                    props.selectedIssueLoggedMinutes,
                                    props.selectedIssueRemainingDays,
                                    props.selectedIssueRemainingHours,
                                    props.selectedIssueRemainingMinutes,
                                    props.setSelectedIssueLoggedMinutes,
                                    props.setSelectedIssueLoggedHours, 
                                    props.setSelectedIssueLoggedDays, 
                                    props.setSelectedIssueRemainingMinutes,
                                    props.setSelectedIssueRemainingHours, 
                                    props.setSelectedIssueRemainingDays,
                                    issueStore.updateIssue,
                                    props.toggleLogTimeEditState
                                ); 
                                props.toggleLogTimeEditState()}}
                        />

                        <Button size="mini" content="Cancel" onClick={() => props.toggleLogTimeEditState()}/>

                        <br />
                        <br />
                    </div>
                )}
            </div>
            </>
        )
    }    
    return <></>
})