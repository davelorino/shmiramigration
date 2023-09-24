using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Application.Invites
{
    public class List
    {
        public class Query : IRequest<Result<List<Invitation>>> {}

        public class Handler : IRequestHandler<Query, Result<List<Invitation>>>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<Invitation>>> Handle(Query request, CancellationToken cancellationToken)
            {

                var invites = await _context.Invites
                    .ToListAsync(cancellationToken);

                Console.WriteLine("Number of invites =");
                Console.WriteLine(invites.Count);

                return Result<List<Invitation>>.Success(invites);
            }
        }
    }
}