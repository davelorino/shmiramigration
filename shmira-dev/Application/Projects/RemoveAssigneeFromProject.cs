using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using Application.Sprints;

namespace Application.Projects
{
    public class RemoveAssigneeFromProject
    {
        public class Command : IRequest<Result<Unit>>
        {
        public FrontEndProjectAssignee project_assignee { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
        
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var project = await _context.Projects
                    .Include(a => a.assignees)
                    .ThenInclude(pa => pa.Assignee)
                    .FirstOrDefaultAsync(x => x.Id.ToString().ToLower() == request.project_assignee.ProjectId.ToLower());
                
                var assignee = await _context.Assignees
                    .FirstOrDefaultAsync(x => x.Id.ToString().ToLower() == request.project_assignee.AssigneeId.ToLower());

                var the_project_assignee_to_remove = project.assignees
                    .FirstOrDefault(pa => pa.AssigneeId.ToString() == request.project_assignee.AssigneeId);
                
                var assigned = project.assignees.FirstOrDefault(a => a.AssigneeId.ToString().ToLower() == the_project_assignee_to_remove.AssigneeId.ToString().ToLower());
                
                if(assigned != null){

                    _context.Remove(the_project_assignee_to_remove);

                }
                        
                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem adding assignee to project.");

            }
        }
    }


}