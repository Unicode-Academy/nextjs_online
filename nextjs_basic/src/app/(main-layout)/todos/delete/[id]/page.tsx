import { deleteTodo } from "../../action";
import Button from "./Button";
type Params = {
  params: Promise<{ id: string }>;
};
export default async function DeletePage({ params }: Params) {
  const { id } = await params;
  return (
    <form action={deleteTodo}>
      <h1>Delete Todo</h1>
      <p>Bạn có chắc chắn?</p>
      <button className="btn btn-primary">Ok</button>
      <Button />
      <input type="hidden" name="id" value={id} />
    </form>
  );
}
