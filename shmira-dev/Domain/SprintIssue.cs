using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Domain
{
    public class SprintIssue
    {
        public Guid SprintId { get; set; }

        public Sprint Sprint { get; set; }

        public Guid IssueId { get; set; }

        public Issue Issue { get; set; }

        public bool isActive { get; set; }

    }
}