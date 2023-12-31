using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Application.Projects;
using Application.Core;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
   public class ProjectsController : BaseApiController
    {


        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(string id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject(Project project)
        {
            return Ok(await Mediator.Send(new Create.Command{Project = project}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProject(Guid Id, Project project)
        {
            project.Id = Id;
            return Ok(await Mediator.Send(new Edit.Command{Project = project}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(Guid Id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = Id}));
        }

        [HttpPut("add_sprint_to_project")]
        public async Task<IActionResult> AddSprintToProject(FrontEndProjectSprint project_sprint)
        {

            return Ok(await Mediator.Send(new AddSprintToProject.Command{
                project_id = project_sprint.project_id, 
                sprint_name = project_sprint.sprint_name,
                sprint_id = project_sprint.sprint_id
                }));
        }

        [HttpPut("add_assignees_to_project")]
        public async Task<IActionResult> AddAssigneesToProject(List<FrontEndProjectAssignee> project_assignees)
        {

            return Ok(await Mediator.Send(new AddAssigneesToProject.Command{
                project_assignees = project_assignees
                }));
        }

        [HttpPut("add_assignee_to_project")]
        public async Task<IActionResult> AddAssigneeToProject(FrontEndProjectAssignee project_assignee)
        {
            return Ok(await Mediator.Send(new AddAssigneeToProject.Command{
                project_assignee = project_assignee
            }));
        }    

        [HttpPut("remove_assignee_from_project")]
        public async Task<IActionResult> RemoveAssigneeFromProject(FrontEndProjectAssignee project_assignee)
        {
            return Ok(await Mediator.Send(new RemoveAssigneeFromProject.Command{
                project_assignee = project_assignee
            }));
        }    
    }
}