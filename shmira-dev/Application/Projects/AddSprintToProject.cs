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
    public class AddSprintToProject
    {
        public class Command : IRequest<Result<Unit>>
        {
        public string project_id { get; set; }

        public string sprint_name { get; set; }

        public string sprint_id { get; set; }
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
                        .Include(s => s.sprints)
                        .FirstOrDefaultAsync(x => x.Id.ToString().ToLower() == request.project_id.ToString().ToLower());

                    if (project == null) return null;


                    var backlog_sprint = new Sprint
                    {
                        name = "Backlog",
                        Id = new Guid()
                    };
                    
                    var existing_sprint = await _context.Sprints
                        .Include(i => i.issues)
                        .FirstOrDefaultAsync(x => x.Id.ToString().ToLower() == request.sprint_id.ToString().ToLower());
                
                    
                    var backlogSprintToAdd = new ProjectSprint
                    {
                        Project = project,
                        Sprint = backlog_sprint
                    };

                    var existingSprintToAdd = new ProjectSprint 
                    {
                        Project = project,
                        Sprint = existing_sprint
                    };

                    if(request.sprint_name == "Backlog"){
                        project.sprints.Add(backlogSprintToAdd);
                    } else {
                        project.sprints.Add(existingSprintToAdd);
                    }
                
                    var result = await _context.SaveChangesAsync() > 0;

                    return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem adding sprint to project.");

            }
        }
    }


}