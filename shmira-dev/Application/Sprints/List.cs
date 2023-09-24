using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Application.Sprints
{
    public class List
    {
        public class Query : IRequest<Result<List<SprintDto>>> {}

        public class Handler : IRequestHandler<Query, Result<List<SprintDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<SprintDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var sprints = await _context.Sprints
                    .ProjectTo<SprintDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken); 
                return Result<List<SprintDto>>.Success(sprints);
            }
        }
    }
}

