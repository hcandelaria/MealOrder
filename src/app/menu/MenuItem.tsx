export default function MenuItem({
  title,
  details,
}: {
  title: string;
  details: string;
}) {
  return (
    <>
      <h2 className='text-2lx font-bold'>{title}</h2>
      <p className='text-l'>{details}</p>
      <button>add to order</button>
    </>
  );
}
