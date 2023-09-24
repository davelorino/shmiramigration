using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;

namespace Application.Sprints
{
  public class Details
    {
        public class Query : IRequest<Sprint>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Sprint>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Sprint> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Sprints.FindAsync(request.Id);
            }
        }
    }
}