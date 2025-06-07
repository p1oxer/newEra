// utils/sanitize.js
import DOMPurify from "dompurify";

export const sanitizeHTML = (html) => DOMPurify.sanitize(html);
