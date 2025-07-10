import * as functions from "firebase-functions";
import {drive_v3 as driveV3, google} from "googleapis";
import {EMPTY, forkJoin, from, Observable, of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
import {MethodOptions} from "googleapis/build/src/apis/abusiveexperiencereport";
import {parse} from "csv-parse";

interface parseCsvStringResponse {
  response: string[][]
}

let driveAPI!: driveV3.Drive;

/**
 * returns a filtered list of files containing the
 * latest Accounts.csv, Members.csv, and Flights.csv
 * @param {driveV3.Schema$File[]} fullList list of files
 * @return {driveV3.Schema$File[] | undefined}
 */
function filterFileRefs(fullList: Array<driveV3.Schema$File> | undefined)
:Array<driveV3.Schema$File | undefined> {
  let accounts: driveV3.Schema$File | undefined;
  let flights: driveV3.Schema$File | undefined;
  let members: driveV3.Schema$File | undefined;
  fullList?.forEach((file) => {
    if (file.name == "Accounts.csv") {
      if (accounts?.createdTime && file?.createdTime) {
        if (new Date(accounts.createdTime) < new Date(file.createdTime)) {
          accounts = file;
        }
      } else {
        accounts = file;
      }
    }
    if (file.name == "Flights.csv") {
      if (flights?.createdTime && file?.createdTime) {
        if (new Date(flights.createdTime) < new Date(file.createdTime)) {
          flights = file;
        }
      } else {
        flights = file;
      }
    }
    if (file.name == "Members.csv") {
      if (members?.createdTime && file?.createdTime) {
        if (new Date(members.createdTime) < new Date(file.createdTime)) {
          members = file;
        }
      } else {
        members = file;
      }
    }
  });
  return [accounts, flights, members];
}

/**
 * returns a full list of files available
 * @return {void}
 */
function getArrayOfFileRefs()
: Observable<Array<driveV3.Schema$File | undefined>> {
  const params: driveV3.Params$Resource$Files$List = {
    fields: "*",
    q: "trashed=false",
  };
  return from(driveAPI.files.list(params)).pipe(
    map((axios) => filterFileRefs(axios.data.files))
  );
}

/**
 * Gets a file as a blob
 * @param {driveV3.Schema$File} fileRefs the filtered list of files
 * @param {number} index 0for accounts, 1 for flights and 2 for members
 * @return {void}
 */
function getFile(fileRefs: Array<driveV3.Schema$File | undefined>,
  index: number)
: Observable<string> {
  let fileId!: string | null | undefined;
  if (fileRefs) {
    fileId = fileRefs[index]?.id;
  }
  if (fileId) {
    const params: driveV3.Params$Resource$Files$Get = {
      fileId,
      alt: "media",
    };
    const methodOptions: MethodOptions = {
      responseType: "arraybuffer",
    };
    return from(driveAPI.files.get(
      params,
      methodOptions
    )).pipe(
      map((res) => {
        return Buffer.from(res.data as ArrayBuffer).toString("utf8");
      }),
    );
  } else {
    return EMPTY;
  }
}

/**
 * Ensures Global driveAPI object created
 * @return {void}
 */
function setDriveAPI(): Observable<void> {
  return of("").pipe(
    switchMap(() => {
      if (driveAPI) {
        return of();
      } else {
        return from(google.auth.getClient({
          scopes: ["https://www.googleapis.com/auth/drive"],
        })).pipe(
          map((auth) => {
            const driveV3Options: driveV3.Options = {
              version: "v3",
              auth,
            };
            driveAPI = google.drive(driveV3Options);
          })
        );
      }
    })
  );
}


/**
 * Ensures Global driveAPI object created
 * @param {string} csvString dfdgf
 * @return {parseCsvStringResponse} errgh
 */
function parseCsvString(csvString: string): Promise<parseCsvStringResponse> {
  return new Promise((resolve, reject) => {
    parse(
      csvString,
      {
        delimiter: ",",
        encoding: "utf8",
      },
      (err: Error | undefined, output: string[][]) => {
        if (err) {
          reject(err);
        } else {
          resolve({response: output});
        }
      }
    );
  });
}

exports.getGlidexFiles = functions.https.onRequest(
  {cors: true}, (request, response) => {
    const email = request.query.email;
    setDriveAPI().pipe(
      switchMap(() => getArrayOfFileRefs()),
      switchMap((fileRefs) =>
        forkJoin([
          getFile(fileRefs, 0).pipe(
            switchMap((file) => parseCsvString(file))
          ),
          getFile(fileRefs, 1),
          getFile(fileRefs, 2),
        ])
      ),
      map((results) => {
        return response.send(JSON.stringify({data: results}));
      }),
      catchError((error) => {
        return of(response.send(JSON.stringify({data: error.message})));
      })
    ).subscribe();
  }
);
