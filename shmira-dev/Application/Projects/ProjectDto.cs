using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Sprints;
using Application.Assignees;

namespace Application.Projects
{
    public class ProjectDto
    {
        public string Id { get; set; }

        public string name { get; set; }

        public string description { get; set; }

        public List<SprintDto> sprints { get; set; } = new List<SprintDto>();

        public List<AssigneeDto> assignees { get; set; } = new List<AssigneeDto>();

        public DateTime created_at { get; set; }

        public DateTime updated_at { get; set; }

    }
}