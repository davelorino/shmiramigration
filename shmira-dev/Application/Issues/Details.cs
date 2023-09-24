using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Issues;
using MediatR;
using Domain;
using Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Core;
using Microsoft.EntityFrameworkCore;

namespace Application.Issues
{
    public class Details
    {
        public class Query : IRequest<Result<IssueDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<IssueDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<IssueDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var issue = await _context.Issues
                    .ProjectTo<IssueDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<IssueDto>.Success(issue);
            }
        }
    }
}