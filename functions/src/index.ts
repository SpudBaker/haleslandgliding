import * as functions from "firebase-functions";
import {drive_v3 as driveV3, google} from "googleapis";
import {EMPTY, from, Observable, of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
import {MethodOptions} from "googleapis/build/src/apis/abusiveexperiencereport";

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
 * @return {void}
 */
function getMembersFile(fileRefs: Array<driveV3.Schema$File | undefined>)
: Observable<string> {
  let fileId!: string | null | undefined;
  if (fileRefs) {
    fileId = fileRefs[0]?.id;
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
        return Buffer.from(res.data as ArrayBuffer).toString("base64");
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

exports.getGlidexFiles = functions.https.onRequest(
  {cors: true}, (request, response) => {
    setDriveAPI().pipe(
      switchMap(() => getArrayOfFileRefs()),
      switchMap((fileRefs) => getMembersFile(fileRefs)),
      map((base64) => {
        return response.send(JSON.stringify({data: base64.slice(0, 20)}));
      }),
      catchError((error) => {
        return of(response.send(JSON.stringify({data: error.message})));
      })
    ).subscribe();
  }
);

/*      }),
      switchMap((files) => {
        const tempFilePath = path.join(os.tmpdir(),
          "123.csv");
        if (accounts?.id)
          return from(driveAPI.files.get(
            params, {responseType: "stream"})).pipe(
            map((stream) => {
              return writeFile(stream.data, tempFilePath);
            }));
        } else {
          return EMPTY;
        }
      }),
      map((schemaFile) => {
        response.send(JSON.stringify({"data": schemaFile}));
      }),
      catchError((error) => {
        functions.logger.error(error.message);
        return of(response.send(JSON.stringify({"data": error.message})));
      })
    ).subscribe();
  }
); */
