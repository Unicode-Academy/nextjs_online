// import { getServerSession } from "next-auth";

import { instance } from "../utils/fetch-wrapper";

// import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function DemoPage() {
  // const session = await getServerSession(authOptions);
  // console.log(session);
  const data = await instance.get(`/auth/profile`);
  console.log(data);

  return (
    <div>
      <h1>Demo Fetch Wrapper</h1>
    </div>
  );
}
