using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Comment
    {

        public string Id { get; set; }
        public string commenter_assignee_id { get; set; }

        public string comment { get; set; }

        public DateTime comment_posted { get; set; }


    }
}