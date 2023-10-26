using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Application.Projects;
using Application.Sprints;
using Application.Issues;
using Application.Assignees;
using Application.Core;
using AutoMapper.QueryableExtensions;

namespace Application.Projects
{
    public class List
    {
        public class Query : IRequest<Result<List<ProjectDto>>> {}

        public class Handler : IRequestHandler<Query, Result<List<ProjectDto>>>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<ProjectDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                var projects = await _context.Projects
                    .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken); 

                
                return Result<List<ProjectDto>>.Success(projects);
            }
        }
    }
}
