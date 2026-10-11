import { writeBrief, type BriefRequest } from "@/lib/brief";
import { modelErrorResponse } from "@/lib/llm";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<BriefRequest>;

  const headcount = Number(body.headcount);
  const months = Number(body.months);
  if (!body.company || !body.sector || !body.work || !(headcount > 0) || !(months > 0)) {
    return Response.json({ error: "incomplete" }, { status: 400 });
  }

  try {
    const brief = await writeBrief({
      company: body.company,
      sector: body.sector,
      work: body.work,
      headcount,
      months,
    });
    return Response.json(brief);
  } catch (error) {
    return modelErrorResponse(error);
  }
}
