import { headers } from "next/headers";
// import Button from "./_components/Button";

export default async function AboutPage() {
  const apiKey = (await headers()).get("x-api-key");
  return (
    <div className="about-page">
      <h1>About</h1>
      <h2>{apiKey}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        beatae, nulla fugiat vitae, numquam eaque porro optio consectetur
        voluptatum, minus recusandae suscipit blanditiis eligendi! Magni
        deserunt minus mollitia incidunt deleniti?
      </p>
      {/* <Button /> */}
    </div>
  );
}
