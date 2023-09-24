using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserWithIdDto
    {
        public string id { get; set; }
        public string first_name { get; set; }

        public string second_name { get; set; }
        public string email { get; set; }
        public string Token { get; set; }
        public string Image { get; set; }
    }
}