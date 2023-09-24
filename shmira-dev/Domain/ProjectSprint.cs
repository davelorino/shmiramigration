using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ProjectSprint
    {
        public Guid ProjectId { get; set; }

        public Project Project { get; set; }

        public Guid SprintId { get; set; }

        public Sprint Sprint { get; set; }

    }
}