import db from "../../../db";
import { advocates } from "../../../db/schema";
import { eq, ilike, count, or, and, SQLWrapper } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const searchQuery = searchParams.get("search") || "";

  const offset = (page - 1) * limit;

  let whereCondition;

  if (searchQuery) {
    whereCondition = or(
      ilike(advocates.firstName, `%${searchQuery}%`),
      ilike(advocates.lastName, `%${searchQuery}%`),
      ilike(advocates.city, `%${searchQuery}%`),
      // @todo add in other fields for filtering
    );
  }

  const data = await db
    .select()
    .from(advocates)
    .where(whereCondition)
    .limit(limit)
    .offset(offset);

  const totalCountResult = await db
    .select({ count: count() })
    .from(advocates)
    .where(whereCondition);
  const total = totalCountResult[0].count;

  return Response.json({ data, total, page, limit });
}
