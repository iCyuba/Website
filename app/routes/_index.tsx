import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "iCyuba" },
    { name: "description", content: "iCyuba's website" },
  ];
};

export default function Index() {
  return <div></div>;
}
