import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token !== null) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(clonedReq).pipe(
      map((res: any) => res),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          console.error('Unauthorized request:', error);
          // Optional: redirect to login or show a toast
        } else if (error.status === 500) {
          console.error('Server error:', error);
        } else if (error.status === 404) {
          console.error('Resource not found:', error);
        }
        return throwError(() => error);
      })
    );
  } else {
    return next(req);
  }
};
