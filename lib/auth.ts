import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_key';

export function verifyAdminJWT(token?: string) {
  try {
    if (!token) return false;
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'object' && decoded.admin) return true;
    return false;
  } catch (e) {
    return false;
  }
}
