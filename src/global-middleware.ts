import { registerGlobalMiddleware } from '@tanstack/react-start';
import { logMiddleware } from '@/lib/loggingMiddleware';

registerGlobalMiddleware({
  middleware: [logMiddleware],
});
