// Functions for parsing, adding and subtracting logged, worked and estimated timespans

import { Issue } from "../../../../models/issue"
import moment from 'moment'

export function calculateIssueTimespan(
    input_days: any,
    input_hours: any,
    input_minutes: any
) {
    var days, hours, minutes
    input_days === 0 ? (days = 0) : (days = input_days)
    input_hours === 0 ? (hours = 0) : (hours = input_hours)
    input_minutes === 0 ? (minutes = 0) : (minutes = input_minutes)

    if (minutes >= 60) {
        var minutes_to_hours = Math.floor(minutes / 60)
        minutes = minutes % 60
        hours = parseInt(hours) + minutes_to_hours
    }

    if (hours >= 24) {
        var hours_to_days = Math.floor(hours / 24)
        hours = hours % 24
        days = parseInt(days) + hours_to_days
    }

    let estimated_duration = days + '.' + hours + ':' + minutes + ':' + '00'
    return estimated_duration
}



export const extractTimespanObject = (timespan: string) => {
    var days = timespan.substring(0, timespan.indexOf('.'))

    if (days === null || days === '') {
        days = '0'
    }

    var hours = timespan.substring(
        timespan.indexOf('.') + 1,
        timespan.indexOf(':')
    )

    if (hours === null) {
        hours = '0'
    }

    var timespan_minus_days_and_hours = timespan.substring(
        timespan.indexOf(':') + 1,
        timespan.length
    )

    var minutes = timespan_minus_days_and_hours.substring(
        0,
        timespan_minus_days_and_hours.indexOf(':')
    )

    if (minutes === null) {
        minutes = '0'
    }

    var time_span: any = {
        days: days,
        hours: hours,
        minutes: minutes,
    }

    return time_span
}

export const addTimeSpans = (first_time_span: any, second_time_span: any) => {
    var first_timespan_obj = extractTimespanObject(first_time_span)
    var second_timespan_obj = extractTimespanObject(second_time_span)

    var total_days =
        parseInt(first_timespan_obj.days) +
        parseInt(second_timespan_obj.days)

    var total_hours =
        parseInt(first_timespan_obj.hours) +
        parseInt(second_timespan_obj.hours)

    var total_minutes =
        parseInt(first_timespan_obj.minutes) +
        parseInt(second_timespan_obj.minutes)

    if (total_minutes >= 60) {
        var minutes_to_hours = Math.floor(total_minutes / 60)
        total_minutes = total_minutes % 60
        total_hours = total_hours + minutes_to_hours
    }

    if (total_hours >= 24) {
        var hours_to_days = Math.floor(total_hours / 24)
        total_hours = total_hours % 24
        total_days = total_days + hours_to_days
    }

    let finalTimespan =
        total_days + '.' + total_hours + ':' + total_minutes + ':' + '00'

    return finalTimespan
}

export const resetTimeState = (
    setSelectedIssueLoggedMinutes: any,
    setSelectedIssueLoggedHours: any,
    setSelectedIssueLoggedDays: any,
    setSelectedIssueRemainingMinutes: any,
    setSelectedIssueRemainingHours: any,
    setSelectedIssueRemainingDays: any
) => {
    setSelectedIssueLoggedMinutes(0)
    setSelectedIssueLoggedHours(0)
    setSelectedIssueLoggedDays(0)
    setSelectedIssueRemainingMinutes(0)
    setSelectedIssueRemainingHours(0)
    setSelectedIssueRemainingDays(0)
}

export const updateLoggedTime = (
    selectedIssue: Issue,
    selectedIssueLoggedDays: any,
    selectedIssueLoggedHours: any,
    selectedIssueLoggedMinutes: any,
    selectedIssueRemainingDays: any,
    selectedIssueRemainingHours: any,
    selectedIssueRemainingMinutes: any,
    setSelectedIssueLoggedMinutes: any,
    setSelectedIssueLoggedHours: any, 
    setSelectedIssueLoggedDays: any, 
    setSelectedIssueRemainingMinutes: any,
    setSelectedIssueRemainingHours: any, 
    setSelectedIssueRemainingDays: any,
    updateIssue: (updated_issue: Issue) => Partial<void>,
    toggleLogTimeEditState: any
    ) => {
    var current_issue: Partial<Issue> = {
        ...selectedIssue!,
    }

    delete current_issue['assignees']
    delete current_issue['comments']

    var time_logged = calculateIssueTimespan(
        selectedIssueLoggedDays,
        selectedIssueLoggedHours,
        selectedIssueLoggedMinutes
    )

    current_issue.time_logged = addTimeSpans(
        time_logged,
        current_issue.time_logged
    )

    var time_remaining = calculateIssueTimespan(
        selectedIssueRemainingDays,
        selectedIssueRemainingHours,
        selectedIssueRemainingMinutes
    )

    console.log('Time remaining =')
    current_issue.time_remaining = time_remaining

    var updatedIssue: any = current_issue

    selectedIssue!.time_logged = current_issue.time_logged
    selectedIssue!.time_remaining = current_issue.time_remaining
    selectedIssue!.updated_at = moment
        .tz(moment(), 'Australia/Sydney')
        .toISOString(true)

    resetTimeState(
        setSelectedIssueLoggedMinutes,
        setSelectedIssueLoggedHours,
        setSelectedIssueLoggedDays,
        setSelectedIssueRemainingMinutes,
        setSelectedIssueRemainingHours,
        setSelectedIssueRemainingDays
    )

    updateIssue(updatedIssue)

    toggleLogTimeEditState()
}

