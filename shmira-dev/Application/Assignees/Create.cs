using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;

namespace Application.Assignees
{
    public class Create
    {
        public class Command : IRequest
        {
            public Assignee Assignee { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Assignees.Add(request.Assignee);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}