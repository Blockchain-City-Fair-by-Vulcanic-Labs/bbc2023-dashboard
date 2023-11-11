export async function GET(
  request: Request,
  { params }: { params: { equipped: string } },
) {
  const { equipped } = params;
  return Response.json({ equipped });
}
