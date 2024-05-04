import { graphql } from "@octokit/graphql";
import type { ContributionLevel, User } from "@octokit/graphql-schema";

import { redis } from "@/lib/redis.server";

import { DAYS } from "@/components/home/Chart";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

const query = /* GraphQL */ `
  query ContributionsQuery($from: DateTime!, $to: DateTime!) {
    viewer {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export type Level = 0 | 1 | 2 | 3 | 4;

const compact: Record<ContributionLevel, Level> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export async function getChart(): Promise<Level[]> {
  const to = new Date(); // Closest Saturday
  to.setDate(to.getDate() + (6 - to.getDay()));

  const from = new Date(to); // - 24 weeks + 1 day (Sunday)
  from.setDate(to.getDate() - DAYS + 1);

  // Check redis for cached data
  const [cacheDate, cachedData] = await redis.mget(
    "github:contributions:date",
    "github:contributions:data"
  );

  if (cacheDate && cachedData) {
    const date = new Date(cacheDate);
    const data = JSON.parse(cachedData);

    // If the data is cached and the time difference is less than 15 minutes and the day is the same, return the cached data
    if (
      to.getTime() - date.getTime() < 15 * 60 * 1000 &&
      to.getDate() === date.getDate()
    ) {
      return data;
    }
  }

  const { viewer } = await graphqlWithAuth<{ viewer: User }>(query, {
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const data =
    viewer.contributionsCollection.contributionCalendar.weeks.flatMap(week =>
      week.contributionDays.map(day => compact[day.contributionLevel])
    );

  // Cache the data
  await redis.mset(
    "github:contributions:date",
    to.toISOString(),

    "github:contributions:data",
    JSON.stringify(data)
  );

  return data;
}
