import { request } from "graphql-request";

import { redis } from "@/lib/redis.server";

import { graphql } from "@/generated/gql";
import { ContributionLevel } from "@/generated/gql/graphql";

const document = graphql(`
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
`);

/** 24 weeks */
const DAYS = 24 * 7;

export type Level = 0 | 1 | 2 | 3 | 4;

const compact: Record<ContributionLevel, Level> = {
  [ContributionLevel.None]: 0,
  [ContributionLevel.FirstQuartile]: 1,
  [ContributionLevel.SecondQuartile]: 2,
  [ContributionLevel.ThirdQuartile]: 3,
  [ContributionLevel.FourthQuartile]: 4,
};

export async function getChart(): Promise<Level[]> {
  const to = new Date(); // Closest Saturday
  to.setDate(to.getDate() + (6 - to.getDay()));
  console.log(to);

  const from = new Date(to); // - 24 weeks + 1 day (Sunday)
  from.setDate(to.getDate() - DAYS + 1);
  console.log(from);

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
      console.log("Using cached data");
      return data;
    }
  }

  const query = await request({
    url: "https://api.github.com/graphql",
    document,
    variables: { from, to },
    requestHeaders: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const data =
    query.viewer.contributionsCollection.contributionCalendar.weeks.flatMap(
      week => week.contributionDays.map(day => compact[day.contributionLevel])
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
