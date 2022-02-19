import {useRouter} from "next/router";

const FilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return (
      <h1>Ooops, no file to display</h1>
    )
  }

  return (
    <div>
      <h1>Here is your like to share your file</h1>

      <a href={`https://nimbusfile.com/file/${id}`}>https://nimbusfile.com/file/{id}</a>
    </div>
  )
}

export default FilePage;
