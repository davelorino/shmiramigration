using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Persistence;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Assignees
{
    public class List
    {
        public class Query : IRequest<List<Assignee>> {}

        public class Handler : IRequestHandler<Query, List<Assignee>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Assignee>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Assignees.ToListAsync();
            }
        }
    }
}
