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

namespace Application.Issues
{
    public class RemoveAssigneeFromIssues
    {
        public class Command : IRequest<Result<Unit>>
        {
        public List<FrontendIssueAssignees> issue_assignees { get; set; }

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
                        
                foreach(var issue_assignee in request.issue_assignees){
                    
                     var issue = await _context.Issues
                    .Include(a => a.assignees)
                    .ThenInclude(ia => ia.Assignee) // Include nested navigation property
                    .FirstOrDefaultAsync(x => x.Id.ToString() == issue_assignee.IssueId);

                    // More log...

                    var assignee = await _context.Assignees
                    .FirstOrDefaultAsync(x => x.Id.ToString() == issue_assignee.AssigneeId);

                    // More log...

                    var the_issue_assignee_to_remove = issue.assignees
                    .FirstOrDefault(ia => ia.AssigneeId == assignee.Id && ia.IssueId == issue.Id);

                    if (the_issue_assignee_to_remove != null)
                    {
                    _context.Remove(the_issue_assignee_to_remove); // Mark for deletion
                    }
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem removing assignee from issues.");
                  
            }
        }
    }


}