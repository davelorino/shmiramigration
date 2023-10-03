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
using Application.Issues;

namespace Application.Sprints
{
    public class MoveIssueToDifferentSprint
    {
        public class Command : IRequest<Result<Unit>>
        {
        public string source_sprint_id { get; set; }

        public string destination_sprint_id { get; set; }

        public string issue_name { get; set; }

        public string issue_id { get; set; }

        public Issue Issue { get; set; }

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
                    Console.WriteLine("Step 1 - find the issue to update.");

                    var issue = await _context.Issues.FindAsync(request.Issue.Id);

                    Console.WriteLine(issue.Id);

                    Console.WriteLine("Step 2 - do a map between the issue received from the frontend and the issue found on the backend.");
                    
                    _mapper.Map(request.Issue, issue);

                    Console.WriteLine("Step 3 - Save the changes");

                    await _context.SaveChangesAsync();

                    Console.WriteLine("Step 5 - Check source sprint");

                    var source_sprint = await _context.Sprints
                        .Include(i => i.issues)
                        .FirstOrDefaultAsync(x => x.Id.ToString().ToLower() == request.source_sprint_id);

                    Console.WriteLine("Step 6 - Source sprint = ");
                    Console.WriteLine(source_sprint);
                    
                    if (source_sprint == null) return null;

                    var destination_sprint = await _context.Sprints
                        .Include(i => i.issues)
                        .FirstOrDefaultAsync(x => x.Id.ToString().ToLower() == request.destination_sprint_id);
                    
                    if (destination_sprint == null) return null;
                    
                    var issue_updated = await _context.Issues
                        .Include(a => a.assignees)
                        .FirstOrDefaultAsync(x => x.Id.ToString().ToLower() == request.issue_id);
                    
                    if (issue_updated == null) return null;
                                 
                    var currentlyInTheSourceSprint = source_sprint.issues
                        .FirstOrDefault(x => x.IssueId.ToString() == request.issue_id);
                                      
                    if (currentlyInTheSourceSprint != null) {
                        source_sprint.issues.Remove(currentlyInTheSourceSprint);  
                        var issueToAdd = new SprintIssue 
                        {
                            Sprint = destination_sprint,
                            Issue = issue_updated
                        };
                        Console.WriteLine(issueToAdd);
                        destination_sprint.issues.Add(issueToAdd);
                    }
           
                    var result = await _context.SaveChangesAsync() > 0;

                    return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem removing issue from sprint.");

            }
        }
    }


}