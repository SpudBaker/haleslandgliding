import * as functions from "firebase-functions";
import {drive_v3 as driveV3, google} from "googleapis";
import {from, of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";

exports.getGlidexFiles = functions.https.onRequest(
  {cors: true}, (request, response) => {
    from(google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/drive"],
    })).pipe(
      switchMap((auth) => {
        const driveAPI = google.drive({version: "v3", auth});
        const params: driveV3.Params$Resource$Files$List = {
          q: "trashed=false",
        };
        return driveAPI.files.list(params);
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
