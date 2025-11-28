import ratelimit from "../config/upstash.js";


const ratelimiter = async  (req, res, next) =>  {
  try {
    const {success,remaining} = await ratelimit.limit("userid");
    console.log("Rate limit remaining:", remaining);
    if (!success) {
      return res.status(429).json({ error: "Too many requests" });
    }
    next();
  } catch (err) {
    console.log("Rate limit error", err);
    next(err);
  }
};
export default ratelimiter;
