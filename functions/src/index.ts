import * as functions from "firebase-functions";
import {google} from "googleapis";
import {from, of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";

exports.getGlidexFiles = functions.https.onRequest(
  {cors: true}, (request, response) => {
    from(google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/drive"],
    })).pipe(
      switchMap((auth) => {
        const driveAPI = google.drive({version: "v3", auth});
        return driveAPI.files.list();
      }),
      map((files) => {
        response.send(JSON.stringify({"data": files}));
      }),
      catchError((error) => {
        functions.logger.error(error.message);
        return of(response.send(JSON.stringify({"data": error.message})));
      })
    ).subscribe();
  }
);
