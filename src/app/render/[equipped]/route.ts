const images = require("images");

export async function GET(
  request: Request,
  { params }: { params: { equipped: string } },
) {
  const { equipped } = params;
  // const img = images(
  //   await fetch(process.env.BASE_URL + `/assets/placeholders/base.png`),
  // ).draw(
  //   images(
  //     await fetch(process.env.BASE_URL + `/assets/placeholders/base.png`),
  //     0,
  //     0,
  //   ),
  // );
  // const img = images("/assets/placeholders/base.png").draw(
  //   images("/assets/placeholders/1.png"),
  //   0,
  //   0,
  // );
  return Response.json({ equipped });
}
