import { useHistory } from 'react-router-dom'
import { Assignee } from '../../models/assignee'
import { Project } from '../../models/project'
import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite'
import { 
    StyledAvatar, 
    AvatarIsActiveBorder, 
    SearchTextInput, 
    OnlyMyIssuesFilter, 
    ClearAllFilters,
    LinkToInsightsPage,
    LinkToInsightsPageText,
    LinkToInsightsIcon
} from './Styles'

export default observer(function ProjectBoardFilters() {
    const { issueStore, commonStore } = useStore();
    const { selectedProject, filterProject, activeUsers, updateActiveUsers } = issueStore;
    const history = useHistory();

    const handleClick = (selectedProject: Project, user: Assignee) => {
        var user_ids_selected: string[] = [];
        selectedProject.assignees.forEach(function (obj) {
            if (obj.id === user.id) {
                user_ids_selected.push(user.id);
            }
        })
        updateActiveUsers(user_ids_selected);
        filterProject();
    }

    function clearAllFilters() {
        issueStore.activeUsers = [];
        issueStore.searchFilter = '';
        issueStore.filterProject();
    }

    function filterOnlyMyIssues() {
        issueStore.activeUsers = [selectedProject!.assignees.find((assignee) => assignee.id_app_user === commonStore.account_id)!.id];
        issueStore.filterProject();
    }

    function handleSearchFilterChange(value: any) {
        issueStore.searchFilter = value
        issueStore.filterProject()
    }

    if (selectedProject == undefined) return null

    return (
        <div style={{ paddingBottom: '20px' }}>
            <SearchTextInput 
                size="mini" 
                icon="search" 
                placeholder="Search for issues..."
                onChange={(e: any) => handleSearchFilterChange(e.target.value)}
            />
            {selectedProject.assignees.map((user, index) => (
                <AvatarIsActiveBorder 
                    isActive={activeUsers.includes(user.id)} 
                    index={index * -index}
                    >
                    <StyledAvatar 
                        value={user.id} 
                        size="30" 
                        src={user.photo ? user.photo.url : ''} 
                        round="20px"
                        onClick={() => handleClick(selectedProject, user)}
                        name={user.first_name.concat(' ', user.second_name)}
                    />
                </AvatarIsActiveBorder>
            ))}

            <OnlyMyIssuesFilter onClick={() => filterOnlyMyIssues()}>
                <p>Only my issues</p>
            </OnlyMyIssuesFilter>
            
            <ClearAllFilters onClick={() => clearAllFilters()}>
                <p>Clear all</p>
            </ClearAllFilters>
            
            <LinkToInsightsPage onClick={() => history.push('/insights')}>
                <LinkToInsightsPageText>
                    Insights
                </LinkToInsightsPageText>
                <LinkToInsightsIcon size="18"/>
            </LinkToInsightsPage>
        </div>
    )
})
