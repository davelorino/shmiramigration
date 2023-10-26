import styled from 'styled-components'

import { color, font, mixin } from '../../../shared/utils/styles'

export const List = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 5px;
    min-height: 400px;
    width: 25%;
    border-radius: 3px;
    background: #1d1f21 !important;
`

export const Title = styled.div`
    padding: 13px 10px 17px;
    text-transform: uppercase;
    color: #a1988c !important;
    ${font.size(12.5)};
    ${mixin.truncateText}
`

export const NoActiveSprintColumn = styled.div`
    font-size: 14px;
    display: flex;
    padding-top: 100px;
    padding-left: 33px;
    padding-right: 20px;
`

export const IssueStatusTitle = styled.div`
    padding: 13px 10px 17px;
    text-transform: uppercase;
    color: #a1988c !important;
    display: inline-block;
    ${font.size(12.5)};
    ${mixin.truncateText}
`

export const IssueCountTitle = styled.div`
    padding: 13px 10px 17px;
    text-transform: uppercase;
    color: #a1988c !important;
    display: inline-block;
    float: right;
    marginRight: 2px;
    ${font.size(12.5)};
    ${mixin.truncateText}
`

export const IssuesCount = styled.span`
    text-transform: lowercase;
    ${font.size(13)};
`

export const Issues = styled.div`
    height: 100%;
    padding: 0 5px;
`
