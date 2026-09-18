import rateLimit from 'express-rate-limit';

/**
 * Throttles for the two endpoints anyone on the internet can reach.
 *
 * Both are keyed by IP address, which means they count a whole school or office
 * behind one NAT as a single caller. The limits are set high enough that this
 * does not matter for honest use, and low enough to make a script pointless.
 *
 * Behind a reverse proxy, set TRUST_PROXY in the environment (see server.js)
 * or every request will appear to come from the proxy and share one bucket.
 */

/**
 * Submitting an enquiry sends mail through our SMTP account, so an unthrottled
 * loop here is someone else's spam run and our suspended mailbox.
 */
export const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // one hour
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    error:
      'Thank you — we already have your enquiry. Please give us a little time to reply, '
      + 'or call the school office if it is urgent.',
  },
});

/**
 * Password guessing. Successful sign-ins are not counted, so a busy office
 * signing in all morning can never lock itself out; only failures accumulate.
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many sign-in attempts. Please try again in a few minutes.' },
});
