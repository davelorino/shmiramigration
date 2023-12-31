using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Persistence;
using MediatR;
using AutoMapper;
using Application.Core;
using AutoMapper.QueryableExtensions;
using Application.Assignees;
using Microsoft.EntityFrameworkCore;

namespace Application.Projects
{
    public class Create
    {
        public class Command : IRequest
        {
            public Project Project { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
        
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var project = request.Project;

                _context.Projects.Add(project);

                await _context.SaveChangesAsync();

                return Unit.Value;
                
            }
        }
    }
}